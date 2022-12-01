import React, { useRef, useEffect, useState, memo, useMemo, useCallback } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import PrintModal from "../../../src/components/PrintModal";
import MarkingModal from "./MarkingModal";
import LmsDatePicker from "../../components/LmsDatePicker";
import dayjs from "dayjs";
import useStudentsStore from "../../store/useStudentsStore";
import ajax from "../../ajax";
import UserInfo from "../../components/UserInfo";

const 평가종류 = [
    { value: "총괄 평가", label: "총괄 평가" },
    { value: "단원 평가", label: "단원 평가" },
    { value: "(월말 평가)", label: "(월말 평가)" },
];

function EvaluationRoutineContent() {
    let [selectOption, setSelecOtion] = useState({ 평가종류: "", 단원: "" });
    let [list, setList] = useState(null);
    let [lectureList, setLectureList] = useState(null);
    let [filterList, setFilterList] = useState(null);
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    let [checkItem, setCheckItem] = useState([]);
    let [sort, setSort] = useState({
        ltitle: true,
        ev_date: true,
    });
    //  true == 오름차순, false == 내림차순

    useEffect(() => {
        getList();
    }, []);

    useEffect(() => {
        if (!lectureList) return;

        let arr = [];

        lectureList.forEach((a) => {
            arr.push({ value: a.ltitle, label: a.ltitle });
        });

        setFilterList(arr);
    }, [lectureList]);

    const getList = async () => {
        let url = "/evaluation.php/";

        let query = {
            mode: "ut_list",
            usr_seq: clickStudent.usr_seq,
            qkind: "UT",
            qlno: 1,
            sdate: startDay,
            edate: endDay,
        };

        let res = await ajax(url, { data: query });

        let { lecture_list, ut_list } = res.data;

        setList(ut_list);
        setLectureList(lecture_list);
    };

    const ref = useRef(false);

    let oneMonthAgo = useMemo(() => {
        var now = new Date();
        var oneMonthAgo = dayjs(now).subtract(1, "M").$d;
        return oneMonthAgo;
    }, []);

    let [startDay, setStartDay] = useState(oneMonthAgo);
    let [endDay, setEndDay] = useState(new Date());

    const dateSortFunc = useCallback(
        (sortName) => {
            let arr = [...list];

            if (sort[sortName]) {
                arr.sort((a, b) => {
                    if (a[sortName] < b[sortName]) return 1;
                    if (a[sortName] > b[sortName]) return -1;
                });

                setSort({
                    ...sort,
                    [sortName]: false,
                });
            } else {
                arr.sort((a, b) => {
                    if (a[sortName] < b[sortName]) return -1;
                    if (a[sortName] > b[sortName]) return 1;
                });

                setSort({
                    ...sort,
                    [sortName]: true,
                });
            }

            setList(arr);
        },
        [sort, list]
    );

    return (
        <div>
            <UserInfo clickStudent={clickStudent} />
            <div>
                <h4>정기평가 진행 순서</h4>
                <ol>
                    <li>평가를 진행할 시험지를 선택 오픈합니다.</li>
                    <li>오픈한 평가지를 인쇄하여 학생에게 제공합니다</li>
                    <li>
                        문제별 답안을 입력합니다 학생이 지플럼 학습 화면에서 직접 입력할 수도
                        있습니다
                    </li>
                    <li>자동 생성된 성적표를 확인 후 인쇄합니다</li>
                </ol>

                <strong>모든 평가는 1회만 응시 가능합니다.</strong>
            </div>
            <div className="fj mb-3">
                <div>
                    <button className="btn">선택 오픈</button>
                </div>
                <div className="d-flex">
                    <SelectBase
                        defaultValue="평가종류"
                        value={selectOption.평가종류}
                        options={평가종류}
                        width={"150px"}
                        onChange={(ele) => {
                            setSelecOtion({ ...selectOption, 평가종류: ele });
                        }}
                    />
                    <SelectBase
                        defaultValue="단원"
                        value={selectOption.단원}
                        options={filterList && filterList}
                        width={"150px"}
                        onChange={(ele) => {
                            setSelecOtion({ ...selectOption, 단원: ele });
                        }}
                    />

                    <LmsDatePicker
                        onChange={(day) => {
                            setStartDay(day);
                        }}
                        value={startDay}
                    />
                    <LmsDatePicker
                        onChange={(day) => {
                            setEndDay(day);
                        }}
                        value={endDay}
                    />
                    <button className="btn" onClick={getList}>
                        조회
                    </button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>
                            <label htmlFor="all-check">선택</label>
                            <input
                                type="checkbox"
                                id="all-check"
                                checked={list && list.length === checkItem.length ? true : false}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCheckItem(list);
                                    } else {
                                        setCheckItem([]);
                                    }
                                }}
                            />
                        </th>
                        <th>교재</th>
                        <th>
                            단원
                            <button
                                className={"btn-sort" + `${sort.ltitle ? " asc" : ""}`}
                                onClick={() => dateSortFunc("ltitle")}
                            ></button>
                        </th>
                        <th>평가 종류</th>
                        <th>시험지</th>
                        <th>
                            평가일
                            <button
                                className={"btn-sort" + `${sort.ev_date ? " asc" : ""}`}
                                onClick={() => dateSortFunc("ev_date")}
                            ></button>
                        </th>
                        <th>결과</th>
                    </tr>
                </thead>
                <tbody>
                    {list &&
                        list.map((a, i) => {
                            return (
                                <Tr key={i} item={a} check={checkItem} setCheck={setCheckItem} />
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = memo(({ item, check, setCheck }) => {
    let [printModal, setPrintModal] = useState(false);
    let [markingModal, setMarkingModal] = useState(false);
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let bookList = useStudentsStore((state) => state.bookList);
    let title = `[${item.kind}]/${clickStudent.um_nm}/${bookList.label}/${item.ltitle}`;
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={check.includes(item) ? true : false}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setCheck([...check, item]);
                        } else {
                            setCheck(check.filter((a) => a !== item));
                        }
                    }}
                />
            </td>
            <td> {item.tb_name} </td>
            <td> {item.ltitle} </td>
            <td> {item.kind} </td>
            <td>
                <button className="btn">인쇄</button>
            </td>
            <td>
                {item.ev_date ? (
                    item.ev_date === "진행중" ? (
                        <button className="btn">오픈취소</button>
                    ) : (
                        item.ev_date
                    )
                ) : (
                    "ㅡ"
                )}
            </td>
            <td>
                {item.ev_per_score ? (
                    <>
                        <p>
                            {item.ev_per_score}점({item.ev_std_score}/{item.ev_max_score})
                        </p>
                        <button className="btn" onClick={() => setPrintModal(true)}>
                            성적표 보기
                        </button>
                        {printModal && <PrintModal closeModal={setPrintModal} />}
                    </>
                ) : (
                    <button className="btn" onClick={() => setMarkingModal(true)}>
                        채점하기
                    </button>
                )}
                {markingModal && (
                    <MarkingModal setMarkingModal={setMarkingModal} data={item} title={title} />
                )}
            </td>
        </tr>
    );
});

export default EvaluationRoutineContent;
