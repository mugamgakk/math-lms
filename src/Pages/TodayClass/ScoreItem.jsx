import React from "react";

function ScoreItem ({tit,idx,numClick,style}) {
    let barArray = new Array(11).fill().map((v,i)=> i );

    return(
        <>
          <li>
            <div>{tit}</div>
            <div className='bar'>
                <div className="bar-gage" style={{width:`${style}0%`}}></div>
                <div className="bar-num">
                {
                    barArray.map((v,i) => <span key={i}>{v}</span>)
                }
                </div>
                {
                    barArray.map((v,i)=> {
                        return(
                            <button key={i} className={ v === 0 || v === 10 ? 'clickScore halfArea' : 'clickScore' } onClick={()=>numClick(idx,v)}>{v}</button>
                        )
                    })
                }
             </div>
            </li>
        </>
    )
}
export default ScoreItem;