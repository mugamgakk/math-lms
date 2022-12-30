import React, { useState } from "react";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";
import Icon from "../../components/Icon";
import SelectBase from "../../components/ui/select/SelectBase";
import CustomDatePicker from "../../components/CustomDatePicker";
import Checkbox from "../../components/Checkbox";
import PlusLearningGradingTextBookModal from "./PlusLearningGradingTextBookModal";
import PrintModal from "../../components/PrintModal_clinic";
import ReportModal from "./ReportModal";
import ajax from "../../ajax";
import dayjs from "dayjs";
import { useEffect } from "react";
import { _isScroll } from "../../methods/methods";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import MultiSelect from "../../components/ui/select/MultiSelect";

const fetchData = async () => {
    let res = await axios("/json/pluslearning_textbook.json");
    return res.data;
};

const studyBook = [
    { value: "H", label: "교학사" },
    { value: "G", label: "금성" },
    { value: "K", label: "동아(강)" },
    { value: "P", label: "동아(박)" },
    { value: "M", label: "미래엔" },
    { value: "V", label: "비상" },
    { value: "S", label: "신사고" },
    { value: "J", label: "지학사" },
    { value: "R", label: "천재(류)" },
    { value: "L", label: "천재(이)" },
    { value: "C", label: "천재교육" },
];

const studyState = [
    { value: null, label: "상태" },
    { value: "P", label: "오픈전" },
    { value: "S", label: "학습 중" },
    { value: "C", label: "학습 완료" },
];

