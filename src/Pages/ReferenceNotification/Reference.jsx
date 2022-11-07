import React, {memo, useState, useEffect} from 'react';
import ajax from "../../ajax";
import SelectBase from "../../components/ui/select/SelectBase";
import ReferenceContentsModal from './ReferenceContentsModal';
import ReferenceRegistrationModal from './ReferenceRegistrationModal';
import styled from 'styled-components';

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
    padding: 0 3px;
    border-radius: 3px;
    font-size: 10px;
    background: red;
    color: #fff;
`
function Reference() {
    let [gradeOption, setGradeOption] = useState('전체');
    let [qcate, setQcate] = useState('제목');
    let [searchInput, setSearchInput] = useState('');
    
    let [lenderList, setLenderList] = useState(null);
    let [registModal, setRegistModal] = useState(false);


    useEffect(()=>{
      getList();
    },[])
    
     const getList = async () => {

        let url = "/board.php";
        let query = {
            mode: "list",
            divide : '초등',
            qcate : 'ti',
            qstr : searchInput,
            page : 1
        };
        
        
        let res = await ajax(url, {data: query});
        let { list } = res.data;

        console.log(res);

        setLenderList(list);
     }

    return (
            <div className="contents-body reference">
                <div className="contents-body__top fj pt-10">
                    <button className="btn" onClick={()=>setRegistModal(true)}>글쓰기</button>
                    <div className="btn-wrap d-flex">
                    <SelectBase 
                    onChange={(ele)=>setGradeOption(ele)}
                    options={학년}
                    value={gradeOption}
                    defaultValue='전체'
                    width={'150px'}
                    />

                    <SelectBase 
                    onChange={(ele)=>setQcate(ele)}
                    options={search}
                    value={qcate}
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

                    <button className='btn' onClick={getList}>조회</button>
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
                    registModal && <ReferenceRegistrationModal setRegistModal={setRegistModal}/>
                }

               
            </div>
    );
}



const Tr = memo(({list})=>{
    let [modal,setModal] = useState(false);

   
    return(
        <tr>
            <td>{list.bd_seq}</td>         
            <td>{list.bd_cate}</td>        
            {/* 제목 클릭하여 글내용 팝업 오픈 */}
            <td onClick={()=>setModal(true)}>
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
            <td>
                {
                    list.files > 0 && <span className='file'></span>
                }
            </td>         
            <td>{list.writer}</td>        
            <td>{list.reg_dt}</td>         
            <td>{list.hit}</td>         
        </tr>
    )    
});

export default Reference;