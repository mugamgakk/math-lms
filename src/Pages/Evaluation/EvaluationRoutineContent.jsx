import React from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import { useState } from "react";
import DatePicker from "react-date-picker"; 
import { arrSort } from "../../methods/methods";


const 평가종류 = ["총괄 평가", "단원 평가", "(월말 평가)"];
const 단원 = ["수와 연산", "문자와 식", "좌표평면과 그래프"];

const arr = ["자", "김"];

console.log(arrSort(arr))

function EvaluationRoutineContent() {
    let [selectOption, setSelecOtion] = useState({ 평가종류: "", 단원: "" });
    let [startDay, setStartDay] = useState(new Date());
    let [endDay, setEndDay] = useState(new Date());

    return (
        <div>
            <div className="search-box fj">
                <div>
                <button className="btn">선택 오픈</button>
                </div>
                <div>
                <SelectBase
                    defaultValue="평가 종류"
                    value={selectOption.평가종류}
                    options={평가종류}
                    width={"150px"}
                    onChange={(ele) => {
                        setSelecOtion({ ...selectOption, 평가종류: ele });
                    }}
                />
                <SelectBase
                    defaultValue="단원"
                    value={selectOption.단원}
                    options={단원}
                    width={"150px"}
                    onChange={(ele) => {
                        setSelecOtion({ ...selectOption, 단원: ele });
                    }}
                />

                <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        setStartDay(day)
                    }}
                    value={startDay}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                />
                <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        setEndDay(day)
                    }}
                    value={endDay}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                />
                <button className="btn">조회</button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th> 선택 </th>
                        <th>교재</th>
                        <th>단원</th>
                        <th>평가 종류</th>
                        <th>시험지</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default EvaluationRoutineContent;
