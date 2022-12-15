// yeonju
import React, {useState,useEffect,memo} from 'react';
import SearchBtn from '../../components/ui/button/SearchBtn';
import SelectBase from '../../components/ui/select/SelectBase';
import ajax from "../../ajax";
import ViewMessageModal from './ViewMessageModal';
import WriteMessageModal from './WriteMessageModal';
import RadioBox from '../../components/RadioBox';
import Icon from '../../components/Icon';
import Checkbox from '../../components/Checkbox';

const viewList = [
    { value: 30, label: '30개' },
    { value: 50, label: '50개' },
    { value: 100, label: '100개' },
];

function GetMessage() {
    let [sendList, setSendList] = useState(null);
    let [coToState,setCoToState] = useState('co');
    let [viewListState,setViewListState] = useState();
    let [checkList, setCheckList] = useState([]);
    let [searchInput, setSearchInput] = useState();

    useEffect(()=>{
        ajax("/notice.php", { data: {
            mode : 'notice_list_receive',
            qcate : 'co',
            qstr : '박',
            listnum : 30,
            page : 1
        }
        }).then(res=>{
            console.log(res);
            setSendList(res.data.list);
        })
    },[]);

    
    const checkState = (checked, seq) => {
        if(checked){
            setCheckList([...checkList, seq])
        }else{
            setCheckList(checkList.filter(item=> item !== seq))
        }
    }

   const allCheckState = (checked) => {
    if(checked){
        let arr = [];
        sendList.map(item => {
            arr.push(item.seq);
        })
        setCheckList([...arr]);
    }else{
        setCheckList([]);
    }
   }
   
   const deleteList = (checkList) => {
    checkList.length === 0 ? window.alert('1개 이상 선택바람') 
    : (window.confirm('삭제?') &&
     ajax("/notice.php/?mode=notice_delete", {
         delete_no : checkList
     }).then(res=>{
        window.alert('삭제 성공');
     }))
    }

    return (  
        <>
           <div className="filters fj mt-20 mb-20"> 
                <div className="filters-l fa">
                <button className="btn-grey mr-10" onClick={() => deleteList(checkList)}>선택 삭제</button>
                <SelectBase 
                    onChange={(ele)=>setViewListState(ele)}
                    defaultValue='목록 개수'
                    options={viewList}
                    value={viewListState}
                    />
                </div>
                <div className="filters-r fa">
                    <RadioBox 
                    checked={coToState == 'co'} 
                    onChange={()=>setCoToState('co')} 
                    label={'내용'}
                    className={'mr-10'}
                    />
                    <RadioBox 
                    checked={coToState == 'to'} 
                    onChange={()=>setCoToState('to')} 
                    label={'받는 사람'}
                    />
                    <input
                        type='text' 
                        className="textInput mr-10" 
                        placeholder='메세지 검색' 
                        onChange={(e)=>setSearchInput(e.target.value)} 
                        style={{ width: '200px' }}
                        />
                        <button type='button' 
                        className='btn-search btn-green btn-icon mr-10'
                        >
                            <Icon icon={"search"} />검색
                        </button>
                </div>
            </div>
            <div className="messageList">
                <table className='table tableA'>
                    <thead>
                        <tr>
                            <th style={{ width:'3.33%' }}>
                             <Checkbox 
                            id={'all'}
                            onChange={(e)=>allCheckState(e.target.checked)}
                            checked={ checkList?.length === sendList?.length }
                            />
                            <label htmlFor="all"></label>
                            </th>
                            <th style={{ width:'13.33%' }}>받은 시각</th>
                            <th style={{ width:'10.66%' }}>보낸 사람</th>
                            <th style={{ width:'8%' }}>학년</th>
                            <th style={{ width:'54%' }}>제목</th>
                            <th style={{ width:'10.66%' }}>답장</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sendList && sendList.map((list,i)=> {
                                return(
                                   <Tr list={list} key={i} checkState={checkState} checkList={checkList}/>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

const Tr = memo(({list, checkState, checkList}) => {
    let [viewModal,setViewModal] = useState(false);
    let [writeModal,setWriteModal] = useState(false);
    let [to,setTo] = useState(list.from_name);
    return(
        <tr>
            <td style={{ width:'3.33%' }}>
                <Checkbox
                  onChange={(e)=>checkState(e.target.checked,list.seq)}
                  checked={checkList.includes(list.seq)}
                 />
            </td>
            <td style={{ width:'13.33%' }}>{list.send_date}</td>
            <td style={{ width:'10.66%' }}>{list.from_name}</td>
            <td style={{ width:'8%' }}>{list.grade}</td>
            <td style={{ width:'54%' }} onClick={(e)=>{
                e.stopPropagation();
                setViewModal(true);
                }}>{list.subject}
            {
                viewModal && 
                <ViewMessageModal 
                setViewModal={setViewModal} 
                viewModal={viewModal} 
                tit='받은'
                type='receive'
                seq={list.seq}
                setWriteModal={setWriteModal}
                />
            }
            </td>
            <td style={{ width:'10.66%' }}>
                <button className='btn' onClick={()=>{
                    setWriteModal(true);
                    }}>답장 쓰기</button>
                {
                   writeModal && 
                   <WriteMessageModal 
                   setWriteModal={setWriteModal} 
                   setViewModal={setViewModal}
                    toName={list.from_name}
                   />
                }
            </td>
        </tr>
    )
});



export default GetMessage;