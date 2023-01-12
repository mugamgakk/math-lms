// yeonju
import React, { memo, useState, useEffect } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import ReferenceContentsModal from "./ReferenceContentsModal";
import ReferenceRegistrationModal from "./ReferenceRegistrationModal";
import styled from "styled-components";
import Icon from "../../components/Icon";
import { fetchData, _isScroll } from "../../methods/methods";
import Pagination from "../../components/Pagination";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import SkeletonTable from "../../components/SkeletonTable";
import useLoginStore from "../../store/useLoginStore";

const 학년 = [
    { value: "", label: "학년" },
    { value: "초등", label: "초등" },
    { value: "중등", label: "중등" },
    { value: "고등", label: "고등" },
];

const search = [
    { value: "ti", label: "제목" },
    { value: "tc", label: "제목+내용" },
    { value: "co", label: "대상" },
];

const Bandage = styled.strong`
    font-weight: 600;
    color: ${(props) => props.color};
    font-size: 18px;
`;

const NewBadge = styled.span`
    border-radius: 3px;
    background: red;
    color: #fff;
    width: 18px;
    height: 18px;
    font-size: 14px;
    text-align: center;
    line-height: 18px;
    font-weight: 500;
    position: relative;
    top: -4px;
    left: 5px;
`;
function Reference() {
    const roleId = parseInt(useLoginStore(state=>state.roleId));

    // 학년 필터
    let [gradeOption, setGradeOption] = useState(학년[0]);

    // 게시물 조회기준
    let [qcate, setQcate] = useState(search[0]);

    let [searchInput, setSearchInput] = useState("");

    // 글쓰기 모달
    let [registModal, setRegistModal] = useState(false);
    // 글쓰기 수정 seq
    let [seq, setSeq] = useState("");

    let [scroll, setScroll] = useState();
    let [page, setPage] = useState(1);

    // 게시글 확인 모달
    let [postMoal, setPostModal] = useState(false);
    let [postNumber, setPostNumber] = useState(0);

    const param = {
        mode: "list",
        divide: gradeOption.value, // 초등 중등 고등
        qcate: qcate.value, // 제목, 제목 + 내용, 내용
        qstr: searchInput,
        page: page,
    };

    // console.log(param);

    const referList = useQuery(["getList", gradeOption, page], () => fetchData("board", param), {
        onSuccess : function(){
            setSearchInput("");
        },
        refetchOnWindowFocus: false,
    });

    // 글수정
    const editModal = (param)=>{
        setSeq(param);
        setPostModal(false);
        setRegistModal(true);
    }
    
    // console.log(referList.data);

    const openPostModal = (index) => {
        setPostModal(true);
        setPostNumber(index);
    };

    useEffect(() => {
        setScroll(_isScroll("reference-table", 500));
    });
    return (
        <div className="reference">
            {/* 글쓰기 모달 */}
            {registModal && <ReferenceRegistrationModal setModal={setRegistModal} setSeq={setSeq} bd_seq={seq} />}

            {/* 글보기 */}
            {postMoal && (
                <ReferenceContentsModal
                    seq={referList.data?.list[postNumber].bd_seq}
                    setModal={setPostModal}
                    postNumber={postNumber}
                    setPostNumber={setPostNumber}
                    totalCount={referList.data?.list.length ?? 0}
                    editModal={editModal}
                    roleId={roleId}
                />
            )}

            <div className="top fj mb-20">
                {/* 관리자만 보이게 하기 */}
                {roleId >= 400 ? (
                    <button
                        className="btn-green btn-icon"
                        style={{ width: "100px" }}
                        onClick={() => setRegistModal(true)}
                    >
                        <Icon icon={"pencil"} />
                        글쓰기
                    </button>
                    
                )
                : <div></div>
            }

                <div className="btn-wrap d-flex">
                    <SelectBase
                        onChange={(ele) => setGradeOption(ele)}
                        options={학년}
                        value={gradeOption}
                        defaultValue="전체"
                        width={"150px"}
                        className={"mr-10"}
                    />
                    <SelectBase
                        onChange={(ele) => setQcate(ele)}
                        options={search}
                        value={qcate}
                        defaultValue="제목"
                        width={"150px"}
                        className={"mr-10"}
                    />

                    <input
                        type="text"
                        className="textInput mr-10"
                        placeholder="조회"
                        value={searchInput}
                        style={{ width: "200px" }}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                referList.refetch();
                            }
                        }}
                    />

                    <button
                        className="btn-green btn-icon"
                        style={{ width: "81px" }}
                        onClick={() => {
                            referList.refetch();
                        }}
                    >
                        <Icon icon={"search"} />
                        조회
                    </button>
                </div>
            </div>
            <div className="contents-body__middle pt-10">
                {/* 작성자 작성일 조회수는 관리자가 보는 목록에서만 표시 */}
                {roleId >= 400 ? (
                    <table className="reference-table custom-table mb-20">
                        <thead>
                            <tr>
                                <th style={{ width: "6.93%" }}>번호</th>
                                <th style={{ width: "9.33%" }}>대상</th>
                                <th style={{ width: "48.73%" }}>글 제목</th>
                                <th style={{ width: "6.66%" }}>첨부 파일</th>
                                <th style={{ width: "9.33%" }}>작성자</th>
                                <th style={{ width: "9.33%" }}>작성일</th>
                                <th style={{ width: "9.73%" }}>조회수</th>
                                {scroll && <th style={{ width: "17px", border: "none" }}></th>}
                            </tr>
                        </thead>
                        <tbody style={{ maxHeight: "500px" }}>
                            {
                                referList.isFetching
                                ? <SkeletonTable R={8} width={["6.93%", "9.33%", "48.73%", "6.66%", "9.33%", "9.33%", "9.73%"]} />
                                : referList.data?.list?.map((a, i) => {
                                    return (
                                        <Tr list={a} index={i} key={i} openPostModal={openPostModal} />
                                    );
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <table className="reference-table custom-table mb-20">
                        <thead>
                            <tr>
                                <th style={{ width: "7%" }}>번호</th>
                                <th style={{ width: "9.5%" }}>대상</th>
                                <th style={{ width: "76%" }}>글 제목</th>
                                <th style={{ width: "7.5%" }}>첨부 파일</th>
                                {scroll && <th style={{ width: "17px", border: "none" }}></th>}
                            </tr>
                        </thead>
                        <tbody style={{ maxHeight: "500px" }}>
                        {
                                referList.isFetching
                                ? <SkeletonTable R={8} width={["6.93%", "9.33%", "48.73%", "6.66%", "9.33%", "9.33%", "9.73%"]} />
                                : referList.data?.list?.map((a, i) => {
                                    return (
                                        <Tr2 list={a} index={i} key={i} openPostModal={openPostModal} />
                                    );
                                })
                            }
                        </tbody>
                    </table>
                )}
            </div>

            <Pagination setPage={setPage} page={page} totalPage={referList.data?.page_total} />
        </div>
    );
}

// 관리자
const Tr = memo(({ list, openPostModal, index }) => {
    return (
        <tr>
            <td style={{ width: "6.93%" }}>{list.bd_seq}</td>
            <td style={{ width: "9.33%" }}>{list.bd_cate}</td>
            {/* 제목 클릭하여 글내용 팝업 오픈 */}
            <td className="title t-start" style={{ width: "48.73%" }}>
                {list.bd_notice === "H" && <Bandage color="#eb615a" >[필독]</Bandage>}
                {list.bd_notice === "N" && <Bandage color="#3485ff" >[공지]</Bandage>}
                {list.bd_notice === "E" && <Bandage color="#00a37f" >[이벤트]</Bandage>}
                <p
                    className="reference-table-text"
                    onClick={() => {
                        openPostModal(index);
                    }}
                >
                    {list.bd_title}
                </p>
                {list.news > 0 && <NewBadge>N</NewBadge>}
            </td>
            <td style={{ width: "6.66%" }}>
                {list.files > 0 && (
                    <span className="file">
                        <Icon icon={"clip"} style={{ fontSize: "30px" }} />
                    </span>
                )}
            </td>
            <td style={{ width: "9.33%" }}>{list.writer}</td>
            <td style={{ width: "9.33%" }}>{dayjs(list.reg_dt).format("YYYY.MM.DD")}</td>
            <td style={{ width: "9.73%" }}>{list.hit}</td>
        </tr>
    );
});

// 일반
const Tr2 = memo(({ list, openPostModal, index }) => {
    return (
        <tr>
            <td style={{ width: "7%" }}>{list.bd_seq}</td>
            <td style={{ width: "9.5%" }}>{list.bd_cate}</td>
            {/* 제목 클릭하여 글내용 팝업 오픈 */}
            <td className="title t-start" style={{ width: "76%" }}>
                {list.bd_notice === "H" && <Bandage color="#eb615a" >[필독]</Bandage>}
                {list.bd_notice === "N" && <Bandage color="#3485ff" >[공지]</Bandage>}
                {list.bd_notice === "E" && <Bandage color="#00a37f" >[이벤트]</Bandage>}
                <p
                    className="reference-table-text"
                    onClick={() => {
                        openPostModal(index);
                    }}
                >
                    {list.bd_title}
                </p>
                {list.news > 0 && <NewBadge>N</NewBadge>}
            </td>
            <td style={{ width: "7.5%" }}>
                {list.files > 0 && (
                    <span className="file">
                        <Icon icon={"clip"} style={{ fontSize: "30px" }} />
                    </span>
                )}
            </td>
        </tr>
    );
});

export default Reference;
