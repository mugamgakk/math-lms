// yeonju
import React, { useState, useEffect, memo } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import ajax from "../../ajax";
import ViewMessageModal from "./ViewMessageModal";
import WriteMessageModal from "./WriteMessageModal";
import Icon from "../../components/Icon";
import RadioBox from "../../components/RadioBox";
import Checkbox from "../../components/Checkbox";
import Pagination from "../../components/Pagination";
import { fetchData, _isScroll } from "../../methods/methods";
import {
    useQuery
} from "react-query";
import useTable from "../../hooks/useTable";
import useCheckBox from "../../hooks/useCheck";

const viewList = [
    { value: 30, label: "30개" },
    { value: 50, label: "50개" },
    { value: 100, label: "100개" },
];

function SendMessage() {

    // 보여지는 메세지 개수
    let [viewListState, setViewListState] = useState(viewList[0]);
    // "co 내용 to 받는사람"
    let [coToState, setCoToState] = useState("co");
    // 검색어
    let [searchInput, setSearchInput] = useState("");
    let [page, setPage] = useState(1);
    let [tableRef, tableTrue] = useTable()
    let [writeModal, setWriteModal] = useState(false);

    
    
    const param = {
        mode: "notice_list_send",
        qcate: coToState,
        qstr: searchInput,
        listnum: viewListState.value,
        page: page,
    };

    const noticeList = useQuery(["getNotice", coToState], () => fetchData("notice", param));
    
    let {checkedList, allCheck, oneCheck} = useCheckBox(noticeList.data?.list);
    
    console.log(noticeList);

    // const deleteList = async (checkList) => {
    //     let arr = [];
    //     checkList.forEach((a) => {
    //         arr.push(parseInt(a));
    //     });
    //     console.log(arr);
    //     let url = "/notice.php";
    //     let query = {
    //         data: {
    //             mode: "notice_delete",
    //             delete_no: arr,
    //         },
    //     };

    //     let res = await ajax(url, query);

    //     window.alert("성공");
    //     console.log(res);
    // };

    return (
        <>
            <div className="filters fj mt-20 mb-20">
                <div className="filters-l fa">
                    <button className="btn-grey mr-10">
                        선택 삭제
                    </button>
                    <SelectBase
                        onChange={(ele) => setViewListState(ele)}
                        defaultValue="목록 개수"
                        options={viewList}
                        value={viewListState}
                    />
                </div>
                <div className="filters-r fa">
                    <RadioBox
                        checked={coToState == "co"}
                        onChange={() => setCoToState("co")}
                        label={"내용"}
                        className={"mr-10"}
                    />
                    <RadioBox
                        checked={coToState == "to"}
                        onChange={() => setCoToState("to")}
                        label={"받는 사람"}
                    />
                    <input
                        type="text"
                        className="textInput mr-10"
                        placeholder="메세지 검색"
                        onChange={(e) => setSearchInput(e.target.value)}
                        style={{ width: "200px" }}
                    />
                    <button type="button" className="btn-search btn-green btn-icon mr-10">
                        <Icon icon={"search"} />
                        검색
                    </button>
                    <button
                        className="btn-orange"
                        onClick={() => setWriteModal(true)}
                        style={{ width: "146px" }}
                    >
                        메세지 보내기
                    </button>
                    {writeModal && <WriteMessageModal setWriteModal={setWriteModal} />}
                </div>
            </div>
            <div className="messageList">
                <table className="sendMessage-table custom-table">
                    <thead>
                        <tr>
                            <th style={{ width: "3.33%" }}>
                                <Checkbox
                                    id={"all"}
                                    // onChange={(e) => allCheckState(e.target.checked)}
                                    // checked={checkList?.length === sendList?.length}
                                />
                                <label htmlFor="all"></label>
                            </th>
                            <th style={{ width: "13.33%" }}>보낸 시각</th>
                            <th style={{ width: "10.66%" }}>받는 사람</th>
                            <th style={{ width: "8%" }}>첨부</th>
                            <th style={{ width: "38.66%" }}>제목</th>
                            <th style={{ width: "15.26%" }}>상태</th>
                            <th style={{ width: "10.73%" }}>발송 취소</th>

                            {tableTrue && <th style={{ width: "17px", border: "none" }}></th>}
                        </tr>
                    </thead>
                    <tbody ref={tableRef}>
                        {/* {sendList &&
                            sendList.map((list, i) => {
                                return (
                                    <Tr
                                        list={list}
                                        key={i}
                                        checkState={checkState}
                                        checkList={checkList}
                                        sendList={sendList}
                                    />
                                );
                            })} */}
                    </tbody>
                </table>
                <Pagination setPage={setPage} page={page} />
            </div>
        </>
    );
}

