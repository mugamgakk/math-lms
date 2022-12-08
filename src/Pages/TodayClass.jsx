import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../components/ContentHeader";
import TodayClassSearch from "./TodayClass/TodayClassSearch"
import ajax from "../ajax";
import Tr from './TodayClass/TodayClassTr';
import DateNext from "../components/DateNext";
import Icon from '../components/Icon';
import CustomDatePicker from "../components/CustomDatePicker";

function TodayClass(){

    let [findTodayList, setFindList] = useState(null);
    let [date,setDate] = useState(new Date());
    let [classList,setClassList] = useState();
    let navigate = useNavigate();

    useEffect(()=>{
        getList();
    },[])

    const getList = async () => {

        let url = "/class.php";
        let query = {
            mode: "get_today_class",
            ymd : "2022-01-01",
            class_cd : 137283785634112704,
            qstr : "김수학"
        };
        
        
        let res = await ajax(url, {data: query});
        let { class_list, today_list} = res.data;


        console.log(res);

        setFindList(today_list); 
        setClassList(class_list);
     }




    let [checkState, setCheckState] = useState([]);
        
    const [value, onChange] = React.useState(new Date());
    const [openCalendar, setOpenCalendar] = React.useState(false);

    return(
        <>
            <ContentHeader 
            title={"오늘의 수업"} 
            location={['마이페이지','수학 학습 관리']}
            icon="todayClass"
            current={"오늘의 수업"}
            />
            <div className="TodayClass bg">
                <div className="date-area">
                    <DateNext 
                    value={date} 
                    onChange={day=>setDate(day)}
                    style={{ marginRight: "4px" }}
                    />
                    <CustomDatePicker
                    value={date}
                    onChange={(day) => {
                        setDate(day);
                    }}
                    maxDate={new Date()}
                    />
                </div>
                <div className="tableWrap">
                    <header className="table-top row fj">
                            <div className="warning fa"><Icon icon={"warning"} style={{ color:'#eb615a', marginRight: '6px'}} />학생 이름 클릭 시 학생 교재별 상세 보기에서 오답 정복하기와 학습분석표 생성 및 출력이 가능합니다.</div>
                            <TodayClassSearch data={findTodayList} setFindList={setFindList} option={classList}/>
                    </header>  
                    <table className='tableC'>
                        <colgroup>
                            <col width='9.33%'/>
                            <col width='9.33%'/>
                            <col width='32%'/>
                            <col width='8%'/>
                            <col width='8%'/>
                            <col width='8%'/>
                            <col width='8%'/>
                            <col width='8%'/>
                            <col width='9.33%'/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th rowSpan={2}>학생명 (아이디)</th>
                                <th rowSpan={2}>교재</th>
                                <th rowSpan={2}>단원</th>
                                <th colSpan={5} className='bb'>수행 현황</th>
                                <th rowSpan={2} className='b-none'>학습 완료</th>
                            </tr>
                            <tr>
                                <th>개념 강의</th>
                                <th>개념 확인</th>
                                <th>개념 설명</th>
                                <th>유형 학습</th>
                                <th>맞춤 클리닉</th>
                            </tr>
                        </thead>
                    </table>
                   <div className="scrollWrap scroll">
                    { findTodayList &&
                        findTodayList.map((a,i) => {
                            return (
                                <div className="item flex" key={i}>
                                    <div className="name br bb" style={{ width:'9.33%' }}><strong onClick={()=>navigate('/detail-class/management')}>{a.name}</strong>{a.nickName}</div>
                                    <div style={{ width:'90.67%' }}>
                                        {a.book.map((a,i) => {
                                            return (
                                                <div className="book flex" key={i} >
                                                    <span className="book-name fc br bb" style={{ width: '10.29%' }}>{a.bookTit}</span>
                                                    <div className="classTitWrap" style={{ width: '89.71%' }}> 
                                                        {a.className.map((a,i) => {
                                                            return (
                                                                <div className="stateWrap flex bb" key={i}>
                                                                    <span className="classTit fa br" style={{ width:'39.4%',paddingLeft:'9px' }}>{a.tit}</span>
                                                                    <Tr 
                                                                    key={a.tit} 
                                                                    data={a} 
                                                                    />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    </div>
            </div>
        </>

    )
}

export default TodayClass;