import dayjs from 'dayjs';
import React from 'react';
import { useCallback } from 'react';
import { weekChange } from '../methods/methods';
import Icon from './Icon';

const today = dayjs(new Date()).format("YYYYMMDD");

function DateNext({onChange, value = new Date(), style}) {

    let dateFormat = dayjs(value).format("YYYY.MM.DD");
    let weekDay =  weekChange(dayjs(value).$W);

    const changeDate = useCallback((num)=>{
        let dayValue = dayjs(value).format("YYYYMMDD");

        if(num === 1 && today === dayValue){
            alert("현재월 이후로 넘길수 없습니다.");
            return;
        }

        let {$d : day} = dayjs(value).add(num, "d");
        onChange && onChange(day);
    },[value])

    return ( 
        <div className='fa' style={style}>
            <button className='btn-arrow fc' onClick={()=>{changeDate(-1)}}><Icon icon={"arrowA"} style={{transform : "rotate(180deg)", color : "#888"}}/></button>
            <h4 className='next-date'>{dateFormat} ({weekDay})</h4>
            <button className='btn-arrow fc' onClick={()=>{changeDate(1)}}><Icon icon={"arrowA"} style={{color : "#888"}} /></button>
        </div>
     );
}

export default DateNext;