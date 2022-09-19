import React from 'react';
import { useState } from 'react';
import SearchBtn from '../../components/ui/button/SearchBtn';

const oprions = [
    {name : "강호동", nickName : "kimsw", 학년 : "중2", 반 : "2월수"},
    {name : "이수근", nickName : "kimsw", 학년 : "중2", 반 : "2월수"},
    {name : "강수학", nickName : "kimsw", 학년 : "중2", 반 : "2월수"},
    {name : "강수홍", nickName : "kshhhh", 학년 : "중1", 반 : "1월금"},
    {name : "강수화", nickName : "minck", 학년 : "중1", 반 : "1화목토"}
]

function MemberLinkModal({setModal}) {

    let [clickStudent, setClickStudent] = useState(null);
    let [searchText, setSearchText] = useState("");
    let [data, setData] = useState(oprions)

    const seachBtn = ()=>{
        let result = oprions.filter(a=>{
            let regexp = new RegExp(searchText);

            return regexp.test(a.name)
        })

        setData(result)
    }

    return ( 
        <div className="modal-bg">
                <div className="modal-content">
                    <header className="fj">
                        <h4>[진단평가] 회원연동</h4>
                        <button onClick={()=>{setModal(false)}}>닫기</button>
                    </header>
                    <div className="modal-body">
                        <p>진단 평가 점수를 반영할 회원을 선택하세요</p>
                        <input type="text" className="form-control" style={{width : "150px"}} onKeyUp={e=>{ e.key === "Enter" && seachBtn() }} onChange={(e)=>{setSearchText(e.target.value)}}/>
                        <SearchBtn onClick={seachBtn}/>
                        <table>
                            <thead>
                                <tr>
                                    <th>학생명(아이디)</th>
                                    <th>학년</th>
                                    <th>반</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(a=>{
                                        return (
                                            <tr style={clickStudent === a.name ? {background : "orange"} : null}>
                                                <td onClick={()=>{setClickStudent(a.name)}}>
                                                    {a.name}({a.nickName})
                                                </td>
                                                <td>
                                                    {a.학년}
                                                </td>
                                                <td>
                                                    {a.반}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>
                        </table>
                        <div className="text-center">
                            <button className='btn' onClick={()=>{setModal(false)}}>취소</button>
                            <button 
                            className='btn'
                            onClick={()=>{
                                if(window.confirm("선택한 회원의 평가 점수로 연동하시겠습니까 ?")){

                                }
                            }}  
                            >회원 연동</button>
                        </div>
                    </div>
                </div>
            </div>
     );
}

export default MemberLinkModal;