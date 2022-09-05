import React, { useState } from "react";
import { useEffect } from "react";

function CreationCheck({data}) {
    let [toggleState, setToggleState] = useState(false)

    return (
         <div className="buttonWrap">
            <button className='checkToggle' onClick={() => setToggleState(!toggleState)}></button>
            {
                toggleState &&
                <div className="selectWrap">
                    <div className="checkWrap">
                        <input type="checkbox" className='checkAll' id='selectCheckAll' name=""/>
                        <label htmlFor='selectCheckAll'>전체</label>
                    </div>
                {
                    data.map(item => {
                        return(
                            <div className="checkWrap">
                                <input type="checkbox" name="" id={item}/>
                                <label htmlFor={item}>{item}</label>
                            </div>
                        )
                    })
                }
            </div>
            }
        </div>
    );
}

export default CreationCheck ;