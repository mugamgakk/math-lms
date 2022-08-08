import React, {useState} from 'react';


const fn = (day)=>{
    switch(day){
        case 0: 
            return '일요일';
        case 1: 
            return '월요일';
        case 2: 
            return '화요일';
        case 3: 
            return '수요일';
        case 4: 
            return '목요일';
        case 5: 
            return '금요일';
        default : return '토요일';
    }
}

function ChangeDate() {

    let [count,setCount] = useState(0);
    const today = new Date();
    const setTime = new Date(today.setDate(today.getDate() + count));

    let year = setTime.getFullYear(),
        month = setTime.getMonth() + 1,
        date = setTime.getDate(),
        day = fn(setTime.getDay())


    const changeDay = (param)=>{
        if(param === 'prev'){
            setCount(count -1)
        }else if(param === 'next'){
            if(count === 0){
                return
            }
            setCount(count + 1)
        }
    }

    let 날짜 = `${year}. ${month < 10 ? '0' + month : month}. ${date < 10 ? '0' + date : date}(${day})`

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

export default ChangeDate;