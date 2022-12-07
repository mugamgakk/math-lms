import React, { useState } from "react";
import { useEffect } from "react";
import Checkbox from "../../components/Checkbox";
import Icon from "../../components/Icon";

function CreationCheck({ data, keyName,setObj, obj, tit}) {
    let [toggleState, setToggleState] = useState(false);
    // 초기값 모두 선택
    let [checkData, setCheckData] = useState(data);

    // obj 값 다시 넣기
    useEffect(()=>{
        setObj({...obj, [keyName] : checkData})
    },[checkData])

    const oneCheckfunc = (target, item) => {
        if (target.checked) {
            setCheckData([...checkData, item]);
        } else {
            setCheckData(checkData.filter((data) => data !== item));
        }
    };

    const allCheckfunc = (checked) => {
        if (checked) {
            setCheckData([...data]);
        } else {
            setCheckData([]);
        }
    };

    return (
            <>
            <div className={`toggle ${toggleState ? 'open' : 'close'}`} onClick={() => setToggleState(!toggleState)}>
                <Icon icon={"select_typeC"} />
                {tit}
            </div>
            {toggleState && (
            <div className="filter">
                <div className="selectWrap">
                    <div className="checkWrap">
                        <Checkbox color='orange' id={`${data[0]}_all`} checked={ checkData.length === data.length } onChange={(e) => allCheckfunc(e.target.checked)} />  
                        <label htmlFor={`${data[0]}_all`}>전체</label>
                    </div>
                    <div className="line"></div>
                        {  
                            data.map((item) => {
                                return (
                                    <div className="checkWrap fs">
                                        <Checkbox color='orange' id={item} checked={checkData.includes(item)} onChange={(e) => oneCheckfunc(e.target, item)} />  
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                );
                        })}
                </div>
            </div>
            )}
        </>
    );
}

export default CreationCheck;
