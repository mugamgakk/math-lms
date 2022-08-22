import React from 'react';


const item = ["출석", "지각", "조퇴", "결석"]

function AMselect({selectTest, setSelectTest, width}) {

    return (
        <div
            className={"select-wrap" + `${selectTest.state ? " active" : ""}`}
            style={{ width: width }}
        >
            <div
                className="select-show"
                onClick={() => {
                    setSelectTest({...selectTest, state : !selectTest.state});
                }}
            >
                {selectTest.text}
            </div>
            <button
                className="select-btn"
                onClick={() => {
                    setSelectTest({...selectTest, state : !selectTest.state});
                }}
            ></button>
            <div className="textbook-select-option">
                {item.map((a, i) => {
                    return (
                        <div
                            className="option-item"
                            key={i}
                            onClick={(e) => {
                                setSelectTest({...selectTest, text : a, state : false});
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
