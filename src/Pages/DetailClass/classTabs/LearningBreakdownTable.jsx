import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import ajax from "../../../ajax";
import Checkbox from "../../../components/Checkbox";
import { _isScroll } from "../../../methods/methods";
import useStudentsStore from "../../../store/useStudentsStore";
import LbtDayOption from "../LbtDayOption";
import LbtResultModal from "../modal/LbtResultModal";

function LearningBreakdownTable() {
    let [lbtList, setLbtList] = useState([]);
    let [choiceArr, setChoiceArr] = useState([]);
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    let [scroll, setScroll] = useState(false);

    // 삭제
    const removeList = async () => {
        console.log(choiceArr);
        if (choiceArr.length === 0) {
            alert("학습 분석표를 선택하세요");
        } else {
            if (window.confirm("선택한 학습 분석표를 삭제하시겠습니까?")) {
                let res = await ajax("/class_result.php", {
                    data: {
                        mode: "analytics_del",
                        arr_prt_seq: choiceArr.map(a=> a.prt_seq ),
                    },
                });

                setLbtList(lbtList.filter((a) => !choiceArr.includes(a)));
            } else {
                return;
            }
        }
    };

   


    // 리스트 함수
    const getAnalyticsList = async () => {
        const data = {
            mode: "analytics_list_i",
            usr_seq: clickStudent.usr_seq,
        };

        console.log("parameter", data);

        try {
            const res = await ajax("/class_result.php", { data });
            // const res = await axios("/json/detailclass_table.json");

            console.log("response",res.data);

            // setLbtList(res.data.list);
        } catch (errMsg) {
            console.log(errMsg);
        }
    };

    const allCheck = (checked) => {
        checked ? setChoiceArr(lbtList) : setChoiceArr([]);
    };

    const oneCheck = (checked, ele) => {
        checked
            ? setChoiceArr([...choiceArr, ele])
            : setChoiceArr(choiceArr.filter((a) => a !== ele));
    };

    useEffect(() => {
        getAnalyticsList();
    }, [clickStudent]);

    useEffect(() => {
        setScroll(_isScroll("lbt-list-table", 250));
    });

    return (
        <div>
            <LbtDayOption lbtListNum={lbtList.length} getAnalyticsList={getAnalyticsList} />

            <strong className="alert-text">
                ❖ 분석표 목록에는 학생별로 최대 50개까지 저장됩니다.({lbtList?.length}/50)
            </strong>
            <br />
            <div style={{marginBottom : "20px"}}>
                <button
                    className="btn-grey-border mr-10"
                    onClick={removeList}
                    style={{ marginTop: "10px" }}
                >
                    선택 삭제
                </button>
                <strong className="alert-text">
                    [분석표 삭제 유의 !] 분석 결과는 생성일에 따라 달라질 수 있습니다.
                </strong>
            </div>

            <table className="custom-table lbt-list-table">
                <thead>
                    <tr>
                        <th style={{ width: "8.8206%" }}>
                            <Checkbox
                                color="orange"
                                onChange={(e) => {
                                    allCheck(e.target.checked);
                                }}
                                checked={choiceArr.length === lbtList.length}
                            />
                            선택
                        </th>
                        <th style={{ width: "24.6778%" }}>학습 기간</th>
                        <th style={{ width: "12.7849%" }}>분석표 생성일</th>
                        <th style={{ width: "32.6065%" }}>학습한 교재</th>
                        <th style={{ width: "9.8116%" }}>생성자</th>
                        <th style={{ width: "11.7938%" }}>학습 분석표</th>
                        {scroll && <th style={{ width: "17px", border: "none" }}></th>}
                    </tr>
                </thead>
                <tbody style={{ maxHeight: "250px" }}>
                    {lbtList?.map((item, i) => {
                        return <Tr key={i} item={item} choiceArr={choiceArr} oneCheck={oneCheck} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = ({ item, choiceArr, oneCheck }) => {
    let [modal, setModal] = useState(false);

    const [startDay, endDay] = item.prt_period.split("~")

    return (
        <tr>
            <td style={{ width: "8.8206%" }}>
                <Checkbox
                    color="orange"
                    checked={choiceArr.includes(item)}
                    onChange={(e) => {
                        oneCheck(e.target.checked, item);
                    }}
                />
            </td>
            <td style={{ width: "24.6778%" }}>{dayjs(startDay).format("YYYY-MM-DD")} ~ {dayjs(endDay).format("YYYY-MM-DD")}</td>
            <td style={{ width: "12.7849%" }}>{item.reg_dt.replace(/\//g, "-")}</td>
            <td style={{ width: "32.6065%" }} className="text-center">{item.bk_name}</td>
            <td style={{ width: "9.8116%" }}>{item.reg_nm}</td>
            <td style={{ width: "11.7938%" }}>
                {modal && <LbtResultModal setCreateModal={setModal} />}
                <button
                    className="btn-table"
                    style={{ minWidth: "80px" }}
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    보기
                </button>
            </td>
        </tr>
    );
};

export default LearningBreakdownTable;
