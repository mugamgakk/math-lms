import React, { useEffect, useState } from "react";
function TodayClassItem ({list,modalOpen}) {

 
    let [newplay,setNewPlay] = useState(false);

    useEffect(()=>{
        if(!list.state3?.newplay) return;
        setNewPlay(true);
    },[])

    const tdStateFunc = (data) => {
        if(!data) return;

        if(data.assessment) return <button className='evalBtn btn' onClick={()=>modalOpen('assessmentModal')}>이해:{data.uds} 전달:{data.send}</button>;
        return <button className='evalBtn btn' onClick={()=>modalOpen('assessmentModal')}>수행 평가</button>;
    }

    const tdPrintFunc = (data) => {
        if(!data) return '-';
        if(data === 'Pass') return 'Pass';
        return (
            <>
                <div>{data}</div>
                <button className='printBtn btn'>인쇄</button>
            </>
        );
    }

    const checkDisabled = (data) => {
        if(data === undefined) return 'disabled';
    }

    return(
            <tr>
                <td>{list.name}({list.nickName}){list.thum}</td>
                <td>{list.book}</td>
                <td>{list.class}</td>
                <td className={checkDisabled(list.state1)}>{list.state1}</td>
                <td className={checkDisabled(list.state2)}>{list.state2}</td>
                <td className={checkDisabled(list.state3)}>
                    {
                        list.state3 ? (
                            <div className="btn-wrap">
                                <button className={newplay ? 'btnPlay new' : 'btnPlay'}>play</button>
                                <button className='btnDown'>down</button>
                           </div>
                            )
                        : null
                    }
                   {tdStateFunc(list.state3)}
                </td>
                <td className={checkDisabled(list.state4)}>{list.state4}</td>
                <td className={checkDisabled(list.state5)}>{tdPrintFunc(list.state5)}</td>
                <td><button className="attBtn btn" onClick={()=>modalOpen('attModal')}>학습 태도</button></td>
            </tr>
    )
}
export default TodayClassItem;