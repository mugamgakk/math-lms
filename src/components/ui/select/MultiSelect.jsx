import React, { useState } from 'react';



function MultiSelect({width, onChange, options, value = [], defaultValue, limit}) {

    let [selectState, setSelectState] = useState(false);
    let [choiceArr, setChoiceArr] = useState(value);


    const isChecked = (checked, ele)=>{

        if(checked){

            if(limit && choiceArr.length > limit - 1){
                alert("더 선택 불가")
                return
            }

            setChoiceArr([ele, ...choiceArr]);
        }else{
            setChoiceArr(choiceArr.filter(a=>a !== ele))
        }
    }
    

    return ( 
        <div className={'selectbox' + `${selectState ? ' active' : ''}`} style={{width : width}}>
        <div className='selectbox-show' onClick={()=>{
            setSelectState(!selectState);
            if(selectState){
                onChange(choiceArr)
            }
            }}>
                {
                    choiceArr.length === 0
                    ? defaultValue ? defaultValue : '선택하세요'
                    :choiceArr[0]
                }
        </div>
        <button className='selectbox-btn' onClick={()=>{
            setSelectState(!selectState);
            if(selectState){
                onChange(choiceArr)
            }
            }}>
        </button>
        <div className='selectbox-option'>
            <div>

            {
                options.map(item=>{
                    return (
                        <div className='selectbox-option__item' key={item}>
                            <input 
                            type="checkbox" 
                            id={item}
                            checked={choiceArr.includes(item) ? true : false}
                            onChange={(e)=>{isChecked(e.target.checked,item)}}
                            />
                            <label htmlFor={item}>{item}</label>
                        </div>
                    )
                })
            }
            </div>
            
            </div>
        </div>
     );
}

export default MultiSelect;