import React, {useState} from 'react';
import ContentHeader from "../components/ContentHeader";
import SelectBase from "../components/ui/select/SelectBase";

const 학년 = ['전체','초등','중등','고등'];
const search = ['제목','제목+내용','대상'];


function Reference() {
    let [selectOption, setSelectOption] = useState('전체');

    return ( 
            <div className="container reference">
                <ContentHeader title={"자료 및 알림"} />
                <div className="contents">
                    <div className="contents-head">
                        <button className="btn">자료실</button>
                        <button className="btn">학습 알림</button>
                    </div>
                    <div className="contents-body">
                        <div className="contents-body__top">
                            <button className="btn">글쓰기</button>
                            <div className="btn-wrap">
                            <SelectBase 
                            onChange={(ele)=>setSelectOption(ele)}
                            options={학년}
                            value={selectOption}
                            defaultValue='전체'
                            width={'150px'}
                            />

                            </div>
                        </div>
                        <div className="contents-body__middle"></div>
                    </div>
                </div>
            </div>
     );
}

export default Reference;