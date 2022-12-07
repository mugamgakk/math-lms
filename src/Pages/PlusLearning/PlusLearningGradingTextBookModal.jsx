import React from "react";
import { useState } from "react";
import Icon from "../../components/Icon";
import ajax from "../../ajax";
import { useEffect } from "react";
import {_cloneDeep } from "../../methods/methods"



function PlusLearningGradingTextBookModal({ setModal }) {
    
    let [list, setList] = useState(null);

    // 모두 정답, 모두오답 바꿔주는 함수
    const allChange = (param)=>{
        let copy = _cloneDeep(list);

        if(param){
            setList(copy.map(a=> a.is_correct = 1 ))
        }else{
            setList(copy.map(a=> a.is_correct = 0 ))
        }
        setList(copy);
    }

    const toggleBtn = ({num, state})=>{
        let copy = _cloneDeep(list);
        
        copy.forEach(a=>{
            if(a.no == num){
                a.is_correct = state
            }
        })

        setList(copy);
    }

    const getList = async () => {
        let res = await ajax("/class_plus.php", { data: { mode: "tb_score_view", tb_seq: 124 } });

        console.log(res.data)
        setList(res.data);
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="modal PlusLearningGradingTextBookModal">
            <div className="modal-content" style={{ width: "660px" }}>
                <div className="modal-header">
                    <h2 className="modal-title">교과서별 내신적중</h2>
                    <button
                        className="btn"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name">
                        <strong className="name">강수학</strong>
                        <ul className="list">
                            <li>중2-1</li>
                            <li>I. 수와 식의 계산</li>
                            <li>번호, 주제</li>
                        </ul>
                    </div>
                    <div style={{ padding: "20px", backgroundColor: "#f7f3f0" }}>
                        <div className="fj">
                            <p className="text-alert">
                                ※ 각 문항별 정오를 아래 채점표에 입력하면 결과 리포트를 생성할 수
                                있습니다.
                                <br />
                                교과서별 내신적중 시험지의 각 문항 정답은 풀이지에서도 확인할 수
                                있습니다.
                            </p>
                            <div className="btn-group">
                                <div style={{ marginBottom: "3px" }}>
                                    <button
                                        className="btn-table btn-red"
                                        onClick={() => {
                                            allChange(true);
                                        }}
                                    >
                                        모두 정답
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="btn-table btn-red-border"
                                        onClick={() => {
                                            allChange(false);
                                        }}
                                    >
                                        모두 오답
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ol className="answer-list">
                            <li>
                                <div>번호</div>
                                <div>정답</div>
                                <div>채점</div>
                            </li>
                            {list?.map(function (a) {
                                return <Tr item={a} toggleBtn={toggleBtn} />;
                            })}
                        </ol>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-orange mr-10" style={{ width: "100px" }}>
                        채점 완료
                    </button>
                    <button
                        className="btn-grey"
                        style={{ width: "100px" }}
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

const Tr = ({ item, toggleBtn }) => {
    

    return (
        <li>
            <div>{item.no}</div>
            <div>{item.crt_ans}</div>
            <div>
                <button className={`${item.is_correct == 1 ? "btn-red" : "btn-red-border"}`} onClick={()=>{ toggleBtn({num : item.no, state : item.is_correct == 1 ? 0 : 1} ) }}>
                    {item.is_correct == 1 ? "정답" : "오답"}
                </button>
            </div>
        </li>
    );
};

export default PlusLearningGradingTextBookModal;
