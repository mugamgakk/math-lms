import React, { useEffect, useState } from 'react';
import AMselect from './AMselect';



function AttendanceDay ({date, setModal, setExnum}){


    // let [selectState, setSelectState] = useState(false);
    // let [selectText, setSelectText] = useState('');

    let [selectTest, setSelectTest] = useState({state : false, text : ''})

    useEffect(()=>{
        setSelectTest({...selectTest, text : date.state})
    },[date.state])


    return (
            <div
                style={{
                    width: "calc(100% / 7)",
                    height: "110px",
                    backgroundColor: "#eee",
                }}
            >
                {
                    date.day
                    ? (
                        <div>
                            {date.day}

                            <AMselect selectTest={selectTest} setSelectTest={setSelectTest} />

                            <br/>
                            {
                                date.설명 && <button className="btn" onClick={()=>{
                                    setModal(true);
                                    setExnum(date.day)
                                }}>사유</button>
                            }
                        </div>
                    )
                    : date
                }
            </div>
    )
}


export default AttendanceDay