import React, {memo, useState} from 'react';
import { useEffect } from 'react';
import SelectBase from '../../components/ui/select/SelectBase';

const options = [
    "출석", "지각", "조퇴", "결석"
]


const AttendanceItem = memo(({list, allCheck})=> {
    let [selectOption, setSelectOption] = useState(list.출결);

    // 출결사유 disabled
    let [reasonDisabled, setReasonDisabled] = useState(false);

    // 출결사유 value
    let [reason, setReaSon] = useState(list.사유);


    useEffect(()=>{
        // 선택/출석 사유 입력 영역 비활성화
        if(selectOption === null || selectOption === "출석"){
            setReasonDisabled(true)
        }else{
            setReasonDisabled(false)
        }

    },[selectOption])


    useEffect(()=>{
        if(allCheck !== 0){
            setSelectOption("출석")
        }
    },[allCheck]);

    const saveAttendance = ()=>{
        const obj = {
            name : list.name,
            출결 : selectOption,
            사유 : reason   
        }

        console.log(obj)
    }


    return ( 
        <tr>
            <td>{list.name}({list.userId})</td>
            <td>
                <SelectBase 
                options={options}
                value={selectOption}
                onChange={(ele)=>{
                    console.log(ele)
                    setSelectOption(ele);
                }}
                />
            </td>
            <td style={{display : "flex"}}>
                <input type="text" 
                placeholder='사유 입력(50자 이내)' 
                className='form-control'
                disabled={reasonDisabled}
                value={reason}
                onChange={(e)=>{
                    setReaSon(e.target.value);
                }}
                />
                <button className='btn' onClick={saveAttendance}>저장</button>
            </td>
        </tr>
     );
})

export default AttendanceItem;