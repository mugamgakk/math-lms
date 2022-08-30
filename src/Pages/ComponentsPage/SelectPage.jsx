import React, { useState } from "react";
import MultiSelect from "../../components/ui/select/MultiSelect";
import SelectBase from "../../components/ui/select/SelectBase";

const options = ["김밥", "참치", "고구마"];

function SelectPage() {
    let [selectOption, setSelectOption] = useState(null);
    let [multiSelect, setMultiSelect] = useState();

    return (
        <div>
            <h2>셀렉트 베이스</h2>
            <SelectBase
                onChange={(ele) => {
                    setSelectOption(ele);
                }}
                options={options}
                value={selectOption}
            />

            <h2>props</h2>
            <pre>
                {`
                onChange={(ele)=>{setSelectOption(ele)}} // 파라미터에 option이 들이있음<br/>
                options={options} // 모든 옵션들 <br/>
                value={selectOption}  //현재 값 <br/>
                defaultValue={""} //  // 기본값: 선택하세요
            `}
            </pre>

            <h2>멀티 셀렉트</h2>
            <MultiSelect
                options={options}
                onChange={(arr) => {
                    setMultiSelect(arr)
                }}
                value={multiSelect}
            />

            <h2>props</h2>
            <pre>
                {`
                onChange={(ele)=>{setSelectOption(ele)}} // 파라미터에 선택된 어레이 들어있음
                options={options} // 모든 옵션들 
                value={selectOption}  // 선택된 값현재 값 
                defaultValue={""} //  // 기본값: 선택하세요
                limit={1} // 1개까지 선택할수있음
            `}
            </pre>
        </div>
    );
}

export default SelectPage;