function TextBook() {
    const queryClient = useQueryClient();
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    let [selectBook, setSelectBook] = useState(studyBook);
    let [selectState, setSelectState] = useState(studyState[0]);

    let [startDay, setStartDay] = useState(dayjs(new Date()).subtract(1, "M").$d);
    let [endDay, setEndDay] = useState(new Date());

    let [reportModal, setReportModal] = useState(false);

    let [scroll, setScroll] = useState(false);

    let [checkedList, setCheckedList] = useState([]);

    const param = {
        mode: "tb_list",
        usr_seq: clickStudent.usr_seq,
        qstatus: selectState.value,
        qtb: selectBook.value,
        sdate: dayjs(startDay).format("YYYY-MM-DD"),
        edate: dayjs(endDay).format("YYYY-MM-DD"),
    };

    // 리스트
    const textBook = useQuery("textBookList", () => fetchData("class_plus", param), {
        refetchOnWindowFocus: false,
    });

    // 선택오픈
    const openMutation = useMutation(
        (a) => {
            return ajax("/class_plus.php", { data: a });
        },
        {
            onSuccess: () => {
                alert("오픈됨");
                setCheckedList([]);
                queryClient.invalidateQueries("textBookList");
            },
        }
    );

    const allCheck = (checked) => {
        checked ? setCheckedList(textBook.data.tb_list) : setCheckedList([]);
    };
    const oneCheck = (checked, ele) => {
        checked
            ? setCheckedList([...checkedList, ele])
            : setCheckedList(checkedList.filter((a) => a !== ele));
    };

    useEffect(() => {
        setScroll(_isScroll("TextBook-table", 365));
    });

    return (
        <div className="TextBook">
            <UserInfo clickStudent={clickStudent} />

            {reportModal && <ReportModal setModal={setReportModal} />}

            <div className="fj" style={{ margin: "20px 0" }}>
                <p className="TextBook-text-alert">
                    ※ 학습하는 교재의 학년 , 학기에 해당하는 교과서별 내신적중 시험지를 오픈 ,
                    출력할 수 있습니다.
                    <br />※ 기간을 설정하여 결과 리포트를 인쇄할 수 있습니다.(저장되지 않음)
                </p>
                <button
                    className="btn-grey btn-icon btn-retry"
                    onClick={() => {
                        textBook.refetch();
                    }}
                >
                    <Icon icon={"reload"} /> 새로 고침
                </button>
            </div>

            <div className="fj">
                <div>
                    <button
                        className="btn-grey-border mr-10"
                        style={{ width: "97px" }}
                        onClick={() => {
                            if (checkedList.length === 0) {
                                alert("시험지를 선택하세요.");
                                return;
                            }
                            // 모두 오픈중인 시험지는 alert
                            if (checkedList.every((a) => a.tb_status === "S")) {
                                alert("이미 오픈된 시험지입니다.");
                                setCheckedList([]);
                            } else {
                                openMutation.mutate({
                                    mode: "tb_open",
                                    arr_tb_seq: checkedList.map((a) => a.tb_seq),
                                });
                            }
                        }}
                    >
                        선택 오픈
                    </button>
                    <button
                        className="btn-grey-border mr-10"
                        style={{ width: "97px" }}
                        onClick={() => {
                            if (checkedList.length === 0) {
                                alert("시험지를 선택하세요.");
                                return;
                            }
                            if (checkedList.some((a) => a.tb_status === "P")) {
                                alert("교과서별 내신적중 학습지를 먼저 오픈해 주세요.");
                                setCheckedList([]);
                            } else {
                            }
                        }}
                    >
                        선택 인쇄
                    </button>
                    <button
                        className="btn-green mr-10"
                        style={{ width: "97px" }}
                        onClick={() => {
                            setReportModal(true);
                        }}
                    >
                        결과 리포트
                    </button>
                </div>

                <div className="fa">
                    <MultiSelect
                        value={selectBook}
                        options={studyBook}
                        width="120px"
                        className={"mr-10"}
                        onChange={(e) => {
                            setSelectBook(e);
                        }}
                        defaultValue="교과서"
                    />
                    <SelectBase
                        onChange={(ele) => {
                            setSelectState(ele);
                        }}
                        width="120px"
                        options={studyState}
                        value={selectState}
                        className="mr-10"
                        defaultValue="상태"
                    />
                    <CustomDatePicker
                        value={startDay}
                        width="130px"
                        maxDate={endDay}
                        onChange={(day) => {
                            setStartDay(day);
                        }}
                        label={true}
                    />
                    <span className="water">~</span>
                    <CustomDatePicker
                        value={endDay}
                        minDate={startDay}
                        width="130px"
                        onChange={(day) => {
                            setEndDay(day);
                        }}
                        label={true}
                        className="mr-10"
                    />
                    <button
                        className="btn-green btn-icon"
                        style={{ width: "81px" }}
                        onClick={() => {
                            textBook.refetch();
                        }}
                    >
                        <Icon icon={"search"} /> 조회
                    </button>
                </div>
            </div>

            <table className="custom-table TextBook-table" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th style={{ width: "8.81188%" }}>
                            <Checkbox
                                checked={textBook.data?.tb_list.length === checkedList.length}
                                onChange={(e) => {
                                    allCheck(e.target.checked);
                                }}
                            />{" "}
                            <span style={{ marginLeft: "5px" }}>선택</span>
                        </th>
                        <th style={{ width: "13.7623%" }}>교과서</th>
                        <th style={{ width: "17.72277%" }}>대단원</th>
                        <th style={{ width: "21.68316%" }}>소단원</th>
                        <th style={{ width: "13.36633%" }}>상태</th>
                        <th style={{ width: "13.26732%" }}>채점</th>
                        <th style={{ width: "11.38613%" }}>시험지</th>
                        {scroll && <th style={{ width: "17px", border: "none" }}></th>}
                    </tr>
                </thead>
                <tbody style={{ maxHeight: "365px" }}>
                    {textBook.data?.tb_list.map((ele, i) => {
                        return (
                            <Tr ele={ele} key={i} oneCheck={oneCheck} checkedList={checkedList} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = ({ ele, checkedList, oneCheck }) => {
    let [modal, setModal] = useState(false);
    let [printModal, setPrintModal] = useState(false);

    // 오픈 취소
    const plusClose = async () => {
        let res = await ajax("/class_plus.php", {
            data: {
                mode: "tb_close",
                arr_tb_seq: [ele.tb_seq],
            },
        });
    };

    // 재응시
    const plusRetry = async () => {
        let res = await ajax("/class_plus.php", {
            data: {
                mode: "tb_retry",
                arr_tb_seq: [ele.tb_seq],
            },
        });
    };

    return (
        <tr>
            <td style={{ width: "8.81188%" }}>
                <Checkbox
                    checked={checkedList.includes(ele)}
                    onChange={(e) => {
                        oneCheck(e.target.checked, ele);
                    }}
                />
            </td>
            <td style={{ width: "13.7623%" }}>{ele.tb_name}</td>
            <td className="t-start" style={{ width: "17.72277%" }}>
                {ele.ltitle}
            </td>
            <td className="t-start" style={{ width: "21.68316%" }}>
                {ele.utitle}
            </td>
            <td style={{ width: "13.36633%" }}>
                <div className="text-center">
                    {
                        {
                            P: <span style={{ color: "#ccc" }}>오픈 전</span>,
                            S: (
                                <div className="text-center">
                                    <p>학습 중</p>
                                    {/* 답안 제출 안했을시 보여주기*/}
                                    {!ele.sendResult && (
                                        <button className="btn-table" onClick={() => {}}>
                                            오픈 취소
                                        </button>
                                    )}
                                </div>
                            ),
                            C: <span className="text-orange">학습완료</span>,
                        }[ele.tb_status]
                    }
                    <div></div>
                </div>
            </td>
            <td style={{ width: "13.26732%" }}>
                <div className="text-center">
                    {
                        {
                            P: "-",
                            S: (
                                <div>
                                    <button
                                        className="btn-table-orange"
                                        onClick={() => {
                                            setModal(!modal);
                                        }}
                                    >
                                        채점하기
                                    </button>
                                    {modal && (
                                        <PlusLearningGradingTextBookModal
                                            setModal={setModal}
                                            tb_seq={ele.tb_seq}
                                        />
                                    )}
                                </div>
                            ),
                            C: (
                                <div className="text-center">
                                    {modal && (
                                        <PlusLearningGradingTextBookModal
                                            setModal={setModal}
                                            tb_seq={ele.tb_seq}
                                        />
                                    )}
                                    <p
                                        className="btn-score"
                                        onClick={() => {
                                            setModal(!modal);
                                        }}
                                    >
                                        {ele.tb_per_score}점 ({ele.tb_std_score}/{ele.tb_max_score})
                                    </p>
                                    <button className="btn-table-orange-border" onClick={plusRetry}>
                                        재응시(2)
                                    </button>
                                </div>
                            ),
                        }[ele.tb_status]
                    }
                </div>
            </td>
            <td style={{ width: "11.38613%" }}>
                {printModal && <PrintModal title="교과서 적중문제" closeModal={setPrintModal} />}
                <button
                    className="btn-table-orange-border btn-icon"
                    disabled={ele.tb_status === "P" || ele.tb_status === "C"}
                    onClick={() => {
                        setPrintModal(true);
                    }}
                >
                    <Icon icon={"print"} />
                    인쇄
                </button>
            </td>
        </tr>
    );
};

export default TextBook;
