import React, { useState } from "react";

function CreationModal({setCreationMo,name}){
    return(

        <div className="modal">
            <div className="dim"></div>
            <div className='progressModal cmmnModal'>
                <div className="progressModal-head cmmnModal-head">
                    <div className="tit">
                        <strong>[오답 정복하기 생성]{name}</strong>
                    </div>
                    <button className="close" onClick={()=>setCreationMo(false)}>X</button>
                </div>
                <div className="progressModal-body cmmnModal-body">
                    <table>
                        <colgroup>
                        </colgroup>
                        <thead>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" id="" />
                                    선택
                                </td>
                                <td>대단원</td>
                                <td>소단원</td>
                                <td>개념(키워드)</td>
                                <td></td>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    )
}
export default CreationModal;