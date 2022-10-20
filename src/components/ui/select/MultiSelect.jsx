import React, { useState } from 'react';



function MultiSelect({width = "130px", onChange, options, value = [], defaultValue = "선택하세요", limit, disabled}) {

    let [selectOpen, setSelectOpen] = useState(false);
    let [choiceArr, setChoiceArr] = useState(value);

    const checkedItem = (checked, ele)=>{

        if(limit && limit === choiceArr.length && !checked){
            alert("더이상 선택이 불가합니다.");
            return 
        }
        
        if(checked){
            let result = choiceArr.filter(a=> a !== ele);
            onChange && onChange(result);
            setChoiceArr(result);
        }else{
            let result = [...choiceArr, ele]
            onChange && onChange(result);
            setChoiceArr(result);
        }
        
    }

    return ( 
        <div tabIndex={1} style={{width : width}} className={`select ${selectOpen ? "active" : ""} ${disabled ? "disabled" : ""}`} 
        onBlur={()=>{
            setSelectOpen(false);
        }}
        >

            <div className="select-view" onClick={()=>{setSelectOpen(!selectOpen)}}>
                <h4>{value.length !== 0 ? value[value.length - 1] :  defaultValue}</h4>
            </div>
            <div className="select-btn" onClick={()=>{setSelectOpen(!selectOpen)}}></div>
            <div className="select-list-box">
            <ul className="select-list">
                {
                    options && options.map((a,i)=>{
                        return (
                            <li 
                            key={i}
                            onClick={(e) => {
                                let isClass = e.target.classList.contains("active");
                                checkedItem(isClass, a);
                            }}
                            className={`fa ${choiceArr.includes(a) ? "active" : ""}`}
                            >
                                <div className="checkbox">
                                </div>
                                {a}
                            </li>
                        )
                    })
                }
            </ul>
            </div>
        </div>
     );
}

export default MultiSelect;