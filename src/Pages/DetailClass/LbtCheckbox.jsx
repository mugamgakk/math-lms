import React, { useState, useCallback, useEffect } from "react";
import style from "../../style/style-module/lbtModal.module.scss";



function LbtCheckbox({allCheckBtn, dataLists}) {


    const [checkedList, setCheckedList] = useState([]);

    const allCheck = (checked) => {
        if (checked) {
            const arr = [];
            dataLists.forEach((list) => arr.push(list));
            setCheckedList(arr);
        } else {
            setCheckedList([]);
        }
    };

    const oneCheck = (checked, list) => {
        if (checked) {
            setCheckedList([...checkedList, list]);
        } else {
            setCheckedList(checkedList.filter((ele) => ele != list));
        }
    };

    useEffect(()=>{

        if(allCheckBtn){
            setCheckedList([...dataLists]);
        }else{
            setCheckedList([]);
        }

    },[allCheckBtn])


    return (
        <div className="captionGroup">
            <input
                type="checkbox"
                id={dataLists[0].data + "title"}
                className={style.formConrol}
                checked={checkedList.length === dataLists.length}
                onChange={(e)=>{allCheck(e.target.checked)}}
            />
            <label htmlFor={dataLists[0].data + "title"}>{dataLists[0].data + "title"}</label>
            <ul className={style.contentList}>
                {
                    dataLists.map((list,i)=>{
                        return (
                            <li key={i}>
                                <input
                                    type="checkbox"
                                    id={list.data}
                                    className={style.formConrol}
                                    onChange={(e)=>{oneCheck(e.target.checked,list)}}
                                    checked={checkedList.includes(list)}
                                />

                                <label htmlFor={list.data}>{list.data}</label>
                            </li>
                        )
                    })
                }
                
            </ul>
        </div>
    );
}

export default LbtCheckbox;
