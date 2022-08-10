import React, { useEffect, useState } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import {useDispatch} from 'react-redux';
import {saveInput} from '../../feature/studentsAttendance';


const dd = ["선택", "출석", "지각", "조퇴", "결석"];

function AttendanceItem({ item, allCheck, index }) {
    let [selectState, setSelectState] = useState(false);
    let [selectText, setSelectText] = useState("선택");
    let dispatch = useDispatch();


    useEffect(()=>{
        if(allCheck !== 0){
            setSelectText('출석')
        }
    },[allCheck]);


    return (
        <tr>
            <td>{item.name}</td>
            <td>
                <SelectBase
                    item={dd}
                    selectState={selectState}
                    setSelectState={setSelectState}
                    selectText={selectText}
                    setSelectText={setSelectText}
                />
            </td>
            <td>
                <input 
                type={"text"} 
                className="form-control" 
                placeholder="사유입력 50자 이내" 
                defaultValue={item.사유}
                onChange={(e)=>{dispatch(saveInput({value : e.target.value , index}))}}
                disabled={selectText === '출석' ? true : false}
                />
            </td>
        </tr>
    );
}

export default AttendanceItem;
