import React, { useState }from 'react';



function MarkingModal({title,setMarkingModal}) {

    // 리렌더링 조건
    // 새로운 props 가 들어올때
    // 부모 컴포넌트 랜더링
    // state변경이 있을때

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
                    <>{console.log('render')}</>
                    <table className='headTable'>
                        <tbody>
                            <tr>
                                <th>학생명</th>
                                <td>강수학</td>
                                <th>학년/학기</th>
                                <td>중등 2-1</td>
                                <th>반</th>
                                <td>수학A</td>
                                <th>교재명</th>
                                <td>노벰</td>
                            </tr>
                            <tr>
                                <th>평가명</th>
                                <td>단원 평가</td>
                                <th>문항 수</th>
                                <td>30문항</td>
                                <th>평가일</th>
                                <td>2022.5.20</td>
                                <th>단원명</th>
                                <td>I. 수와 식의 계산</td>
                            </tr>
                        </tbody>
                    </table>
                    <h5>평가 결과 등록</h5>
                    <MarkingTable />
                </div>
                <div className="markingModal-foot cmmnModal-foot">
                    <button className='btn'>입력 완료</button>
                    <button className='btn' onClick={()=>setMarkingModal(false)}>취소</button>
                </div>
            </div>
        </div>
    );
}

function MarkingTable(){
   
    let data = [];
    
    for (let i = 0; i < 30; i++) {
        data[i] = { id: i + 1, 정답: Math.floor(Math.random() * 5) + 1, 학생답: null };
    }
    
    data[16].정답 = [1, 2, 3];
    let [dataList, setDataList] = useState([data.slice(0,10),data.slice(10,20),data.slice(20,30)]);
    
    const clickBtn = (a,b,num) => {

        let copy = [...dataList]
        let answer = copy[a][b].정답;
        let newAnswer = copy[a][b].학생답;
        
        if(Array.isArray(answer)){
            if(!newAnswer){
                newAnswer = [num];
            }else{
                if(newAnswer.includes(num)){
                    newAnswer.splice(newAnswer.indexOf(num),1);
                }else{
                    newAnswer.push(num);
                }
            }
        }else{
            newAnswer = num;
        }
        copy[a][b].학생답 = newAnswer;
        setDataList(copy);
    };

    return(
        <div className='marking'>
        {
            dataList.map((list,a)=>{

               const itemWrap = list.map((item,b)=>{
                    return(
                        <tr key={item.id}>
                            <td className='num'>{item.id}</td>
                            <td className='answer'>{item.정답}</td>
                            <td className='stuAnswer'>
                                {
                                    Array.isArray(item.학생답)
                                    ? (
                                        <>
                                            <button className={ item.학생답 ? (item.학생답.includes(1) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,1)}>①</button>
                                            <button className={ item.학생답 ? (item.학생답.includes(2) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,2)}>②</button>
                                            <button className={ item.학생답 ? (item.학생답.includes(3) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,3)}>③</button>
                                            <button className={ item.학생답 ? (item.학생답.includes(4) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,4)}>④</button>
                                            <button className={ item.학생답 ? (item.학생답.includes(5) ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,5)}>⑤</button>
                                        </>
                                    )
                                    :(
                                        <>
                                            <button className={ item.학생답 ? (item.학생답 === 1 ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,1)}>①</button>
                                            <button className={ item.학생답 ? (item.학생답 === 2 ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,2)}>②</button>
                                            <button className={ item.학생답 ? (item.학생답 === 3 ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,3)}>③</button>
                                            <button className={ item.학생답 ? (item.학생답 === 4 ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,4)}>④</button>
                                            <button className={ item.학생답 ? (item.학생답 === 5 ? 'numBtn active' : 'numBtn') : 'numBtn'} onClick={()=>clickBtn(a,b,5)}>⑤</button>
                                        </>
                                    )
                                }
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