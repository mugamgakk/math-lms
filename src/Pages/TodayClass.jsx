import React, { useEffect, useState, memo } from "react";
import ContentHeader from "../components/ContentHeader";
import TodayClassSearch from "./TodayClass/TodayClassSearch"
import ajax from "../ajax";
import Tr from './TodayClass/TodayClassTr';
import DateNext from "../components/DateNext";




function TodayClass(){

    let [findTodayList, setFindList] = useState(null);
    let [date,setDate] = useState(new Date());

    useEffect(()=>{

        ajax("/class.php/?mode=get_today_class", {
            ymd : "2022-01-01",
            class_cd : 137283785634112704,
            qstr : "김수학"
        }).then(res=>{

            let { class_list, today_list} = res.data;
            setFindList(today_list);     
        })
       
    },[])




    let [checkState, setCheckState] = useState([]);

    const [reloadState,setReloadState] = useState(false);
    useEffect(()=>{},[reloadState])
    
    
    const [value, onChange] = React.useState(new Date());
    const [openCalendar, setOpenCalendar] = React.useState(false);

  
    return(
        <div className="container TodayClass">
            <ContentHeader title={"오늘의 수업"} location={'마이페이지 > 수학 학습 관리 > 오늘의 수업'} />
            <div className="date-area">
                <DateNext value={date} onChange={day=>setDate(day)}/>
                {/* <ChangeDate value={value} onChange={onChange} />
                <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        onChange(day);
                    }}
                    value={value}
                    maxDate={new Date()}
                    clearIcon={null}
                    isOpen={openCalendar}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                />
                <button
                    className="btn"
                    onClick={() => {
                        setOpenCalendar(!openCalendar);
                    }}
                >
                    캘린더 아이콘
                </button> */}
            </div>
            <header className="table-header row">
                <div style={{ display:'flex' }}>
                    <TodayClassSearch data={findTodayList} setFindList={setFindList}/>
                    <button
                        className="btn update"
                        onClick={() => setReloadState(!reloadState)}
                    >
                        새로고침
                    </button>
                </div>
            </header>
            <table style={{ margin: '5px 0 0 0' }}>
                <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "15%" }} />
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
                { findTodayList && <TodayClassItem findTodayList={findTodayList}/> }
                
            </table>
         
        </div>
    )
}

const TodayClassItem = memo(({findTodayList}) => {
    const list = findTodayList;
    
    // className의 총 개수로 이름 rowspan 결정
    const getNameRowspan = (student) => {
        let rowSpan = 0;
        const { book : books} = student;
        books.forEach((book) => {
            rowSpan += book.className.length;
        });
        return rowSpan;
    }

    // 학생 데이터 tbody 생성
    const tbodies = list.map((student,k) => {

        // rowspan 값 추출
        let trLength = Number(getNameRowspan(student));
        const { book : books} = student;
       
        // 교재 추출
        const firstRow = books.map((book,v)=>{ 
            const { className : classes} = book;
           
            //  단원 추출
            const classList = classes.map((_class,i)=>{
                    // 교재 = 단원 === 0 일때 학생명 td 존재 , 위에서 구한 단원의 총 개수로 rowspan 값
                    const name = (i === 0 && v === 0) ? <td rowSpan={trLength}>{student.name}({student.nickName})</td> : null;
                    // 단원 i = 0 교재명 td 존재 , 단원 개수로 rowspan 값
                    const bookTd = i === 0 ? <td rowSpan={classes.length}>{book.bookTit}</td> : null;

                return <Tr 
                        key={_class.tit} 
                        data={_class} 
                        name={student.name} 
                        book={book.bookTit} 
                        tdName={name} 
                        tdBook={bookTd}/>
            });
           return classList;
        });

         return(
                <tbody key={k} className={student.name}>
                    {firstRow}
                </tbody> 
        )
    }) 
    return tbodies;
});
export default TodayClass;