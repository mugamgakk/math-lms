import React from "react";

const guidGenerator = ()=>{
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function Checkbox({ color = "green", id = guidGenerator(), checked, onChange, disabled, className="" }) {
    return (
        <div className={`check-${color} ${className}`}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => {
                    onChange && onChange(e);
                }}
                disabled={disabled}
            />
            <label htmlFor={id}></label>
        </div>
    );
}

export default Checkbox;
