import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import LmsDatePicker from '../../components/LmsDatePicker';
import SelectBase from '../../components/ui/select/SelectBase';


const studyBook = [
    "교과서 (전체)",
    "교학사",
    "금성",
    "동아(강)",
    "동아(박)",
    "미래엔",
    "비상",
    "신사고",
    "지학사",
    "천재(류)",
    "천재(이)",
];

const studyState = [
    "오픈전", "학습 중", "학습 완료"
]

function TextBookSearch() {

    let [selectBook, setSelectBook] = useState(studyBook[0]);
    let [selectState, setSelectState] = useState();
    let [startDay, setStartDay] = useState(new Date());
    let [endDay, setEndDay] = useState(new Date());

    return ( 
        <div className='d-flex'>
            <SelectBase
                onChange={(ele) => {
                    setSelectBook(ele);
                }}
                width="130px"
                options={studyBook}
                value={selectBook}
            />
            <SelectBase
                onChange={(ele) => {
                    setSelectState(ele);
                }}
                width="130px"
                options={studyState}
                value={selectState}
                defaultValue="상태"
            />
            <LmsDatePicker
                value={startDay}
                width="130px"
                onChange={(day)=>{setStartDay(day)}}
            />
            <LmsDatePicker
            value={endDay}
            width="130px"
            onChange={(day)=>{setEndDay(day)}}
            />
            <button className='btn'>조회</button>
        </div>
     );
}

export default TextBookSearch;