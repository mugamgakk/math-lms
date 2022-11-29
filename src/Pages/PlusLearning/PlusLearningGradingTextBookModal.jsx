import React from 'react';
import { useState } from 'react';
import Icon from '../../components/Icon';

const data = [
    { id: 1, answer: { type: "객관식", result: "④" }, 채점: "정답" },
    { id: 2, answer: { type: "주관식", result: "123" }, 채점: "오답" },
    { id: 3, answer: { type: "서술형", result: "최대공약수 : 20, 최소공배수 : 200" }, 채점: "오답" },
]



function PlusLearningGradingTextBookModal({ title = "제목임", setModal }) {

    let [answer, setAnswer] = useState(data);

    // 모두 정답, 모두오답 바꿔주는 함수
    const allChange = (state) => {
        setAnswer(answer.map(a => { return { ...a, 채점: state } }))
    }

    return (
        <div className='modal PlusLearningGradingTextBookModal'>
            <div className="modal-content" style={{ width: "660px" }}>
                <div className="modal-header">
                    <h2 className='modal-title'>title</h2>
                    <button className='btn' onClick={() => { setModal(false); setAnswer(data) }}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name">
                        <strong className="name">
                            강수학
                        </strong>
                        <ul className="list">
                            <li>중2-1</li>
                            <li>I. 수와 식의 계산</li>
                            <li>번호, 주제</li>
                        </ul>
                    </div>
                    <div style={{ padding: "20px", backgroundColor : "#f7f3f0" }}>
                        <div className='fj'>
                            <p className='text-alert'>
                                각 문항별 정오를 아래 채점표에 입력하면 결과 리포트를 생성할 수 있습니다 .
                                <br />
                                교과서별 내신적중 시험지의 각 문항 정답은 풀이지에서도 확인할 수 있습니다
                            </p>
                            <div className='btn-group'>
                                <div style={{marginBottom : "3px"}}>
                                    <button className='btn-table' onClick={() => { allChange("정답") }}>모두 정답</button>
                                </div>
                                <div>
                                    <button className='btn-table' onClick={() => { allChange("오답") }}>모두 오답</button>
                                </div>
                            </div>
                        </div>
                        <ol className='answer-list'>
                            <li>
                                <div>번호</div>
                                <div>정답</div>
                                <div>채점</div>
                            </li>
                            <li>
                                <div>1</div>
                                <div>4</div>
                                <div>
                                    <button className='btn-red'>정답</button>
                                </div>
                            </li>
                            <li>
                                <div>1</div>
                                <div>4</div>
                                <div>
                                    <button>정답</button>
                                </div>
                            </li>
                            <li>
                                <div>1</div>
                                <div>4</div>
                                <div>
                                    <button>정답</button>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className='btn-orange mr-10' style={{ width: "100px" }}>채점 완료</button>
                    <button className='btn-grey' style={{ width: "100px" }}  onClick={() => { setModal(false); }}>취소</button>
                </div>
            </div>
        </div>
    );
}

const Tr = ({ item }) => {

    let [modal, setModal] = useState(false);

    const Modal = ({ result }) => {
        return (<div>
            정답 : {result}
        </div>)
    }


    return (
        <tr>
            <td>{item.id}</td>
            <td >
                {
                    modal && <Modal result={item.answer.result} />
                }
                {
                    {
                        객관식: item.answer.result,
                        주관식: item.answer.result,
                        서술형: <button className='btn-orange' onClick={() => { setModal(!modal) }}>보기</button>
                    }[item.answer.type]
                }
            </td>
            <td>
                <button className='btn-orange'>
                    {item.채점}
                </button>
            </td>
        </tr>
    )
}

export default PlusLearningGradingTextBookModal;