import React, { useState } from 'react';


function SelectTextbook(props) {

    let [selectState, setSelectState] = useState(false);


    return ( 
        <div className={'select-wrap' + `${selectState ? ' active' : ''}`} style={{width : props.width}}>
        <div className='select-show' onClick={()=>{setSelectState(!selectState)}}>

        </div>
        <button className='select-btn' onClick={()=>{setSelectState(!selectState)}}>
            
        </button>
        <div className='textbook-select-option'>

            <div className='option-item'>
                <input type="checkbox" />
                <lable></lable>
            </div>
            </div>
        </div>
     );
}

export default SelectTextbook;