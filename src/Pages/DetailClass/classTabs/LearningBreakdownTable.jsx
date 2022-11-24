import React, { useState, useEffect } from "react";
import ajax from "../../../ajax";
import SkeletonTable from "../../../components/SkeletonTable";
import useLbtStore from "../../../store/useLbtStore";
import useStudentsStore from "../../../store/useStudentsStore";
import LbtDayOption from "../LbtDayOption";
import LbtResultModal from "../modal/LbtResultModal";

function LearningBreakdownTable() {
    let [lbtList, setLbtList] = useState(null);
    let [choiceArr, setChoiceArr] = useState([]);
    let { lbtData, getLbtData, skeleton } = useLbtStore();
    const clickStudent = useStudentsStore(state => state.clickStudent)

    const checkboxChecked = (checked, item) => {
        if (checked) {
            setChoiceArr([...choiceArr, item]);
        } else {
            setChoiceArr(choiceArr.filter((a) => a !== item));
        }
    };

    const removeList = () => {
        if (choiceArr.length === 0) {
            alert("학습 분석표를 선택하세요");
        } else {
            if (window.confirm("선택한 학습 분석표를 삭제하시겠습니까?")) {
            } else {
                return;
            }
        }
    };

    const getAnalyticsBook = async () => {
        const data = {
            mode: "analytics_book",
            sdate: "2022-01-01",
            edate: "2022-01-31",
            usr_seq: clickStudent.usr_seq
        }
        try {
            const res = await ajax("/class_result.php", { data });

            // console.log("@@@@@@@@",res);

        } catch (err) {
            // console.log(err)
        }
    }

    const getAnalyticsList = async () => {
        const data = {
            mode: "analytics_list",
            usr_seq: clickStudent.usr_seq
        }


        try {
            const res = await ajax("/class_result.php", { data });

            console.log("@@", res)

        } catch (errMsg) {
            alert(errMsg.message)
        }
    }

    useEffect(() => {
        getLbtData();
        getAnalyticsBook();
        getAnalyticsList()
    }, []);

    useEffect(() => {
        setLbtList(lbtData);
    }, [lbtData]);

    return (
        <div>
            <LbtDayOption dataNum={lbtData.length} />

            <strong className="alert-text">
                ❖ 분석표 목록에는 학생별로 최대 50개까지 저장됩니다.({lbtList?.length}/50)
            </strong>
            <br />
            <button className="btn-grey-border mr-10" onClick={removeList} style={{marginTop : "10px"}}>선택 삭제</button>
            <strong className="alert-text">[분석표 삭제 유의 !] 분석 결과는 생성일에 따라 달라질 수 있습니다.</strong>

            <div className="table-box" style={{ height: "300px" }}>
                <table>
                    <colgroup>
                        <col style={{ width: "50px" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "150px" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "70px" }} />
                        <col style={{ width: "90px" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">선택</th>
                            <th scope="col">학습 기간</th>
                            <th scope="col">분석표 생성일</th>
                            <th scope="col">학습한 교재</th>
                            <th scope="col">생성자</th>
                            <th scope="col">학습 분석표</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skeleton && <SkeletonTable R={4} D={6} />}

                        {lbtList?.map((item) => {
                            return (
                                <Tr
                                    key={item._id}
                                    data={item}
                                    item={item.info}
                                    choiceArr={choiceArr}
                                    checkboxChecked={checkboxChecked}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const Tr = ({ item, checkboxChecked, choiceArr, data }) => {
    let [modal, setModal] = useState(false);

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={choiceArr.includes(data)}
                    onChange={(e) => {
                        checkboxChecked(e.target.checked, data);
                    }}
                />
            </td>
            <td>{item.date}</td>
            <td>{item.makeDay}</td>
            <td>{item.book}</td>
            <td>{item.maker}</td>
            <td>
                {modal && <LbtResultModal data={data} setModal={setModal} />}
                <button
                    className="btn"
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
