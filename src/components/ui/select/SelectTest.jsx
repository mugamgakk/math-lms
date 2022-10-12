import React, { useEffect, useState } from "react";

const arr = [
    "중등 월화수 A",
    "중등 월화수 B",
    "중등 월화수 C",
    "중등 화목토 A",
    "중등 화목토 B",
    "중등 화목토 C"
]


function SelectTest(props) {

    let [selectState, setSelectState] = useState(false);
    let [checkState, setCheckState] = useState(arr);
    let [choiceItem, setChiceItem] = useState('반 선택 (전체)');

    const allCheck = (checked)=>{
        if(checked){
            let copyArr = [];
            arr.forEach(item => {copyArr.push(item)});

            setCheckState(copyArr);
            setChiceItem('반 선택 (전체)')
        }else{
            setCheckState([]);
            setChiceItem('반을 선택하세요')
        }
    }

    const oneCheck = (checked, item)=>{
        if(checked){
            setCheckState([...checkState, item]);
        }else{
            setCheckState(checkState.filter(ele => ele !== item))
        }
    }

    useEffect(()=>{

        if(arr.length === checkState.length === false){

            if(checkState.length - 1 === 0){
                setChiceItem(checkState[0])
            }else{
                setChiceItem(checkState[0] + `외 ${checkState.length - 1} 개`)
            }
        }

        if(arr.length === checkState.length){
            setChiceItem('반 선택 (전체)')
        }

        if(checkState.length === 0){
            setChiceItem('반을 선택하세요')
        }

    },[checkState])


    return (
        <div>

            
        </div>
    );
}

export default SelectTest;
