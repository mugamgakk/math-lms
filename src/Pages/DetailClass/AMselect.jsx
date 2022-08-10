import React from 'react';


const item = ["출석", "지각", "조퇴", "결석"]

function AMselect({selectState , setSelectState, selectText, setSelectText, width}) {

    return (
        <div
            className={"select-wrap" + `${selectState ? " active" : ""}`}
            style={{ width: width }}
        >
            <div
                className="select-show"
                onClick={() => {
                    setSelectState(!selectState);
                    console.log(selectText)
                }}
            >
                {selectText}
            </div>
            <button
                className="select-btn"
                onClick={() => {
                    setSelectState(!selectState);
                }}
            ></button>
            <div className="textbook-select-option">
                {item.map((a, i) => {
                    return (
                        <div
                            className="option-item"
                            key={i}
                            onClick={(e) => {
                                setSelectText(e.target.innerText);
                                setSelectState(false);
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

export default AMselect;
