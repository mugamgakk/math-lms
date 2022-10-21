import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Icon from '../../components/Icon';

const arr = ["apple", "plus"]

function IconPage() {

    let [text, setText] = useState("");

    const handleCopyClipBoard = async (e) => {
          await navigator.clipboard.writeText(e.currentTarget.dataset.id);
          setText("복사 완료");
    };

    useEffect(()=>{
        if(text === "복사 완료"){
            setTimeout(()=>{
                setText("");
            },500)
        }
    },[text])


    return ( 
        <div>
            <h3>아이콘 클릭하면 복사됨</h3>
            <h2 className='text-center'>{text}</h2>

            <div className="row" style={{flexWrap: "wrap"}}>

            {
                arr.map(a=>{
                    return <div key={a} className='col-1' data-id={`<Icon icon={"${a}"} />`} onClick={handleCopyClipBoard} ><Icon icon={a} /></div>
                })
            }
            </div>
            
            <style>{`
                i{
                    font-size : 3rem;
                    cursor: pointer;
                }
            `}
            </style>
        </div>
     );
}

export default IconPage;
