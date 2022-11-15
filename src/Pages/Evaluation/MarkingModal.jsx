import React, { useState, useEffect }from 'react';
import useStudentsStore from "../../store/useStudentsStore";
import ajax from "../../ajax";

function MarkingModal({data,title,setMarkingModal}) {
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    // 리렌더링 조건
    // 새로운 props 가 들어올때
    // 부모 컴포넌트 랜더링
    // state변경이 있을때

    let getAnswer = [];
    
    for (let i = 0; i < 30; i++) {
        getAnswer[i] = { no : i + 1, crt_ans: [Math.floor(Math.random() * 5) + 1] };
    }
    
    getAnswer[16].crt_ans = [1, 2, 3];

    getAnswer.forEach(a => {
        a.std_ans = [];
    })


    let [answerList, setAnswerList] = useState([getAnswer.slice(0,10),getAnswer.slice(10,20),getAnswer.slice(20,30)]);


   

   

    const sendAnswer = async () => {

    
        let url = "/evaluation.php/";
        let query = {
            mode: "ut_score_save",
            usr_seq : clickStudent.usr_seq,
            arr_crt : []
        };

        let res = await ajax(url, { data: query });

        console.log(res);
    
    };

    return (
        <div className="modal">
            <div className="dim"></div>
            <div className='markingModal cmmnModal'>
                <div className="markingModal-head cmmnModal-head">
                    <div className="tit">
                        <strong>{title}</strong>
                    </div>
                    <button className="close" onClick={() => setMarkingModal(false)}>X</button>
                </div>
                <div className="markingModal-body cmmnModal-body">
                    <h5>※ 평가 응시는 1회만 가능합니다. 아래 기본 정보와 학생 답안을 정확히 확인한 후 입력 완료해 주세요. (제출 후 수정 불가)</h5>
                    <table className='headTable'>
                        <tbody>
                            <tr>
                                <th>학생명</th>
                                <td>{clickStudent.um_nm}</td>
                                <th>학년/학기</th>
                                <td>{clickStudent.school_grade}</td>
                                <th>반</th>
                                <td>수학A</td>
                                <th>교재명</th>
                                <td>{data.tb_name}</td>
                            </tr>
                            <tr>
                                <th>평가명</th>
                                <td>{data.kind}</td>
                                <th>문항 수</th>
                                <td>30문항</td>
                                <th>평가일</th>
                                <td>{data.ev_date}</td>
                                <th>단원명</th>
                                <td>{data.ltitle}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h5>평가 결과 등록</h5>
                    <MarkingTable answerList={answerList} setAnswerList={setAnswerList} />
                </div>
                <div className="markingModal-foot cmmnModal-foot">
                    <button className='btn' onClick={sendAnswer}>입력 완료</button>
                    <button className='btn' onClick={()=>setMarkingModal(false)}>취소</button>
                </div>
            </div>
        </div>
    );
}

function MarkingTable({answerList,setAnswerList}){
    const clickBtn = (a,b,num) => {

        let copy = [...answerList]
        let answer = copy[a][b].crt_ans;
        let newAnswer = copy[a][b].std_ans;
   
        if(answer.length === 1){
            newAnswer.length == 0 ? newAnswer = [num] : (
                newAnswer.includes(num) ? newAnswer = [] : newAnswer = [num]
            )
            copy[a][b].std_ans = newAnswer;
            setAnswerList(copy);
            return;

        }
        
        !newAnswer ? newAnswer = [num] 
        : ( 
            newAnswer.includes(num) 
            ? newAnswer.splice(newAnswer.indexOf(num),1) 
            : newAnswer.push(num)
        );
       
        copy[a][b].std_ans = newAnswer;
        setAnswerList(copy);
      
    };
 

    return(
        <div className='marking'>
        {
            answerList.map((list,a)=>{

               const itemWrap = list.map((item,b)=>{
                    return(
                        <tr key={item.no}>
                            <td className='num'>{item.no}</td>
                            <td className='answer'>{item.crt_ans}</td>
                            <td className='stuAnswer'>
                                <button className={ item.std_ans ? (item.std_ans.includes(1) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,1)}>①</button>
                                <button className={ item.std_ans ? (item.std_ans.includes(2) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,2)}>②</button>
                                <button className={ item.std_ans ? (item.std_ans.includes(3) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,3)}>③</button>
                                <button className={ item.std_ans ? (item.std_ans.includes(4) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,4)}>④</button>
                                <button className={ item.std_ans ? (item.std_ans.includes(5) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,5)}>⑤</button>
                            </td>
                        </tr>
                        )
                    })

            return(
                <table className="marking-block" key={a}>
                    <colgroup>
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "60%" }} />
                    </colgroup>
                    <thead>
                        <tr className="marking-block__head">
                            <td className='num'>번호</td>
                            <td className='answer'>정답</td>
                            <td className='stuAnswer'>학생답</td>
                        </tr>
                    </thead>
                        <tbody className="marking-block__body">
                        {itemWrap}
                        </tbody>
                </table>
              )
            })
            }
    </div>
    )
}

export default MarkingModal; 