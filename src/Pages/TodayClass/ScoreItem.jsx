import React, { useEffect, useState } from "react";

function ScoreItem ({list}) {
    let barArray = new Array(11).fill().map((v,i)=> i );

    return(
        <>
          <li>
            <div>{list.tit}</div>
            <div className='bar'>
                <div className="bar-num">
                {
                    barArray.map((v,i) => <span key={i}>{v}</span>)
                }
                </div>
                {
                    barArray.map((v,i)=> {
                        return(
                            <button key={i} className={ v === 0 || v === 10 ? 'clickScore halfArea' : 'clickScore' }>{v}</button>
                        )
                    })
                }
             </div>
            </li>
        </>
    )
}
export default ScoreItem;