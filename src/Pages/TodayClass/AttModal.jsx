import React, { useEffect, useState } from "react";
import ScoreItem from './ScoreItem';
import ajax from "../../ajax";
import pencil from "../../assets/pencil.svg";
import Icon from "../../components/Icon";

function AttModal ({setAttModal}) {
    let scoreTitList = [
        '1. 학습에 얼마나 집중하였습니까?',
        '2. 학습에 얼마나 적극적으로 참여하였습니까?',
        '3. 과제를 성실히 수행하였습니까?',
        '4. 개념 노트(P노트)를 잘 정리하였습니까?',
        '5. 오답 노트를 잘 정리하였습니까?',
    ];
    
    let [totalData, setTotalData] = useState([7,7,7,7,7]);

    let [title,setTitle] = useState('');

    useEffect(()=>{
        ajax("/class.php/?mode=get_attitude", {
            cls_seq : 12345,
        }).then(res=>{
            console.log(res);
            setTotalData([...res.data.scores]);
            setTitle(res.data.title);
        })
    },[])

    const numClick = (idx,num) => {

        let copy = [...totalData];
        copy[idx] = num;
        setTotalData([...copy]);        
    
    }


    const formConfirm = () => {
        if(!window.confirm('이 단원의 학습 태도 평가를 저장합니다.')) return false;

        ajax("/class.php/?mode=set_attitude", {
            cls_seq : 12345,
            scores : totalData,
        }).then(res=>{
           window.alert('제출완료');
           setAttModal(false);
        })
    }
    return(
        <div className="modal">
        <div className='modal-content attModal'>
            <div className="modal-header fj">
                    <h2 className="modal-title">학습 태도 평가</h2>
                    <button className="btn" onClick={() => setAttModal(false)}><Icon icon={"close"} /></button>
            </div>
            <div className="modal-body">
                <div className="modal-name" style={{ paddingLeft:'20px' }}>
                    <strong className="name">강수학</strong>
                    <ul className="list">
                        <li>중2-1</li>
                        <li>I. 수와 식의 계산</li>
                        <li>번호, 주제</li>
                    </ul>
                </div>
                <div className="contents" style={{ padding:'20px' }}>
                    <h5 className="m-tit"><img src={pencil} style={{marginRight: '8px'}}/>학생의 개념 이해력과 전달력 점수를 입력해 주세요.</h5>
                    {
                        scoreTitList.map((tit,idx)=> {
                            return(
                                <div className="contents-item">
                                    <ScoreItem key={idx} tit={tit} idx={idx} numClick={numClick} totalData={totalData}/>
                                </div>
                            )
                        })
                            
                    }
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-grey-border mr-4" onClick={()=>setAttModal(false)}>취소</button>
                <button className="btn-orange" onClick={formConfirm}>평가 완료</button>
            </div>
        </div>
        </div>
    )
}

export default AttModal;

