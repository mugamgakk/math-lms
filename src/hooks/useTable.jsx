import React from 'react';
import { useRef } from 'react';

// ref는 tbody에
function useTable() {
    let ref = useRef();

    const tableTrue = () => {
        const { current: element } = ref;

        if(!element){
            return false
        }

        let height = 0;
        for(let i = 0; i < element.children.length; i++){
                height += element.children[i].clientHeight;
        }

        let parentsHeight = parseFloat(element.style.maxHeight.replace(/px$/, ""));

        if(parentsHeight <= height){
            return true
        }else{
            return false
        }
    };

    return [ref, tableTrue()]
}

export default useTable;