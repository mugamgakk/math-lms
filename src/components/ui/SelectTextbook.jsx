import React, { useCallback, useEffect, useState } from 'react';


const book = [
    "수학", "국어", "영어", "역사", "도덕", "체육"
]

function SelectTextbook(props) {

    let [selectState, setSelectState] = useState(false);
    let [menu, setMenu] = useState([book[0]]);

    

    const oneChecked = useCallback((checked, item)=>{
        if(checked){

            if(menu.length > 2){
                alert('그만 넣어유');
                return 
            }

            setMenu([...menu, item]);
        }else{
            
            setMenu(menu.filter(ele => ele !== item ))
        }
    },[menu])


    return ( 
        <div className={'select-wrap' + `${selectState ? ' active' : ''}`} style={{width : props.width}}>
        <div className='select-show' onClick={()=>{setSelectState(!selectState)}}>
                {
                    menu.length === 0
                    ? "교재를 선택 하세요"
                    :menu[0]
                }
        </div>
        <button className='select-btn' onClick={()=>{setSelectState(!selectState)}}>
        </button>
        <div className='textbook-select-option'>


            {
                book.map(item=>{
                    return (
                        <div className='option-item' key={item}>
                            <input 
                            type="checkbox" 
                            id={item} 
                            checked={menu.includes(item)}  
                            onChange={(e)=>{oneChecked(e.target.checked , item)}}
                            />
                            <label htmlFor={item}>{item}</label>
                        </div>
                    )
                })
            }
            
            </div>
        </div>
     );
}

export default SelectTextbook;