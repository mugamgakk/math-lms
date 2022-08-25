import React, {useState} from 'react';
import SelectBase from '../../components/ui/select/SelectBase';

const options = [
    "김밥", "참치"
]


function SelectPage() {

    let [selectOption, setSelectOption] = useState(null);


    return ( 
        <div>
            <h2>셀렉트 베이스</h2>
            <SelectBase 
            onChange={(ele)=>{setSelectOption(ele)}} // 파라미터에 option이 들이있음
            options={options} // 모든 옵션들
            value={selectOption}/>   {/* //현재 값 */}
        </div>
     );
}

export default SelectPage;