import React, {memo, useState} from 'react';
import { useEffect } from 'react';
import SelectBase from '../../components/ui/select/SelectBase';
import {useDispatch} from "react-redux"
import { checkDataUpdate, reasonDataUpdate } from '../../feature/attendanceSlice';

const options = [
    "출석", "지각", "조퇴", "결석"
]


const AttendanceItem = memo(({list, allCheck})=> {
    let [selectOption, setSelectOption] = useState(null);
    let [reasonDisabled, setReasonDisabled] = useState(false);
    let [reason, setReaSon] = useState(list.사유);
    let dispatch = useDispatch();

    console.log("재 랜더링")

    useEffect(()=>{
        // 선택/출석 사유 입력 영역 비활성화
        if(selectOption === null || selectOption === "출석"){
            setReasonDisabled(true)
        }else{
            setReasonDisabled(false)
        }

        dispatch(checkDataUpdate({id : list.id ,option : selectOption}))

    },[selectOption])


    useEffect(()=>{
        if(allCheck !== 0){
            setSelectOption("출석")
        }
    },[allCheck])


    return ( 
        <tr>
            <td>{list.name}({list.userId})</td>
            <td>
                <SelectBase 
                options={options}
                value={selectOption}
                onChange={(ele)=>{
                    setSelectOption(ele);
                    
                }}
                />
            </td>
            <td>
                <input type="text" 
                placeholder='사유 입력(50자 이내)' 
                className='form-control'
                disabled={reasonDisabled}
                value={reason}
                onChange={(e)=>{
                    setReaSon(e.target.value);
                    dispatch(reasonDataUpdate({id : list.id ,option : e.target.value}))
                }}
                />
            </td>
        </tr>
     );
})

export default AttendanceItem;