const Tr = memo(({ list, checkState, checkList }) => {
    let [viewModal, setViewModal] = useState(false);
    let [afterReadModal, setAfterReadModal] = useState(false);

    return (
        <tr>
            <td style={{ width: "3.33%" }}>
                <Checkbox
                    checked={checkList.includes(list.seq)}
                    onChange={(e) => checkState(e.target.checked, list.seq)}
                />
            </td>
            <td style={{ width: "13.33%" }}>{list.send_date}</td>
            <td style={{ width: "10.66%" }}>{list.to_name}</td>
            <td style={{ width: "8%" }}>
                {list.files > 0 && (
                    <span className="file">
                        <Icon icon={"clip"} style={{ fontSize: "30px" }} />
                    </span>
                )}
            </td>
            <td
                style={{ width: "38.66%", paddingLeft: "16px" }}
                className="t-start"
                onClick={(e) => {
                    e.stopPropagation();
                    setViewModal(true);
                }}
            >
                {list.subject}
                {viewModal && (
                    <ViewMessageModal setViewModal={setViewModal} type="send" seq={list.seq} />
                )}
            </td>
            <td style={{ width: "15.26%" }} onClick={() => setAfterReadModal(true)}>
                {list.status}
                {/* <td style={{ width:'15.26%' }}>{list.status} */}
                {afterReadModal && (
                    <AfterReadingModal
                        setAfterReadModal={setAfterReadModal}
                        afterReadModal={afterReadModal}
                        seq={list.seq}
                    />
                )}
            </td>
            <td style={{ width: "10.73%" }}>
                {list.btn_stat == "cancel" && <button className="btn-table">발송 취소</button>}
                {list.btn_stat == "repost" && <button className="btn-table">다시보내기</button>}
            </td>
        </tr>
    );
});

function AfterReadingModal({ setAfterReadModal, seq }) {
    let [list, setList] = useState(null);

    useEffect(() => {
        getList();
    });

    const getList = async () => {
        let url = "/notice.php";
        let query = {
            mode: "notice_read_detail",
            nt_seq: 0,
        };

        let res = await ajax(url, { data: query });

        setList(res.data);
    };

    return (
        <div className="afterReadModal">
            <div className="modal-content">
                <div className="modal-header fj">
                    <h2 className="modal-title">상태</h2>
                    <button
                        className="btn"
                        onClick={(e) => {
                            setAfterReadModal(false);
                            e.stopPropagation();
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body scroll">
                    <div className="head">
                        <div style={{ width: "30%" }}>이름</div>
                        <div style={{ width: "20%" }}>학년</div>
                        <div className="b-none" style={{ width: "50%" }}>
                            상태
                        </div>
                    </div>
                    <ul>
                        {list &&
                            list.map((a, i) => {
                                return (
                                    <li key={i}>
                                        <strong className="name" style={{ width: "30%" }}>
                                            {a.to_name}
                                        </strong>
                                        <div style={{ width: "20%" }}>{a.grade}</div>
                                        <div className="b-none" style={{ width: "50%" }}>
                                            {a.status}
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SendMessage;
