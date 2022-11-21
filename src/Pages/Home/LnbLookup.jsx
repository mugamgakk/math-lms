import React from "react";
import { useState } from "react";
import ajax from "../../ajax";
import SelectBase from "../../components/ui/select/SelectBase";

const 본부 = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
];
const 캠퍼스 = [
    { value: null, label: "캠퍼스" },
    { value: "본사", label: "본사" },
    { value: "경기", label: "경기" },
];
function LnbLookup() {
    let [bon, setBon] = useState("");
    let [campus, setCampus] = useState("");
    // 검색
    let [keyward, setKeyward] = useState("");

    let [standard, setStandard] = useState("분류");

    const getCampusInfo = async () => {
        const data = {
            mode: "get_campus_info",
            qteam: bon,
            qarea: campus,
            qcampus: keyward,
        };
        let res = await ajax("user.php", { data });
    };

    return (
        <div className="lnb-lookup">
            <div className="lnb-lookup__btn">
                <button 
                className={`${standard === "분류" ? "active" : ""}`}
                onClick={()=>{setStandard("분류")}}
                >
                    분류검색</button>
                <button 
                    className={`${standard === "키워드" ? "active" : ""}`}
                    onClick={()=>{setStandard("키워드")}}
                >
                    키워드검색</button>
            </div>
            <input
                type="text"
                value={keyward}
                onChange={(e) => {
                    setKeyward(e.target.value);
                }}
                className="form-control"
                style={{marginBottom : "4px"}}
                placeholder="검색어를 입력하세요"
            />
            <SelectBase
                width="100%"
                value={campus}
                options={캠퍼스}
                defaultValue="캠퍼스를 선택하세요"
                onChange={(ele) => {
                    setCampus(ele);
                }}
            />
        </div>
    );
}

export default LnbLookup;
