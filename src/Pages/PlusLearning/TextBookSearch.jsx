import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
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
        <div>
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
            <DatePicker
            value={startDay}
            format={"yyyy-MM-dd"}
            clearIcon={null}
            onChange={(day)=>{setStartDay(day)}}
            />
            <DatePicker
            value={endDay}
            format={"yyyy-MM-dd"}
            clearIcon={null}
            onChange={(day)=>{setEndDay(day)}}
            />
            <button onClick={()=>{}}>조회</button>
        </div>
     );
}

export default TextBookSearch;