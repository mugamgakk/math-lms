import React, { useEffect, useState, memo } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import {useDispatch} from 'react-redux';
import {saveInput} from '../../feature/studentsAttendance';


const dd = ["선택", "출석", "지각", "조퇴", "결석"];

const AttendanceItem = memo(({ item, allCheck, index }) => {
    let [selectBase, setSelectBase] = useState({state : false, text : "선택"});
    let dispatch = useDispatch();


    useEffect(()=>{
        if(allCheck !== 0){
            setSelectBase({...selectBase, text : "출석"})
        }
    },[allCheck]);


    return (
        <tr>
            <td>{item.name}</td>
            <td>
                <SelectBase
                    item={dd}
                    selectBase={selectBase}
                    setSelectBase={setSelectBase}
                />
            </td>
            <td>
                <input 
                type={"text"} 
                className="form-control" 
                placeholder="사유입력 50자 이내" 
                defaultValue={item.사유}
                onChange={(e)=>{dispatch(saveInput({value : e.target.value , index}))}}
                disabled={selectBase.text === '출석' ? true : false}
                />
            </td>
        </tr>
    );
})

export default AttendanceItem;
