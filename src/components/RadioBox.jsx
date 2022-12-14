import React from "react";

const guidGenerator = ()=>{
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function RadioBox({ id = guidGenerator(), checked, name='radio', onChange, label, className='' }) {
    return (
        <div className={`radio ${className}`}>
            <input
                type="radio"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange && onChange}
            />
            <label htmlFor={id} className='mr-10'>{label}</label>
        </div> 
    );
}

export default RadioBox;
