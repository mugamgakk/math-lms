import React from "react";

function ScoreItem ({tit = null,idx,numClick,totalData}) {
    
    let barArray = new Array(11).fill().map((v,i)=>i);
    return(
        <>
            {
                tit && <div>{tit}</div>  
            }
            {
                barArray.map(v => <span className={totalData[idx] == v ? 'scoreNum active' : 'scoreNum'} key={v} onClick={()=>numClick(idx,v)}>{v}</span>)
            }
        </>
    )
}
export default ScoreItem;