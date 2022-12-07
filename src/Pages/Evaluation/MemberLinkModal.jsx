import React from "react";
import { useState } from "react";
import Icon from "../../components/Icon";
import { falseModal } from "../../methods/methods";


const oprions = [
    { name: "강호동", nickName: "kimssw", 학년: "중2", 반: "2월수" },
    { name: "이수근", nickName: "kimwsw", 학년: "중2", 반: "2월수" },
    { name: "강수학", nickName: "kiamssw", 학년: "중2", 반: "2월수" },
    { name: "강수홍", nickName: "kshhhh", 학년: "중1", 반: "1월금" },
    { name: "강수화", nickName: "minck", 학년: "중1", 반: "1화목토" },
];

function MemberLinkModal({ setModal }) {
    let [searchText, setSearchText] = useState("");
    let [data, setData] = useState(oprions);
    let [choiceUser, setChoiceUser] = useState();

    const seachBtn = () => {
        let result = oprions.filter((a) => {
            let regexp = new RegExp(searchText);

            return regexp.test(a.name);
        });

        setData(result);
    };

    return (
        <div className="modal MemberLinkModal" onClick={(e)=>{ falseModal(e, setModal) }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">[진단평가] 회원연동</h2>
                    <button className="btn" onClick={()=>{setModal(false)}}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name">
                        <strong className="name">진단 평가 점수를 반영할 회원을 선택하세요.</strong>
                    </div>
                    <div style={{ padding: "20px" }}>
                        <div className="mb-10">
                            <input
                                type="text"
                                className="textInput mr-10"
                                style={{ width: "200px" }}
                                placeholder="학생명을 입력하세요"
                                onKeyUp={(e) => {
                                    e.key === "Enter" && seachBtn();
                                }}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                }}
                            />
                            <button className="btn-green">검색</button>
                        </div>
                        <table className="table tableB">
                            <thead>
                                <tr>
                                    <th style={{ width: "50%" }}>이름(아이디)</th>
                                    <th style={{ width: "20%" }}>학년</th>
                                    <th style={{ width: "30%" }}>반</th>
                                </tr>
                            </thead>
                            <tbody style={{ maxHeight: "286px" }}>
                                {data.map((a) => {
                                    return (
                                        <tr className={choiceUser?.nickName === a.nickName ? "active" : ""} >
                                            <td style={{ width: "50%" }} onClick={()=>{ setChoiceUser(a) }}>{a.name}({a.nickName})</td>
                                            <td style={{ width: "20%" }}>{a.학년}</td>
                                            <td style={{ width: "30%" }}>{a.반}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn-grey mr-20"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        취소
                    </button>
                    <button
                        className="btn-orange"
                        onClick={() => {
                            if (window.confirm("선택한 회원의 평가 점수로 연동하시겠습니까 ?")) {
                            }
                        }}
                    >
                        회원 연동
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MemberLinkModal;
