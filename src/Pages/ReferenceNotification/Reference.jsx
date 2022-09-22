import React, {memo, useState} from 'react';
import useStore from '../../store/useReferenceStore';

import SelectBase from "../../components/ui/select/SelectBase";
import { useEffect } from 'react';
import ReferenceContentsModal from './ReferenceContentsModal';
import ReferenceRegistrationModal from './ReferenceRegistrationModal';

const 학년 = ['전체','초등','중등','고등'];
const search = ['제목','제목+내용','대상'];

function Reference() {
    let [gradeOption, setGradeOption] = useState('전체');
    let [searchOption, setSearchOption] = useState('전체');
    let [searchInput, setSearchInput] = useState('');
    let {list} = useStore(state=>state);

    let [lenderList, setLenderList] = useState(null);
    let [registModal, setRegistModal] = useState(false);

    useEffect(()=>{
        setLenderList(list);

    },[])
    
     

    return (
            <div className="contents-body reference">
                <div className="contents-body__top fj pt-10">
                    <button className="btn" onClick={()=>setRegistModal(true)}>글쓰기</button>
                    <div className="btn-wrap">
                    <SelectBase 
                    onChange={(ele)=>setGradeOption(ele)}
                    options={학년}
                    value={gradeOption}
                    defaultValue='전체'
                    width={'150px'}
                    />

                    <SelectBase 
                    onChange={(ele)=>setSearchOption(ele)}
                    options={search}
                    value={searchOption}
                    defaultValue='제목'
                    width={'150px'}
                    />

                    <input 
                    type="text" 
                    className='form-control' 
                    placeholder='조회' 
                    style={{ width: '200px' }}
                    onChange={(e)=>setSearchInput(e.target.value)}
                    />

                    <button className='btn'>조회</button>
                    </div>
                </div>
                <div className="contents-body__middle pt-10">
                    <table>
                        <colgroup>
                            <col style={{width:'5%'}}/>
                            <col style={{width:'5%'}}/>
                            <col style={{width:'48%'}}/>
                            <col style={{width:'10%'}}/>
                            <col style={{width:'12%'}}/>
                            <col style={{width:'10%'}}/>
                            <col style={{width:'10%'}}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>대상</td>
                                <td>글 제목</td>
                                <td>첨부 파일</td>
                                <td>작성자</td>
                                <td>작성일</td>
                                <td>조회수</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lenderList && lenderList.map(list=>{
                                    return(
                                        <Tr list={list}/>
                                    )
                                })
                            }
                        </tbody>
                    
                    </table>

                </div>
                {
                    registModal && <ReferenceRegistrationModal setRegistModal={setRegistModal}/>
                }
            </div>
    );
}


const Tr = memo(({list})=>{
    let [modal,setModal] = useState(false);

   
    return(
        <tr>
            <td>{list.no}</td>         
            <td>{list.target}</td>        
            {/* 제목 클릭하여 글내용 팝업 오픈 */}
            <td onClick={()=>setModal(true)}>
                {
                    modal && <ReferenceContentsModal listNum={list.no} setModal={setModal}/>
                }
                {
                    list.badge === '공지' && <span className='badge notice'>공지</span> 
                } 
                {
                    list.badge === '필독' && <span className='badge required'>필독</span>
                }
                {
                    list.badge === '이벤트' && <span className='badge event'>이벤트</span>
                }
                {list.title}
                </td>         
            <td>
                {
                    list.file && <span className='file'></span>
                }
            </td>         
            <td>{list.writer}</td>        
            <td>{list.date}</td>         
            <td>{list.view}</td>         
        </tr>
    )    
});

export default Reference;