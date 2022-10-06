import React, {useState,useEffect,memo} from 'react';
import SearchBtn from '../../components/ui/button/SearchBtn';
import ajax from "../../ajax";
import ViewMessageModal from './ViewMessageModal';
import WriteMessageModal from './WriteMessageModal';

function GetMessage() {
    let [sendList, setSendList] = useState(null);
    let [coToState,setCoToState] = useState('co');
    let [checkList, setCheckList] = useState([]);

    useEffect(()=>{
        ajax("/notice.php", { data: {
            mode : 'notice_list_receive',
            qcate : coToState,
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
            <div className="filters fj mt-10 mb-10">
                <div className="filters-l">
                    <div className='radioArea'>
                        <input 
                        type='radio' 
                        name='mRadio' 
                        id='contents'
                        onChange={()=>setCoToState('co')}
                        checked={coToState == 'co'}
                        className='radioInput'/>
                        <label htmlFor='contents'>내용</label>
                    </div>
                    <div className='radioArea'>
                        <input 
                        type='radio' 
                        name='mRadio' 
                        id='target'
                        onChange={()=>setCoToState('to')}
                        checked={coToState == 'to'}
                        className='radioInput'/>
                        <label htmlFor='target'>받는 사람</label>
                    </div>
                    <div className="searchWrap">
                        <input type="text" className='form-control' style={{width:'200px'}}/>
                        <SearchBtn />
                    </div>
                </div>
                <div className="filters-r">
                    <button className="btn" onClick={()=>deleteList(checkList)}>선택 삭제</button>
                </div>
            </div>
            <div className="messageList">
                <table>
                    <thead>
                        <tr>
                            <td><input type="checkbox" 
                            id="all-check"
                            onChange={(e)=>allCheckState(e.target.checked)}
                            checked={
                                sendList ?
                                checkList.length === sendList.length
                                : false
                            }
                            /></td>
                            <td>받은 시각</td>
                            <td>보낸 사람</td>
                            <td>학년</td>
                            <td>제목</td>
                            <td>답장</td>
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
            <td>
            <input type="checkbox"
                 name=""
                 id={list.seq}
                 onChange={(e)=>checkState(e.target.checked,list.seq)}
                 value=''
                 checked={checkList.includes(list.seq)}
                 />
            </td>
            <td>{list.send_date}</td>
            <td>{list.from_name}</td>
            <td>{list.grade}</td>
            <td onClick={(e)=>{
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
            <td>
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