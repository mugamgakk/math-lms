// yeonju
import React from "react";

function ScoreItem ({tit = null,idx,numClick,totalData}) {
    
    let barArray = new Array(11).fill().map((v,i)=>i);
    return(
        <>
            {
                tit && <h6>{tit}</h6>  
            }
        <div className="fc" style={{ width: '100%' }}>
            {
                barArray.map(v => <span className={totalData[idx] == v ? 'scoreNum active' : 'scoreNum'} key={v} onClick={()=>numClick(idx,v)}>{v}</span>)
            }
        </div>
        </>
    )
}
export default ScoreItem;