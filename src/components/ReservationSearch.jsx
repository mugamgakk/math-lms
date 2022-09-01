import React from 'react';
import { useState } from 'react';
import DatePicker from "react-date-picker";


function ReservationSearch() {

    const search = (...rest)=>{

        console.log(rest)
        fetch("/test", {data : 123})
    }

    return ( 
        <div style={{width : "320px"}}>
            <Search search={search} />
        </div>
     );
}

const Search = ({search})=>{
    let [start, setStart] = useState(new Date());
    let [end, setEnd] = useState(new Date());
    let [text, setText] = useState('');

    return ( 
        <div>
            <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        setStart(day);
                    }}
                    value={start}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                />
                ~
            <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        setEnd(day);
                    }}
                    value={end}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                />
                <input type="text" className='form-control' value={text} onChange={(e)=>{setText(e.target.value)}} />
                <button onClick={()=>{search(start, end, text)}}>예약자 조회</button>
        </div>
     );
}

export default ReservationSearch;