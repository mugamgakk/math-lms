import React from "react";

function ScoreItem ({tit = null,idx,numClick,totalData}) {
    
    let barArray = new Array(11).fill().map((v,i)=>i);
    return(
        <li>
            <div>{tit}</div>
            <div className='bar fj'>
                {
                    barArray.map(v => <span className={totalData[idx] == v ? 'num active' : 'num'} key={v} onClick={()=>numClick(idx,v)}>{v}</span>)
                }
             </div>
        </li>
    )
}
export default ScoreItem;