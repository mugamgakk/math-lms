import React from "react";
import { useState } from "react";
import ajax from "../../ajax";
import SelectBase from "../../components/ui/select/SelectBase";

const 본부 = [1, 2, 3];
const 캠퍼스 = ["본사", "경기"];

function LnbLookup() {
    let [bon, setBon] = useState("");
    let [campus, setCampus] = useState("");
    let [keyward, setKeyward] = useState("");

    const getCampusInfo = async () => {
        const data = {
            mode: "get_campus_info",
            qteam: bon,
            qarea : campus,
            qcampus : keyward
        };
        let res = await ajax("user.php", {data});

        console.log(res);
    };

    return (
        <div className="lnb-lookup">
            <div className="border-bottom p-2">
                <SelectBase
                    width="70px"
                    defaultValue="본부"
                    value={bon}
                    onChange={(ele) => {
                        setBon(ele);
                    }}
                    options={본부}
                />
                <SelectBase
                    width="150px"
                    defaultValue="캠퍼스를 선택하세요"
                    value={campus}
                    onChange={(ele) => {
                        setCampus(ele);
                    }}
                    options={캠퍼스}
                />
            </div>
            <div className="p-2">
                <input
                    type="text"
                    className="form-control mb-1"
                    style={{ width: "75%" }}
                    value={keyward}
                    placeholder="키워드를 입력하세요"
                    onChange={e=>setKeyward(e.target.value)}
                />
                <button className="btn" onClick={getCampusInfo}>조회</button>
                <SelectBase width="100%" defaultValue="캠퍼스를 선택하세요" />
            </div>
        </div>
    );
}

export default LnbLookup;
