import React, { useState } from "react";
import { useEffect } from "react";

function CreationCheck({data,setData}) {
    let [toggleState, setToggleState] = useState(false)
    let [allCheck, setAllCheck] = useState(0);
    let [checkData, setCheckData] = useState([]);
    
    
    useEffect(()=>{
        checkData.length === data.length ? setAllCheck(2) : 
        (checkData.length > 0 ? setAllCheck(1) : setAllCheck(0))
        setData(checkData);
    },[checkData]);
    

    
    const oneCheckfunc = (target,item) => {
        if(target.checked){
            setCheckData([...checkData,item]);
        }else{
            setCheckData(checkData.filter(data=> data !== item));
        }
    }

    const allCheckfunc = (checked) => {
        if(checked){
            setCheckData([...data]);
        }else{
            setCheckData([]);
        }
    }


    return (
         <div className="buttonWrap">
            <button className='checkToggle' onClick={() => setToggleState(!toggleState)}></button>
            {
                toggleState &&
                <div className="selectWrap">
                    <div className="checkWrap">
                        <input type="checkbox" 
                        className={allCheck === 1 ? 'checkAll isCheck' : 'checkAll'} 
                        id={`${data[0]}_all`}
                        name='all' 
                        onChange={(e) => allCheckfunc(e.target.checked)} 
                        checked={ allCheck === 2 } />
                        <label htmlFor={`${data[0]}_all`}>전체</label>
                    </div>
                {
                    data.map(item => {
                        return(
                            <div className="checkWrap" key={item}>
                                <input type="checkbox" name={item} id={item} 
                                onChange={
                                    (e) => oneCheckfunc(e.target,item) 
                                } 
                                checked={checkData.includes(item)}/>
                                <label htmlFor={item}>{item}</label>
                            </div>
                        )
                    })
                }
            </div>
            }
        </div>
    );
}



export default CreationCheck ;