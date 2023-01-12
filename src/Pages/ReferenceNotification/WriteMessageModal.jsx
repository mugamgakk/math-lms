// yeonju
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import ajax from "../../ajax";
import SelectBase from "../../components/ui/select/SelectBase";
import { fetchData, getByteSize } from "../../methods/methods";
import CheckBox from "../../components/Checkbox";
import Icon from "../../components/Icon";
import CustomDatePicker from "../../components/CustomDatePicker";
import dayjs from "dayjs";
import { falseModal } from "../../methods/methods";
import Editor from "../ComponentsPage/Editor";
import ClassSelect from "../../components/ui/select/ClassSelect";
import { useQuery } from "react-query";
import useCheckBox from "../../hooks/useCheck";

const 시간 = () => {
    let arr = [];
    for (let i = 0; i < 24; i++) {
        arr.push({ label: `${i < 10 ? "0" + i : i}시`, value: i });
    }
    return arr.reverse();
};

const 분 = () => {
    let arr = [];

    for (let i = 0; i <= 60; i += 5) {
        arr.push({ label: `${i < 10 ? "0" + i : i}분`, value: i });
    }

    return arr;
};

function WriteMessageModal({ setWriteModal }) {

    // 선택된 반
    let [classList, setClassList] = useState([]);

    let [contents, setContents] = useState();
    let [writeTit, setWriteTit] = useState("");

    let [fileCheck, setFileCheck] = useState([]);

    let [files, setFiles] = useState([]);

    let [time, setTime] = useState(시간()[0]);
    let [miniute, setMiniute] = useState(분()[0]);
    let [date, setDate] = useState(new Date());

    const param = {
        mode: "notice_usr",
        class_cd: "137283785634112703",
    };

    // console.log(param)
    let list = useQuery("stuList", () => fetchData("notice", param), {
        refetchOnWindowFocus: false,
    });

    let { checkedList, allCheck, oneCheck } = useCheckBox(list.data?.usr_list);

    let 총파일크기 = useRef(0);

    // let encodingFiles = useMemo(() => {
    //     let arr = [];
    //     files.length > 0 &&
    //         files.forEach((file) => {
    //             const fileReader = new FileReader();
    //             fileReader.readAsDataURL(file);
    //             fileReader.onload = function (e) {
    //                 arr.push({
    //                     filename: file.name,
    //                     file: e.target.result,
    //                 });
    //             };
    //         });

    //     return arr;
    // }, [files]);

    const checkFile = (checked, file) => {
        if (checked) {
            setFileCheck([...fileCheck, file]);
        } else {
            setFileCheck(fileCheck.filter((a) => a !== file));
        }
    };

    const upload = (파일) => {
        var 업로드파일정규식 = /\.(hwp|doc|docx|xls|xlsx|ppt|pptx|pdf|jpg|png|zip)$/i;
        var 총파일사이즈 = 총파일크기.current;
        var $100mb = 1024 * 1024 * 100; // 100mb

        let arr = [];

        for (let value of 파일) {
            for (let a of files) {
                if (a.name === value.name) {
                    alert("이미 업로드 된 파일입니다.");
                    return;
                }
            }

            if (총파일사이즈 >= $100mb) {
                alert("총 파일 사이즈를 초과하였습니다 (100mb)");
                return;
            }

            if (업로드파일정규식.test(value.name) === false) {
                alert("일치하는 파일 형식이 아닙니다.");
                return;
            }

            if (value.size >= $100mb) {
                alert("파일이 너무 큽니다.");
                return;
            }

            arr.push(value);
            총파일크기.current = 총파일크기.current + value.size;
        }

        setFiles([...files, ...arr]);
    };

 

    return (
        <div className="modal" onClick={(e) => falseModal(e, setWriteModal)}>
            <div className="modal-content writeMessageModal">
                <div className="modal-header fj">
                    <h2 className="modal-title">[학습 알림] 메시지 보내기</h2>
                    <button
                        className="btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setWriteModal(false);
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="left">
                        <ClassSelect
                            width="100%"
                            className={"mb-10"}
                            onChange={(e) => {
                                console.log(e);
                                setClassList(e);
                            }}
                        />
                        <table className="table tableB">
                            <thead>
                                <tr>
                                    <th style={{ width: "50px" }}>
                                        <CheckBox
                                            onChange={(e) => allCheck(e)}
                                            checked={
                                                list.data?.usr_list?.length === checkedList.length
                                            }
                                        />
                                    </th>
                                    <th style={{ width: "150px" }}>이름</th>
                                </tr>
                            </thead>
                            <tbody className="scroll" style={{ height: "584px" }}>
                                {list.data?.usr_list?.map((list) => {
                                    return (
                                        <tr className="check-wrap" key={list.usr_seq}>
                                            <td style={{ width: "40px" }}>
                                                <CheckBox
                                                    id={list.usr_seq}
                                                    onChange={(e) => oneCheck(e, list)}
                                                    checked={checkedList.includes(list)}
                                                />
                                            </td>
                                            <td style={{ width: "calc(100% - 40px)" }}>
                                                <label htmlFor={list.usr_seq}>
                                                    {list.usr_name}
                                                </label>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="right">
                        <div className="mb-10">
                            <span className="tit">받는 사람 ({checkedList.length}명)</span>
                            <input
                                type="text"
                                className="textInput"
                                value={checkedList.map((a) => a.usr_name).join(",")}
                                readOnly
                            />
                        </div>
                        <div className="mb-10">
                            <span className="tit">제목</span>
                            <input
                                type="text"
                                className="textInput"
                                value={writeTit}
                                placeholder="제목을 입력하세요."
                                onChange={(e) => setWriteTit(e.target.value)}
                            />
                        </div>
                        <div className="mb-20">
                            <span className="tit">내용</span>
                            <Editor contents={contents} setContents={setContents} />
                        </div>

                        <div className="fileArea fj">
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => {
                                    upload(e.target.files);
                                }}
                                className="d-none"
                                multiple
                            />

                            <div
                                className="scroll"
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                // 리액트에서 드래그 오버 이벤트를 넣지 않으면 드롭이벤트가 먹지 않음 !
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    var 파일 = e.dataTransfer.files;
                                    // 드롭한 파일들이 모두 들어있음
                                    if (파일.length === 0) {
                                        return;
                                    }

                                    upload(파일);
                                    // console.log("드롭됨");
                                }}
                            >
                                {files.length === 0 && (
                                    <p className="fc" style={{ textAlign: "center" }}>
                                        여기에 첨부파일을 끌어오세요
                                    </p>
                                )}
                                {files.map((a, i) => {
                                    return (
                                        <div key={i}>
                                            <CheckBox
                                                color="orange"
                                                id={i}
                                                onChange={(e) =>
                                                    checkFile(e.target.checked, a.name)
                                                }
                                                checked={fileCheck.includes(a.name)}
                                                className={"mr-10"}
                                            />
                                            <label htmlFor={i}>
                                                {a.name} ( {getByteSize(a.size)} )
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="fileBtn fs f-column">
                                <label htmlFor="file" className="btn-grey-border">
                                    파일 찾기
                                </label>
                                <button className="btn-grey btn-icon" disabled={files.length === 0}>
                                    <Icon icon={"remove"} />
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="reserveWrap fj">
                        <button className="btn-grey mr-4">취소</button>
                        <button className="btn-orange mr-4" >
                            발송하기
                        </button>
                        <button className="btn-brown mr-4" >
                            예약 발송
                        </button>

                        <CheckBox 
                            style={{marginRight : "20px"}}
                            color="orange"
                        />

                        <CustomDatePicker
                            value={date}
                            onChange={(e) => {
                                setDate(e);
                            }}
                            label={true}
                            style={{ marginRight: "4px" }}
                        />
                        <SelectBase
                            width="90px"
                            onChange={(e) => {
                                setTime(e);
                            }}
                            options={시간()}
                            value={time}
                            className="mr-4"
                        />
                        <SelectBase
                            width="90px"
                            onChange={(e) => {
                                setMiniute(e);
                            }}
                            options={분()}
                            value={miniute}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WriteMessageModal;
