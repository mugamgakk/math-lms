import React from 'react';
import { useState } from 'react';

function useCheck(initail = []) {
    let [data, setData] = useState(initail);
    return [data,"@"];
}

export default useCheck;