import React, { useRef, useEffect, useState, memo, useMemo, useCallback } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import MarkingModal from "./MarkingModal";
import dayjs from "dayjs";
import useStudentsStore from "../../store/useStudentsStore";
import ajax from "../../ajax";
import UserInfo from "../../components/UserInfo";
import Icon from "../../components/Icon";
import CustomDatePicker from "../../components/CustomDatePicker";
import Checkbox from "../../components/Checkbox";
import ViewTranscriptsModal from "./ViewTranscriptsModal";
import PrintModal_clinic from '../../components/PrintModal_clinic';

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

        console.log(ut_list);
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
        <div className="EvaluationRoutineContent">
            <UserInfo clickStudent={clickStudent} />
            <div className="info">
                <h4 style={{ marginBottom: '30px'}}>&lt; 정기평가 진행 순서 &gt;</h4>
                <ol>
                    <li>1. 평가를 진행할 시험지를 선택 오픈합니다.</li>
                    <li>2. 오픈한 평가지를 인쇄하여 학생에게 제공합니다</li>
                    <li>
                        3. 문제별 답안을 입력합니다 학생이 지플럼 학습 화면에서 직접 입력할 수도
                        있습니다.
                    </li>
                    <li>4. 자동 생성된 성적표를 확인 후 인쇄합니다</li>
                </ol>

                <strong className="warning">※ 모든 평가는 1회만 응시 가능합니다.</strong>
            </div>
            <div className="top fj mb-10">
                <div className="fj">
                    <button className="btn-grey-border mr-10">선택 오픈</button>
                    <SelectBase
                        defaultValue="평가종류"
                        value={selectOption.평가종류}
                        options={평가종류}
                        width={"150px"}
                        onChange={(ele) => {
                            setSelecOtion({ ...selectOption, 평가종류: ele });
                        }}
                    />
                    <div style={{ width:'10px',height:'40px' }}></div>
                    <SelectBase
                        defaultValue="단원"
                        value={selectOption.단원}
                        options={filterList && filterList}
                        width={"150px"}
                        onChange={(ele) => {
                            setSelecOtion({ ...selectOption, 단원: ele });
                        }}
                        />
                </div>
                <div className="fj">
                    <CustomDatePicker
                        value={startDay}
                        width="130px"
                        onChange={(day) => { setStartDay(day) }}
                        label={true}
                    />
                    <span className="water">
                        ~
                    </span>
                    <CustomDatePicker
                        value={endDay}
                        width="130px"
                        onChange={(day) => { setEndDay(day) }}
                        label={true}
                        className="mr-10"
                    />
                    <button className='btn-search btn-green ml-10 mr-10' onClick={getList}><Icon icon={"search"} />조회</button>
                    <button className="btn-grey btn-icon"><Icon icon={"reload"} />새로고침</button>

                </div>
            </div>

            <table className="table tableA"> 
                <thead>
                    <tr>
                        <th style={{ width:'8.82%' }}>
                            <label htmlFor="all" style={{ marginRight:'5px' }}>선택</label>
                                <Checkbox color='orange' id='all' onChange={(e) => {
                                if (e.target.checked) {
                                    setCheckItem(list);
                                } else {
                                    setCheckItem([]);
                                }
                            }}
                            checked={list && list.length === checkItem.length} />
                        </th>
                        <th style={{ width:'17.65%' }}>교재</th>
                        <th style={{ width:'19.84%' }}>
                            단원
                            <button
                                className={"btn-sort" + `${sort.ltitle ? " asc" : ""}`}
                                onClick={() => dateSortFunc("ltitle")}
                            ></button>
                        </th>
                        <th style={{ width:'14.88%' }}>평가 종류</th>
                        <th style={{ width:'11.4%' }}>시험지</th>
                        <th style={{ width:'13.49%' }}>
                            평가일
                            <button
                                className={"btn-sort" + `${sort.ev_date ? " asc" : ""}`}
                                onClick={() => dateSortFunc("ev_date")}
                            ></button>
                        </th>
                        <th style={{ width:'13.88%' }}>결과</th>
                    </tr>
                </thead>
                <tbody className="scroll">
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
    let [viewModal, setViewModal] = useState(false);
    let [printModal, setPrintModal] = useState(false);
    let [markingModal, setMarkingModal] = useState(false);
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let bookList = useStudentsStore((state) => state.bookList);
    let title = `[${item.kind}]/${clickStudent.um_nm}/${bookList.label}/${item.ltitle}`;
    return (
        <tr>
            <td style={{ width:'8.82%' }}>
                 <Checkbox color='orange'
                    onChange={(e) => {
                        if (e.target.checked) {
                            setCheck([...check, item]);
                        } else {
                            setCheck(check.filter((a) => a !== item));
                        }
                    }}
                    checked={check.includes(item)}
                 />
            </td>
            <td style={{ width:'17.65%' }}> {item.tb_name} </td>
            <td style={{ width:'19.84%' }}> {item.ltitle} </td>
            <td style={{ width:'14.88%' }}> {item.kind} </td>
            <td style={{ width:'11.4%' }}>
                <button className="btn-table" onClick={()=>setPrintModal(true)}>
                   <Icon icon={'print'} style={{marginRight:'5px',fontSize:'16px'}}/> 인쇄
                    </button>
                    { printModal && <PrintModal_clinic closeModal={setPrintModal} />}

            </td>
            <td style={{ width:'13.49%' }}>
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
            <td style={{ flexDirection:'column',width:'13.88%' }}>
                {item.ev_per_score ? (
                    <>
                        <p>
                            {item.ev_per_score}점({item.ev_std_score}/{item.ev_max_score})
                        </p>
                        <button className="btn-table" onClick={() => setViewModal(true)}>
                            성적표 보기
                        </button>
                        {viewModal && <ViewTranscriptsModal closeModal={setViewModal} />}
                    </>
                ) : (
                    <button className="btn" onClick={() => setMarkingModal(true)}>
                        채점하기
                    </button>
                )}
                {
                    markingModal && (
                    <MarkingModal setMarkingModal={setMarkingModal} data={item} title={title} />
                )}
            </td>
        </tr>
    );
});

export default EvaluationRoutineContent;
