import React from 'react';
import { useState } from 'react';
import DatePicker from "react-date-picker";



function ReservationModal() {

    let [value, setValue] = useState({
        name : "",
        day : "",
        school : ""
    });


    return ( 
        <div className='modal-bg'>
            <div className="modal-content">
                <header className='fj'>
                    <h4>진단평가 예약등록</h4>
                    <button className='btn'>닫기</button>
                </header>
                <div className="modal-body">
                    <table>
                        <tr>
                            <td rowSpan={7}>
                                예약자 정보
                            </td>
                            <td>학생 이름*</td>
                            <td>
                                <input type="text" className='form-control' />
                            </td>
                        </tr>
                        <tr>
                            <td>예약 일시*</td>
                            <DatePicker
                                className="datepicker-base"
                                // onChange={(day) => {
                                //     setStart(day);
                                // }}
                                // value={start}
                                clearIcon={null}
                                openCalendarOnFocus={false}
                                format={"yyyy-MM-dd"}
                            />
                        </tr>
                        <tr>
                            <td>학교</td>
                            <input type="text" className='form-control' />
                        </tr>
                        <tr>
                            <td>학년</td>
                            <input type="text" className='form-control' />
                        </tr>
                        <tr>
                            <td>연락처*</td>
                            <td>
                                <input type="text" className='form-control' />
                                <input type="text" className='form-control' />
                                <input type="text" className='form-control' />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
     );
}

export default ReservationModal;    