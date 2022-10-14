import React from 'react';
import { useState, useCallback } from 'react';

function useInput(initial = null) {
    let [data, setData] = useState(initial);

    const method = useCallback((e)=>{
        const {name, value} = e.target;

        setData({...data, [name] : value})
    },[data])

    return [data, method]
}

export default useInput;