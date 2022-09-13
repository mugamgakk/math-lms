import React, { useState, useMemo } from "react";
import SelectBase from '../../../components/ui/select/SelectBase';
import useStore from '../../../store/useWrongManagement';
import DatePicker from "react-date-picker";
import PrintModal from '../../../components/PrintModal';
import dayjs from "dayjs"
import { useEffect } from "react";

let options = ['전체','중2-1노벰','중2-2뜨레스','중2-2노벰']

function WrongAnswer() {
    let [modalState, setModalState] = useState(false);
    let {data,removeList,filterData} = useStore(state=>state);
    let [checkData,setCheckData] = useState([]);
    let [renderData, setRenderData] = useState(null);
    let [selectOption, setSelectOption] = useState();

    
    useEffect(()=>{
        setCheckData([]);
        setRenderData(data);
    },[data]);
    
    useEffect(()=>{
        if(selectOption == '전체'){
            setRenderData(data);
            return;
        }
        if(selectOption){
            let array = renderData && data.filter(item => item.book == selectOption);
            array && setRenderData(array);
        }

    },[selectOption]);

    useEffect(()=>{
        filterData && setRenderData(filterData);
     },[filterData]);
        
    const checkFunc = (checked,data) => {
        if(checked){
            setCheckData([...checkData, data]);
        }else{
            setCheckData(checkData.filter(item=>item !== data));
        }
    }

    let oneMonthAgo = useMemo(() => {
        var now = new Date();
        var oneMonthAgo = dayjs(now).subtract(1,"M").$d;
        return oneMonthAgo;
    }, []);

    let [startDay, setStartDay] = useState(oneMonthAgo);
    let [option, setOption] = useState(false);

    let [lastDay, setLastDay] = useState(new Date());
    let [subjectArr, setSubjectArr] = useState([]);

    const optionBtn = () => {
        if (startDay !== "" && lastDay !== "") {
            setOption(true);
        }
    };

    const closeModal = () => {
        setModalState(false)
    }

     return (
        <>
        <div className='detailClass wrongAnswerMaster'>
                <p>※ 오답 정복하기는 학생별 오답 맞춤 학습지입니다 학생 화면 나의 오답 목록에 반영</p>
            <div className="top fj">
                <div className="top-left">
                    <button className="btn" onClick={()=>
                        checkData.length > 0 ? (window.confirm('삭제함?') && removeList(checkData,selectOption && selectOption)) 
                        : window.alert('1개이상 선택바람')
                    }>선택 삭제</button>
                    <SelectBase 
                        onChange={(ele)=>{setSelectOption(ele)}} 
                        options={options} // 모든 옵션들 <br/>
                        value={selectOption}  //현재 값 <br/>
                        defaultValue={"선택하세요"} 
                    />
                </div>
                <div className="top-right">

                <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        setStartDay(day);
                    }}
                    value={startDay}
                    maxDate={new Date()}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                    />
                    ~
                <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        setLastDay(day);
                    }}
                    value={lastDay}
                    maxDate={new Date()}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                    />
                <button className="btn" onClick={optionBtn} >조회</button>
                </div>
            </div>
            <table>
                <colgroup>
                    <col width='5%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                    <col width='20%'/>
                    <col width='10%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                </colgroup>
                <thead>
                        <tr>
                            <th>선택</th>
                            <th>생성일</th>
                            <th>교재</th>
                            <th>제목</th>
                            <th>범위</th>
                            <th>문항 수</th>
                            <th>상태</th>
                            <th>시험지</th>
                        </tr>
                </thead>
                <tbody>
                    {
                       renderData && renderData.map(data => {
                            let getDate = data.date.split('-').join('');
                            return(
                                <tr key={data.id}>
                                    <td>
                                        <input type="checkbox" 
                                        onChange={(e)=>checkFunc(e.target.checked,data)} 
                                        checked={checkData.includes(data)}/>
                                    </td>
                                    <td>{data.date}</td>
                                    <td>{data.book}</td>
                                    <td>{data.tit}</td>
                                    <td>
                                        {
                                            data.range.map((range,i)=>{
                                                return(
                                                    <div key={i}>{range}</div>
                                                    )
                                                })
                                        }
                                    </td>
                                    <td>{data.count}</td>
                                    <td>
                                        <div>{data.state}</div>
                                        { 
                                            data.state == '학습 중' && <button className="btn">완료</button>
                                        }
                                    </td>
                                    <td><button className="btn" onClick={()=> setModalState(true)}>인쇄</button>
                                    {
                                        modalState && <PrintModal closeModal={closeModal} title={`[오답 정복하기]${data.name}/${getDate}_${data.book}_오답 정복하기`}/>
                                    }
                                    
                                    </td>
                                </tr>
                            )
                        }) 
                    }
                        
                </tbody>

            </table>
        </div>
        </>
     );
}

export default WrongAnswer;