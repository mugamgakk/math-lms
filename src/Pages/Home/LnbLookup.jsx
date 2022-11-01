import React from 'react';
import ajax from '../../ajax';
import SelectBase from '../../components/ui/select/SelectBase';

function LnbLookup() {

    const getCampusInfo = async()=>{
        const data = {
            mode : "get_campus_info",
            qteam : 1
        }
        ajax("user.php")
    }

    return (
        <div className="lnb-lookup">
            <div className="border-bottom p-2">
                <SelectBase width="70px" defaultValue="본부" />
                <SelectBase width="150px" defaultValue="캠퍼스를 선택하세요" />
            </div>
            <div className="p-2">
                <input type="text" className="form-control mb-1" style={{ width: "75%" }} placeholder="키워드를 입력하세요" />
                <button className="btn">조회</button>
                <SelectBase width="100%" defaultValue="캠퍼스를 선택하세요" />
            </div>
        </div>
    );
}

export default LnbLookup;