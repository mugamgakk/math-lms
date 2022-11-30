import React, { useState } from 'react';
import { useEffect } from 'react';
import ajax from '../../ajax';
import Checkbox from '../../components/Checkbox';
import Icon from '../../components/Icon';
import PrintModal from '../../components/PrintModal';
import { toggleBodyScroll } from '../../methods/methods';
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
    useEffect(()=>{
        if(gradingModal){
            toggleBodyScroll(true);
        }else{
            toggleBodyScroll(false);
        }
    },[gradingModal])

    return (
        <tr>
            <td style={{width : "8.80316%"}} className="text-center" >
                <Checkbox
                    checked={checkedList.includes(ele)}
                    onChange={(e) => {
                        checkOne(e.target.checked, ele);
                    }}
                />
            </td>
            <td style={{width : "17.60633%"}}>{ele.ltitle}</td>
            <td style={{width : "35.11374%"}}>{ele.sc_title}</td>
            <td style={{width : "13.84767%"}} className="text-center">
                {
                    ele.sc_status === "S"
                        ? (<>
                            {scStatus[ele.sc_status]}
                            <button className='btn-table'>오픈 취소</button>
                        </>)
                        :<button className='btn-table'>오픈 취소</button>
                        // : scStatus[ele.sc_status]
                }
            </td>
            <td style={{width : "13.25420%"}} className="text-center">
                {
                    {
                        S: "-",
                        P: (
                            <>
                                {
                                    gradingModal && <PlusLearningGradingModal sc_seq={ele.sc_seq} setModal={setGradingModal}/>
                                }
                                시험지채점
                                <button className='btn-table' onClick={()=>{setGradingModal(true)}}>채점하기</button>
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
            <td style={{width : "11.37487%"}} className="text-center">
                {
                    printModal && <PrintModal closeModal={setPrintModal}/>
                }
                <button className='btn-table' onClick={()=>{setPrintModal(true)}}><Icon icon="print" style={{marginRight : "6px"}}/> 인쇄</button>
            </td>
        </tr>
    );
}

export default NarrativeTr;