import React, {useEffect, useState} from 'react';



function ChangeMonth({setWeek, setBeforeDays}) {

    let [count,setCount] = useState(0);
    const today = new Date();
    const setTime = new Date(today.setMonth(today.getMonth() + count));

    let year = setTime.getFullYear(),
        month = setTime.getMonth()

    // 마지막 일수 구하기
    let monthLastDate = new Date(year, month, 0); // 마지막날
    let monthStartDate = new Date(year, month, 1); // 시작날

    let 마지막일수 = monthLastDate.getDate();
    let 첫날요일 = monthStartDate.getDay();

    useEffect(()=>{
        setWeek(new Array(마지막일수).fill(마지막일수))
        setBeforeDays(new Array(첫날요일).fill(첫날요일))
    },[count])


    const changeDay = (param)=>{
        if(param === 'prev'){
            setCount(count -1)
        }else if(param === 'next'){
            if(count === 0){
                alert("마지막 달입니다.")
                return
            }
            setCount(count + 1)
        }
    }

    let 날짜 = `${year}. ${month < 10 ? '0' + (month + 1) : (month + 1)}`

    return ( 
        <div className="day-wrap">
                <div className='day-box'>
                    <button type='button' onClick={()=>{changeDay('prev')}}>&lt;</button>
                    <strong>{날짜}</strong>
                    <button type='button' onClick={()=>{changeDay('next')}}>&gt;</button>
                </div>
            </div>
     );
}

export default ChangeMonth;