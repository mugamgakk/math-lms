// yeonju
import React, { useState, useEffect }from 'react';
import useStudentsStore from "../../store/useStudentsStore";
import ajax from "../../ajax";
import Icon from '../../components/Icon';

function MarkingModal({data,setMarkingModal}) {
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let [answerList, setAnswerList] = useState(null);
    // 리렌더링 조건
    // 새로운 props 가 들어올때
    // 부모 컴포넌트 랜더링
    // state변경이 있을때

    useEffect(()=>{
        getList();
    },[])

    const getList = async () => {
        let url = "/evaluation.php/";
        let query = {
            mode : 'ut_score',
            usr_seq : clickStudent.usr_seq
        };
        
        let res = await ajax(url, { data: query });
        console.log(res);
        setAnswerList([res.data.slice(0,10),res.data.slice(10,20),res.data.slice(20,30)])
    }

    const sendAnswer = async () => {

        if(!window.confirm('전송?')) return;

        let newAnswer = [...answerList];
        let newArr = newAnswer[0].concat(newAnswer[1],newAnswer[2]);
        
        newArr.forEach(a=>{
            delete a.crt_ans;
        })

        let url = "/evaluation.php/";
        let query = {
            mode: "ut_score_save",
            usr_seq : clickStudent.usr_seq,
            arr_crt : newArr
        };
        
        let res = await ajax(url, { data: query });
        
        setMarkingModal(false);

    };

    
    return (
        <div className="modal">
            <div className='modal-content markingModal'>
                <div className="modal-header fj">
                <h2 className="modal-title">단원 평가</h2>
                    <button className="btn" onClick={(e) => {
                        e.stopPropagation();
                        setMarkingModal(false)
                    }}>
                    <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name" style={{ paddingLeft:'20px' }}>
                        <strong className="name">{clickStudent.um_nm}</strong>
                        <ul className="list">
                            <li>{clickStudent.school_grade}</li>
                            <li>I. 수와 식의 계산</li>
                            <li>번호, 주제</li>
                        </ul>
                    </div>
                    <div className="contents">
                        <h5 className='warning mb-10'>※ 평가 응시는 1회만 가능합니다. 아래 기본 정보와 학생 답안을 정확히 확인한 후 입력 완료해 주세요. (제출 후 수정 불가)</h5>
                        <table className='table-head'>
                            <colgroup>
                                <col width='10%'/>
                                <col width='15%'/>
                                <col width='10%'/>
                                <col width='15%'/>
                                <col width='10%'/>
                                <col width='15%'/>
                                <col width='10%'/>
                                <col width='15%'/>
                            </colgroup>
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
                        {
                            answerList && <MarkingTable answerList={answerList} setAnswerList={setAnswerList} />
                        }
                    </div>
                </div>
                <div className="modal-footer">
                    <button className='btn-grey mr-4' onClick={()=>setMarkingModal(false)}>취소</button>
                    <button className='btn-orange' onClick={sendAnswer}>입력 완료</button>
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
        <div className='marking fj'>
        {
            answerList.map((list,a)=>{

               const itemWrap = list.map((item,b)=>{
                    return(
                        <tr key={item.no}>
                            <td className='num'>{item.no}</td>
                            <td className='answer'>
                                {
                                    item.crt_ans.length < 2 ? (
                                        { 
                                            1 : '①',
                                            2 : '②',
                                            3 : '③',
                                            4 : '④',
                                            5 : '⑤',
                                        }[item.crt_ans]
                                    ) : (
                                        item.crt_ans.map((a,i) => {
                                            return (
                                                <>
                                                {
                                                    {
                                                        1 : '①',
                                                        2 : '②',
                                                        3 : '③',
                                                        4 : '④',
                                                        5 : '⑤',  
                                                    }[a]
                                                }
                                                {
                                                    i < item.crt_ans.length - 1 && ',' 
                                                }
                                                </>
                                            )

                                        })
                                    )
                                }
                            </td>
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
                <table className="table-body" key={a}>
                    <colgroup>
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "60%" }} />
                    </colgroup>
                    <thead>
                        <tr className="marking-block__head">
                            <th className='num'>번호</th>
                            <th className='answer'>정답</th>
                            <th className='stuAnswer'>학생답</th>
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