import React from 'react';
import { useState } from 'react';

const data = [
    {id : 1 , answer : {type : "객관식" , result : 4}, 채점 : "정답"},
    {id : 2 , answer : {type : "주관식" , result : "ㄹ,ㅂ"}, 채점 : "오답"},
    {id : 3 , answer : {type : "서술형" , result : "최대공약수 : 20, 최소공배수 : 200"}, 채점 : "오답"},
]



function PlusLearningGradingTextBooklModal({title = "제목임", setGradingModal}) {

    let [answer, setAnswer] = useState(data);

    // 모두 정답, 모두오답 바꿔주는 함수
    const allChange = (state)=>{
        setAnswer(answer.map(a=>{ return {...a, 채점 : state}}))
    }

    return ( 
        <div className='modal-bg'>
            <div className="modal-content">
                <header className='fj p-5' style={{background : "orangered"}}>
                    {title}
                    <button className='btn' onClick={()=>{setGradingModal(false); setAnswer(data)  }}>x</button>
                </header>
                <div className='p-10'>
                    <div className="fj">
                        <p>
                        각 문항별 정오를 아래 채점표에 입력하면 결과 리포트를 생성할 수 있습니다 . <br/>
                        교과서별 내신적중 시험지의 각 문항 정답은 풀이지에서도 확인할 수 있습니다
                        </p>
                        <div>
                            <div>
                                <button className='btn' onClick={()=>{allChange("정답")}}>모두 정답</button>
                            </div>
                            <div>
                                <button className='btn' onClick={()=>{allChange("오답")}}>모두 오답</button>
                            </div>
                        </div>
                    </div>

                    <table>
                        <colgroup>
                            <col style={{width : "55px"}} />
                            <col style={{width : "auto"}} />
                            <col style={{width : "100px"}} />
                        </colgroup>
                        <thead>
                            <tr>
                                <td>번호</td>
                                <td>정답</td>
                                <td>채점</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                answer.map(a=> <Tr item={a} key={a.id} />)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="text-center">
                    <button className="btn">채점완료</button>
                    <button className="btn" onClick={()=>{setGradingModal(false); setAnswer(data) }}>취소</button>
                </div>
            </div>
        </div>
     );
}

const Tr = ({item})=>{

    let [modal, setModal] = useState(false);

    const Modal = ({result})=>{
       return( <div>
            정답 : {result}
        </div>)
    }


    return (
        <tr>
            <td>{item.id}</td>
            <td >
                {
                    modal && <Modal result={item.answer.result}/>
                }
                {
                    {
                        객관식 : <button>{item.answer.result}</button>,
                        주관식 : item.answer.result,
                        서술형 : <button className='btn' onClick={()=>{setModal(!modal)}}>보기</button>
                    }[item.answer.type]
                }
            </td>
            <td>
                <button className='btn'>
                {item.채점}
                </button>
            </td>
        </tr>
    )
}

export default PlusLearningGradingTextBooklModal;