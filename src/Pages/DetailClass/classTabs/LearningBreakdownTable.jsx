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
            <button className="btn-grey-border mr-10" onClick={removeList} style={{ marginTop: "10px" }}>선택 삭제</button>
            <strong className="alert-text">[분석표 삭제 유의 !] 분석 결과는 생성일에 따라 달라질 수 있습니다.</strong>

            <table className='table tableA'>
                <thead>
                    <tr>
                        <th style={{ width: "8.8206%" }} >선택</th>
                        <th style={{ width: "24.6778%" }} >학습 기간</th>
                        <th style={{ width: "12.7849%" }} >분석표 생성일</th>
                        <th style={{ width: "32.6065%" }} >학습한 교재</th>
                        <th style={{ width: "9.8116%" }} >생성자</th>
                        <th style={{ width: "11.7938%" }} >학습 분석표</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
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
    );
}

const Tr = ({ item, checkboxChecked, choiceArr, data }) => {
    let [modal, setModal] = useState(false);

    return (
        <tr>
            <td style={{ width: "8.8206%" }} >
                <input
                    type="checkbox"
                    checked={choiceArr.includes(data)}
                    onChange={(e) => {
                        checkboxChecked(e.target.checked, data);
                    }}
                />
            </td>
            <td style={{ width: "24.6778%" }} >{item.date}</td>
            <td style={{ width: "12.7849%" }} >{item.makeDay}</td>
            <td style={{ width: "32.6065%" }} >{item.book}</td>
            <td style={{ width: "9.8116%" }} >{item.maker}</td>
            <td style={{ width: "11.7938%" }} >
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
