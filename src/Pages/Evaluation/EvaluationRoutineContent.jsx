import React, { useRef, useEffect, useState, memo, useMemo, useCallback } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import PrintModal from '../../../src/components/PrintModal';
import MarkingModal from './MarkingModal'
import LmsDatePicker from "../../components/LmsDatePicker";
import dayjs from "dayjs";
import useStudentsStore from "../../store/useStudentsStore";
import ajax from "../../ajax";

const 평가종류 = [
    { value: '총괄 평가', label: '총괄 평가' },
    { value: '단원 평가', label: '단원 평가' },
    { value: '(월말 평가)', label: '(월말 평가)' },
];
const 단원 = [
    { value: 'I. 수와 식의 계산', label: 'I. 수와 식의 계산' },
    { value: 'II. 문자와 식', label: 'II. 문자와 식' },
    { value: 'III. 좌표평면과 그래프', label: 'III. 좌표평면과 그래프' },
];

const data = [
    {
        ut_seq: 123,
        tb_name: '중2-1 노벰',
        ltitle: 'I. 수와 식의 계산',
        kind: '단원 평가',
        ev_date: '2021-07-20',
        ev_std_score: 18,
        ev_max_score: 20,
        ev_per_score: 90,

    },
    {
        ut_seq: 13,
        tb_name: '중2-1 노벰',
        ltitle: 'II. 문자와 식',
        kind: '단원 평가',
        ev_date: '2021-07-22',
        ev_std_score: 18,
        ev_max_score: 20,
        ev_per_score: 90,

    },
    {
        ut_seq: 3,
        tb_name: '중2-1 노벰',
        ltitle: 'III. 좌표평면과 그래프',
        kind: '단원 평가',
        ev_date: '2021-07-20',
        ev_std_score: null,
        ev_max_score: null,
        ev_per_score: null,

    },
    {
        ut_seq: 13,
        tb_name: '중2-1 노벰',
        ltitle: 'IIII. 문자와 식',
        kind: '단원 평가',
        ev_date: '2021-07-19',
        ev_std_score: 18,
        ev_max_score: 20,
        ev_per_score: 90,

    },
];


function EvaluationRoutineContent() {
    let [selectOption, setSelecOtion] = useState({ 평가종류: "", 단원: "" });
    let [list, setList] = useState(data);
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    
    let [checkItem, setCheckItem] = useState([]);
    
    let [sort,setSort] = useState({
        ltitle : true,
        ev_date : true,
    })


    //  true == 오름차순, false == 내림차순

    // useEffect(()=>{
    //     getList();
    // },[]);

    // const getList = async () => {

    //     let url = "/evaluation.php/";

    //     let query = {
    //         mode: "ut_list",
    //         usr_seq : clickStudent.usr_seq,
    //         qkind : 'UT',
    //         qlno : 1,
    //         sdate : startDay,
    //         edate : endDay,
    //     };

    //     let res = await ajax(url, { data: query });

    //     console.log(res);
    
    // };

    const ref = useRef(false);
    
    let oneMonthAgo = useMemo(() => {
        var now = new Date();
        var oneMonthAgo = dayjs(now).subtract(1,"M").$d;
        return oneMonthAgo;
    }, []);
    
    let [startDay, setStartDay] = useState(oneMonthAgo);
    let [endDay, setEndDay] = useState(new Date());

    const dateSortFunc = useCallback((sortName) => {
        
        let arr = [...list];

        if(sort[sortName]){

            arr.sort((a,b)=>{
               if(a[sortName] < b[sortName]) return 1;
               if(a[sortName] > b[sortName]) return -1;
            });

            setSort({
                ...sort,
                [sortName] : false
            })
            
        }else{

            arr.sort((a,b)=>{
                if(a[sortName] < b[sortName]) return -1;
                if(a[sortName] > b[sortName]) return 1;
            });

            setSort({
                ...sort,
                [sortName] : true
            })
        }

        setList(arr);

    },[sort]);


    
    // useEffect(()=>{
    //     if(ref.current){

    //     let arr = [];
    //     let arr2 = []; 

    //         if(selectOption.평가종류){
    //             data.forEach(item => {
    //                 if(item.kind == selectOption.평가종류 ){
    //                     arr.push(item);
    //                 }
    //             })
    //         }else{
    //             arr = data;
    //         }

    //         if(selectOption.단원){
    //             arr.forEach(item => {
    //                 if(item.ltitle == selectOption.단원){
    //                     arr2.push(item);
    //                 }
    //             })
    //             setList(arr2);
    //         }else{
    //             setList(arr);
    //         }

    //     }else{
    //         ref.current = true;
    //     }


    // },[selectOption])

    
    return (
        <div>
            <div className="fj mb-3">
                <div>
                    <button className="btn">선택 오픈</button>
                </div>
                <div className="d-flex">
                    <SelectBase
                        defaultValue="평가 종류"
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
                        options={단원}
                        width={"150px"}
                        onChange={(ele) => {
                            setSelecOtion({ ...selectOption, 단원: ele });
                        }}
                    />

                    <LmsDatePicker 
                        onChange={(day) => {
                            setStartDay(day)
                        }}
                        value={startDay}
                    />
                    <LmsDatePicker
                    onChange={(day) => {
                        setEndDay(day);
                    }}
                    value={endDay}
                    />
                    <button className="btn">조회</button>
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
                                checked={data.length === checkItem.length ? true : false}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCheckItem(data);
                                    } else {
                                        setCheckItem([]);
                                    }
                                }}
                            />
                        </th>
                        <th>교재</th>
                        <th>단원
                            <button 
                                className={"btn-sort" + `${sort.kind ? " asc" : ""}`}
                                onClick={() => dateSortFunc('ltitle')}
                            ></button>
                        </th>
                        <th>평가 종류</th>
                        <th>시험지</th>
                        <th>평가일
                            <button className={"btn-sort" + `${sort.ev_date ? " asc" : ""}`}
                                onClick={() => dateSortFunc('ev_date')}
                            ></button>
                        </th>
                        <th>결과</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    list.map((a, i) => {
                        return <Tr key={i} 
                        item={a} 
                        check={checkItem} 
                        setCheck={setCheckItem} 
                    />;
                    })}

                </tbody>
            </table>
        </div>
    );
}

const Tr = memo(({ item, check, setCheck}) => {
   
    let [printModal,setPrintModal] = useState(false);
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
                        <p>{item.ev_per_score}점({item.ev_std_score}/{item.ev_max_score})</p>
                        <button className="btn" onClick={()=>setPrintModal(true)}>성적표 보기</button>
                        {
                            printModal && <PrintModal closeModal={setPrintModal} />
                        }
                      
                    </>
                ) : (
                    <button className="btn" onClick={()=>setMarkingModal(true)}>채점하기</button>
                    )}
                    {
                        markingModal && 
                        <MarkingModal 
                        setMarkingModal={setMarkingModal} 
                        data={item}
                        title={title}
                        
                        
                        />
                    }
            </td>
        </tr>
    );
});

export default EvaluationRoutineContent;
