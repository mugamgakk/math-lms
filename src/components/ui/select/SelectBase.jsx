import React from 'react';
function SelectBase({selectBase, setSelectBase, item, width}) {
    

    return (
        <div
            className={"select-wrap" + `${selectBase.state ? " active" : ""}`}
            style={{ width: width }}
        >
            <div
                className="select-show"
                onClick={() => {
                    setSelectBase({...selectBase, state : !selectBase.state});
                }}
            >
                {selectBase.text}
            </div>
            <button
                className="select-btn"
                onClick={() => {
                    setSelectBase({...selectBase, state : !selectBase.state});
                }}
            ></button>
            <div className="textbook-select-option">
                {item.map((a, i) => {
                    return (
                        <div
                            className="option-item"
                            key={i}
                            onClick={(e) => {
                                setSelectBase({...selectBase, state : false, text : e.target.innerText});
                            }}
                        >
                            {a}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SelectBase;
