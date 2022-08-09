import React, { useState } from 'react';
import ChangeMonth from '../../components/ui/ChangeMonth';





function AttendanceManagement() {

    
    let [week, setWeek] = useState([]);
    let [been,setBeen] = useState([]);


    return ( 
        <div>

            <ChangeMonth setWeek={setWeek} setBeen={setBeen} />

            <table>
                <thead>
                    <tr>
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                    </tr>
                </thead>
            </table>
            <div style={{display : 'flex' , flexWrap : 'wrap'}}>

                {
                    been.map((a,i)=>{
                        return(
                            <div style={{width: 'calc(100% / 7)', height : '110px', backgroundColor : '#ccc'}} key={i}>
                            </div>
                        )
                    })
                }


                {
                    week.map((a,i)=>{
                        return(
                            <div key={i} style={{width: 'calc(100% / 7)', height : '110px', backgroundColor : '#eee'}}>
                                    {i + 1}
                            </div>
                        )
                    })
                }
            </div>

            
        </div>
     );
}

export default AttendanceManagement;