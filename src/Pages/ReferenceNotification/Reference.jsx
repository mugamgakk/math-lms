// yeonju
import React, {memo, useState, useEffect} from 'react';
import ajax from "../../ajax";
import SelectBase from "../../components/ui/select/SelectBase";
import ReferenceContentsModal from './ReferenceContentsModal';
import ReferenceRegistrationModal from './ReferenceRegistrationModal';
import styled from 'styled-components';
import Icon from '../../components/Icon';
import { _isScroll } from '../../methods/methods';
import Pagination from '../../components/Pagination';

const 학년 = [
    { value: '전체', label: '전체' },
    { value: '초등', label: '초등' },
    { value: '중등', label: '중등' },
    { value: '고등', label: '고등' },
];

const search = [
    { value: '제목', label: '제목' },
    { value: '제목+내용', label: '제목+내용' },
    { value: '대상', label: '대상' },
];

const NewBadge = styled.span`
    border-radius: 3px;
    background: red;
    color: #fff;
    width: 18px;
    height: 18px;
    font-size: 14px;
    text-align: center;
    line-height: 18px;
    font-weight: 500;
    position: relative;
    top: -4px;
    left: 5px;

`
function Reference() {
    let [gradeOption, setGradeOption] = useState('중등');
    let [qcate, setQcate] = useState('제목');
    let [searchInput, setSearchInput] = useState('');
    
    let [lenderList, setLenderList] = useState(null);
    let [registModal, setRegistModal] = useState(false);
    let [scroll, setScroll] = useState();
    let [page, setPage] = useState(1);

    useEffect(()=>{
      getList();
    },[])
    
     const getList = async () => {

        let url = "/board.php";
        let query = {
            mode : 'list',
            divide : '',
            qcate : '',
            qstr : searchInput,
            page : 1
        };
        
        let res = await ajax(url, {data: query});
        let { list } = res.data;

        console.log(res);
        setLenderList(list);
    
    }

    useEffect(()=>{
        setScroll(_isScroll('reference-table', 500));
    });
    return (
            <div className="reference">
                <div className="top fj mb-20">
                    <button className="btn-green btn-icon" onClick={()=>setRegistModal(true)}><Icon icon={"pencil"} />글쓰기</button>
                    <div className="btn-wrap d-flex">
                    <SelectBase 
                    onChange={(ele)=>setGradeOption(ele)}
                    options={학년}
                    value={gradeOption}
                    defaultValue='전체'
                    width={'150px'}
                    className={"mr-10"}
                    />
                    <SelectBase 
                    onChange={(ele)=>setQcate(ele)}
                    options={search}
                    value={qcate}
                    defaultValue='제목'
                    width={'150px'}
                    className={"mr-10"}
                    />

                    <input 
                    type="text" 
                    className='textInput mr-10' 
                    placeholder='조회' 
                    style={{ width: '200px' }}
                    onChange={(e)=>setSearchInput(e.target.value)}
                    />

                    <button className='btn-green btn-icon' onClick={getList}><Icon icon={"search"} />조회</button>
                    </div>
                </div>
                <div className="contents-body__middle pt-10">
                    <table className='reference-table custom-table mb-20'>
                        <thead>
                            <tr>
                                <th style={{ width:'6.93%' }}>번호</th>
                                <th style={{ width:'9.33%' }}>대상</th>
                                <th style={{ width:'48.73%' }}>글 제목</th>
                                <th style={{ width:'6.66%' }}>첨부 파일</th>
                                <th style={{ width:'9.33%' }}>작성자</th>
                                <th style={{ width:'9.33%' }}>작성일</th>
                                <th style={{ width:'9.73%' }}>조회수</th>
                               {
                                    scroll && <th style={{ width: '17px', border:'none' }}></th>
                               }
                            </tr>
                        </thead>
                        <tbody style={{ maxHeight:"500px" }}>
                            {
                                lenderList ? lenderList.map((list,i)=>{
                                    return(
                                        <Tr list={list} key={i}/>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </div>
                {
                    registModal && <ReferenceRegistrationModal setModal={setRegistModal}/>
                }
                <Pagination 
                setPage={setPage}
                page={page}
                />
            </div>
    );
}

const Tr = memo(({list})=>{
    let [modal,setModal] = useState(false);
   
    return(
        <tr>
            <td style={{ width:'6.93%' }}>{list.bd_seq}</td>         
            <td style={{ width:'9.33%' }}>{list.bd_cate}</td>        
            {/* 제목 클릭하여 글내용 팝업 오픈 */}
            <td className="title t-start" style={{ width:'48.73%' }} onClick={()=>setModal(true)}>
                {
                    modal && <ReferenceContentsModal seq={list.bd_seq} setModal={setModal}/>
                }
                {
                    list.bd_notice === 'H' && <span className='badge notice'>필독</span> 
                } 
                {
                    list.bd_notice === 'N' && <span className='badge required'>공지</span>
                }
                {
                    list.bd_notice === 'E' && <span className='badge event'>이벤트</span>
                }
                {list.bd_title}
                {
                    list.news > 0 && <NewBadge>N</NewBadge>
                }
            </td>         
            <td style={{ width:'6.66%' }}>
                {
                    list.files > 0 && <span className='file'><Icon icon={"clip"} style={{ fontSize:'30px' }} /></span>
                }
            </td>         
            <td style={{ width:'9.33%' }}>{list.writer}</td>        
            <td style={{ width:'9.33%' }}>{list.reg_dt}</td>         
            <td style={{ width:'9.73%' }}>{list.hit}</td>         
        </tr>
    )    
});

export default Reference;