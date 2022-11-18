import React, { useEffect, useState } from "react";
import ScoreItem from './ScoreItem';
import ajax from "../../ajax";

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
        <div className="dim"></div>
        <div className='attModal cmmnModal'>
            <div className="attModal-head cmmnModal-head">
                    <div className="tit">
                        <strong>[학습 태도 평가]</strong>
                        {title}
                    </div>
                    <button className="close" onClick={() => setAttModal(false)}>X</button>
            </div>
            <div className="attModal-body cmmnModal-body">
                <h5>이 단원의 학습 태도를 10점 만점으로 평가해 주세요.</h5>
                <ul>
                    {
                        scoreTitList.map((tit,idx)=> {
                            return(
                                <ScoreItem key={idx} tit={tit} idx={idx} numClick={numClick} totalData={totalData}/>
                            )
                        })
                            
                    }
                </ul>
            </div>
            <div className="attModal-foot cmmnModal-foot">
                <button className="btn" onClick={()=>setAttModal(false)}>취소</button>
                <button className="btn" onClick={formConfirm}>평가 완료</button>
            </div>
        </div>
        </div>
    )
}

export default AttModal;

