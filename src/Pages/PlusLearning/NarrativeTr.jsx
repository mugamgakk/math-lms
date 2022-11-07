import React, { useState } from 'react';
import ajax from '../../ajax';
import PrintModal from '../../components/PrintModal';
import PlusLearningGradingModal from './PlusLearningGradingModal';

const scStatus = {
    P: "오픈전",
    S: "학습중",
    C: "학습 완료"
}

function NarrativeTr({ ele, checkOne, checkedList }) {
    let [gradingModal, setGradingModal] = useState(false);
    let [printModal, setPrintModal] = useState(false);

    // 재응시
    const reTry = async()=>{
        const data = {
            mode : "ct_retry",
            sc_seq : ele.sc_seq
        }
        console.log(data)
        try{
            let res = await ajax("class_plus.php", data)
        }catch(err){

        }
    }

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={checkedList.includes(ele)}
                    onChange={(e) => {
                        checkOne(e.target.checked, ele);
                    }}
                />
            </td>
            <td>{ele.ltitle}</td>
            <td>{ele.sc_title}</td>
            <td>
                {
                    ele.sc_status === "S"
                        ? (<>
                            {scStatus[ele.sc_status]}
                            <button className='btn'>오픈 취소</button>
                        </>)
                        : scStatus[ele.sc_status]
                }
            </td>
            <td>
                {
                    {
                        P: "-",
                        S: (
                            <>
                                {
                                    gradingModal && <PlusLearningGradingModal sc_seq={ele.sc_seq} setModal={setGradingModal}/>
                                }
                                시험지채점
                                <button className='btn' onClick={()=>{setGradingModal(true)}}>채점하기</button>
                            </>
                        ),
                        C: (
                            <>
                                {ele.sc_std_score} / {ele.sc_max_score}
                                <button className='btn' onClick={reTry}>재응시(2)</button>
                            </>
                        )
                    }[ele.sc_status]
                }
            </td>
            <td>
                {
                    printModal && <PrintModal closeModal={setPrintModal}/>
                }
                <button className='btn' onClick={()=>{setPrintModal(true)}}>인쇄</button>
            </td>
        </tr>
    );
}

export default NarrativeTr;