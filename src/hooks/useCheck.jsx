import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// param : 전체 리스트, 초기값
// return : 체크된 리스트, 전체 체크(e), 하나체크(e, ele)
function useCheckBox(checkList = [], checkedItem = []) {

    let [checkedList, setCheckcedList] = useState(checkedItem);

    const allCheck = (e)=>{
        const {checked} = e.target;
        checked ? setCheckcedList(checkList) : setCheckcedList([]);
    }

    const oneCheck = (e, ele)=>{
        const {checked} = e.target;

        checked ? setCheckcedList([...checkedList , ele]) : setCheckcedList(checkedList.filter(a=> a !== ele ))
    }

    useEffect(()=>{
        if(checkedItem.length > 0) setCheckcedList(checkedItem);
    },[checkedItem])

    return {checkedList, allCheck, oneCheck}

}

export default useCheckBox;