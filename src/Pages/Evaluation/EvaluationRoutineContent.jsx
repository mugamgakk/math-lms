import React, { useRef, useEffect, useState, memo, useMemo } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import DatePicker from "react-date-picker";
import { arrSort } from "../../methods/methods";
import PrintModal from '../../../src/components/PrintModal';
import MarkingModal from './MarkingModal'
import LmsDatePicker from "../../components/LmsDatePicker";
import { useCallback } from "react";
import dayjs from "dayjs";

const 평가종류 = [
    { value: '총괄 평가', label: '총괄 평가' },
    { value: '단원 평가', label: '단원 평가' },
    { value: '(월말 평가)', label: '(월말 평가)' },
];
const 단원 = [
    { value: '수와 연산', label: '수와 연산' },
    { value: '문자와 식', label: '문자와 식' },
    { value: '좌표평면과 그래프', label: '좌표평면과 그래프' },
];


const data = [
    {
        교재: "중2-1 노벰",
        단원: "수와 연산",
        평가종류: "단원 평가",
        평가일: "2021-07-21",
        결과: "93점 (28/30)",
    },
    {
        교재: "중2-1 노벰",
        단원: "문자와 식",
        평가종류: "단원 평가",
        평가일: "2021-07-20",
        결과: "93점 (28/30)",
    },
    { 교재: "중2-1 노벰", 단원: "좌표평면과 그래프", 평가종류: "단원 평가", 평가일: "진행중" },
    { 교재: "중2-1 노벰", 단원: "전체", 평가종류: "총괄 평가", 평가일: "" },
    {
        교재: "중2-1 노벰",
        단원: "가",
        평가종류: "단원 평가",
        평가일: "2021-07-20",
        결과: "93점 (28/30)",
    },
    {
        교재: "중2-1 노벰",
        단원: "나",
        평가종류: "단원 평가",
        평가일: "2021-07-20",
        결과: "93점 (28/30)",
    },
    {
        교재: "중2-1 노벰",
        단원: "다",
        평가종류: "단원 평가",
        평가일: "2021-07-20",
        결과: "93점 (28/30)",
    },
];


function EvaluationRoutineContent() {
    let [selectOption, setSelecOtion] = useState({ 평가종류: "", 단원: "" });
    let [list, setList] = useState(data);
    
    let [checkItem, setCheckItem] = useState([]);
    
    let [sort,setSort] = useState({
        단원 : true,
        평가일 : true,
    })

    //  true == 오름차순, false == 내림차순
    
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


    
    useEffect(()=>{
        if(ref.current){

        let arr = [];
        let arr2 = []; 

            if(selectOption.평가종류){
                data.forEach(item => {
                    if(item.평가종류 == selectOption.평가종류 ){
                        arr.push(item);
                    }
                })
            }else{
                arr = data;
            }

            if(selectOption.단원){
                arr.forEach(item => {
                    if(item.단원 == selectOption.단원){
                        arr2.push(item);
                    }
                })
                setList(arr2);
            }else{
                setList(arr);
            }

        }else{
            ref.current = true;
        }


    },[selectOption])

    
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
                                className={"btn-sort" + `${sort.단원 ? " asc" : ""}`}
                                onClick={() => dateSortFunc('단원')}
                            ></button>
                        </th>
                        <th>평가 종류</th>
                        <th>시험지</th>
                        <th>평가일
                            <button className={"btn-sort" + `${sort.평가일 ? " asc" : ""}`}
                                onClick={() => dateSortFunc('평가일')}
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
            <td> {item.교재} </td>
            <td> {item.단원} </td>
            <td> {item.평가종류} </td>
            <td>
                <button className="btn">인쇄</button>
            </td>
            <td>
                {item.평가일 ? (
                    item.평가일 === "진행중" ? (
                        <button className="btn">오픈취소</button>
                    ) : (
                        item.평가일
                    )
                ) : (
                    "ㅡ"
                )}
            </td>
            <td>
                {item.결과 ? (
                    <>
                        <p>{item.결과}</p>
                        <button className="btn" onClick={()=>setPrintModal(true)}>성적표 보기</button>
                        {
                            printModal && <PrintModal closeModal={setPrintModal} />
                        }
                      
                    </>
                ) : (
                    <button className="btn" onClick={()=>setMarkingModal(true)}>채점하기</button>
                    )}
                    {
                        markingModal && <MarkingModal setMarkingModal={setMarkingModal}  />
                    }
            </td>
        </tr>
    );
});

export default EvaluationRoutineContent;
