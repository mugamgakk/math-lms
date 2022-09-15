import React, { useState } from "react";
import { useEffect } from "react";

function CreationCheck({ data, multiCheckFunc, keyName,setObj, obj }) {
    let [toggleState, setToggleState] = useState(false);

    // ???? 필요없음
    // let [allCheck, setAllCheck] = useState(0);

    // 초기값 모두 선택
    let [checkData, setCheckData] = useState(data);

    // obj 값 다시 넣기
    useEffect(()=>{
        setObj({...obj, [keyName] : checkData})
    },[checkData])

    // ??
    // useEffect(()=>{
    //     checkData.length === data.length ? setAllCheck(2) :
    //     (checkData.length > 0 ? setAllCheck(1) : setAllCheck(0))

    //         multiCheckFunc(checkData,keyName);

    // },[checkData]);

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
        <div className="buttonWrap">
            <button className="checkToggle" onClick={() => setToggleState(!toggleState)}></button>
            {toggleState && (
                <div className="selectWrap">
                    <div className="checkWrap">
                        <input
                            type="checkbox"
                            className={
                                checkData.length > 0 && checkData.length < data.length
                                    ? "checkAll isCheck"
                                    : "checkAll"
                                // allCheck === 1 ? 'checkAll isCheck' : 'checkAll'
                            }
                            id={`${data[0]}_all`}
                            name="all"
                            onChange={(e) => allCheckfunc(e.target.checked)}
                            // 초기값 data를 넣었을때 전체 체크 오류
                            checked={checkData.length === data.length ? true : false}
                        />
                        <label htmlFor={`${data[0]}_all`}>전체</label>
                    </div>
                    {data.map((item) => {
                        return (
                            <div className="checkWrap" key={item}>
                                <input
                                    type="checkbox"
                                    name={item}
                                    id={item}
                                    onChange={(e) => oneCheckfunc(e.target, item)}
                                    checked={checkData.includes(item)}
                                />
                                <label htmlFor={item}>{item}</label>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default CreationCheck;
