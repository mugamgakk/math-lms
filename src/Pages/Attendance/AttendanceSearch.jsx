import React, { useState } from "react";
import SearchBtn from "../../components/ui/button/SearchBtn";
import SelectBox from "../../components/ui/select/SelectBox";

function AttendanceSearch({ data, setChulCheckList }) {
    let [search, setSearch] = useState("");

    // 찾기 버튼
    const findUser = () => {
        let array = [];

        data.forEach(function (a) {
            let regexp = new RegExp(search);

            if (regexp.test(a.name)) {
                array.push(a);
            }
        });
        setChulCheckList(array);
    };

    console.log(data)

    // 반 조회
    const findBan = (choiceArr)=>{
        
        const matchingArr = data.filter(a=>{
            for(let ele of choiceArr){
                if(a.반이름 === ele){
                    return true
                }
            }
        })

        setChulCheckList(matchingArr)
    }

    return (
        <div>
            <SelectBox width={"200px"} onChange={findBan}/>

            <input
                type="text"
                className="form-control"
                placeholder="학생"
                style={{ width: "200px", margin: "0 5px" }}
                value={search}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        findUser();
                    }
                }}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <SearchBtn onClick={findUser} />
        </div>
    );
}

export default AttendanceSearch;
