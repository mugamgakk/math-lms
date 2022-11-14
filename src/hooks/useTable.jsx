import React, {useState, useEffect} from 'react';
import { _each } from '../methods/methods';

const useTable = (target,defaultValue = false) =>{
    let [a, b] = useState(defaultValue);

    useEffect(()=>{
        let 총높이 = 0;

        let bodyHeight = document.querySelector(target)?.clientHeight;
        let tr = document.querySelectorAll(target + " tr");

        _each(tr, (ele) => 총높이 += ele.clientHeight);

        bodyHeight < 총높이 ? b(true) : b(false)
    },[])


    return a

}

export default useTable;