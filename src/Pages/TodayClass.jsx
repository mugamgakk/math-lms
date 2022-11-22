import React, { useEffect, useState, memo } from "react";
import ContentHeader from "../components/ContentHeader";
import TodayClassSearch from "./TodayClass/TodayClassSearch"
import ajax from "../ajax";
import Tr from './TodayClass/TodayClassTr';
import DateNext from "../components/DateNext";
import SkeletonTable from "../components/SkeletonTable";
import Icon from '../components/Icon';
function TodayClass(){

    let [findTodayList, setFindList] = useState(null);
    let [date,setDate] = useState(new Date());
    let [skeleton, setSkeleton] = useState(true);
    let [classList,setClassList] = useState();

    useEffect(()=>{

        ajax("/class.php/", { data : {

                mode : 'get_today_class',
                ymd : "2022-01-01",
                class_cd : 137283785634112704,
                qstr : "김수학"
            
            }
        }).then(res=>{

            let { class_list, today_list} = res.data;

                console.log(res);
                setFindList(today_list); 
                setClassList(class_list);
                setSkeleton(false);
        })
       
    },[])

    let [checkState, setCheckState] = useState([]);

    const [reloadState,setReloadState] = useState(false);
    useEffect(()=>{},[reloadState])
        
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
                    <DateNext value={date} onChange={day=>setDate(day)}/>
                </div>
                <div className="tableWrap">
                    <header className="table-header row">
                        <div style={{ display:'flex' }}>
                            <TodayClassSearch data={findTodayList} setFindList={setFindList} option={classList}/>
                            <button
                                className="btn-reload btn-grey"
                                onClick={() => setReloadState(!reloadState)}
                            ><Icon icon={"reload"}/>새로고침</button>
                        </div>
                    </header>
                    <table style={{ margin: '5px 0 0 0' }}>
                        <colgroup>
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "9%" }} />
                            <col style={{ width: "9%" }} />
                            <col style={{ width: "9%" }} />
                            <col style={{ width: "9%" }} />
                            <col style={{ width: "9%" }} />
                            <col style={{ width: "auto" }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th rowSpan={2}>학생명(아이디)</th>
                                <th rowSpan={2}>교재</th>
                                <th rowSpan={2}>단원</th>
                                <th colSpan={5}>수행 현황</th>
                                <th rowSpan={2}>학습 완료</th>
                            </tr>
                            <tr>
                                <th>개념 강의</th>
                                <th>개념 확인/<br />기본 문제</th>
                                <th>개념 설명</th>
                                <th>유형 학습</th>
                                <th>맞춤 클리닉</th>
                            </tr>
                        </thead>
                    <tbody>
                    {
                            skeleton && <SkeletonTable R={20} D={9} />
                    }
                    </tbody>
                    </table>
                    { (!skeleton && findTodayList) &&
                        findTodayList.map((a,i) => {
                            return (
                                <div className="todayWrap" key={i}>
                                    <span className="name">{a.name}</span>
                                    <div>
                                        {a.book.map((a,i) => {
                                            return (
                                                <div className="bookTitWrap" key={i}>
                                                    <span className="bookTit">{a.bookTit}</span>
                                                    <div className="classTitWrap"> 
                                                        {a.className.map((a,i) => {
                                                            return (
                                                                <div className="stateWrap" key={i}>
                                                                    <span className="classTit">{a.tit}</span>
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
        </>

    )
}

export default TodayClass;