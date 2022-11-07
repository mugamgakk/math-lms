import React, {useState,useEffect,memo} from 'react';
import SearchBtn from '../../components/ui/button/SearchBtn';
import SelectBase from '../../components/ui/select/SelectBase';
import ajax from "../../ajax";
import ViewMessageModal from './ViewMessageModal';
import WriteMessageModal from './WriteMessageModal';

const viewList = [
    { value: 30, label: '30개' },
    { value: 50, label: '50개' },
    { value: 100, label: '100개' },
];


function SendMessage() {
    let [sendList, setSendList] = useState(null);
    let [coToState,setCoToState] = useState('co');
    let [viewListState,setViewListState] = useState();
    let [checkList, setCheckList] = useState([]);
    let [writeModal, setWriteModal] = useState(false);
    let [searchInput, setSearchInput] = useState('');
    
    useEffect(()=>{
        getList();
    },[]);

    useEffect(()=>{
        console.log(checkList);
    },[checkList])

 
    const getList = async () => {
        let url = "/notice.php";
        let query = {
            mode: "notice_list_send",
            qcate : coToState,
            qstr : searchInput,
            listnum : 30,
            page : 1
        };

        let res = await ajax(url, {data: query});
        let { list } = res.data;

        console.log(res)
     
        setSendList(list);
     }

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
    console.log(checkList);
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
                    <div className="searchWrap d-flex">
                        <input type="text" 
                        className='form-control' 
                        style={{width:'200px'}}
                        onChange={(e)=>setSearchInput(e.target.value)}
                        />
                        <SearchBtn />
                        <SelectBase 
                        onChange={(ele)=>setViewListState(ele)}
                        defaultValue='목록 개수'
                        options={viewList}
                        value={viewListState}
                    />
                    </div>
                </div>
                <div className="filters-r">
                    <button className="btn" onClick={() => setWriteModal(true)}>메세지 보내기</button>
                    <button className="btn" onClick={() => deleteList(checkList)}>선택 삭제</button>
                    {
                        writeModal && <WriteMessageModal setWriteModal={setWriteModal} />
                    }
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
                            <td>보낸 시각</td>
                            <td>받는 사람</td>
                            <td>첨부</td>
                            <td>제목</td>
                            <td>상태</td>
                            <td>발송 취소</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sendList && sendList.map((list,i)=> {
                                return(
                                   <Tr list={list} key={i} checkState={checkState} checkList={checkList} />
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </>
    );
}

const Tr = memo(({list, checkState, checkList }) => {
    let [afterReadModal,setAfterReadModal] = useState(false);
    let [viewModal,setViewModal] = useState(false);

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
            <td>{list.to_name}</td>
            <td>
                { list.files > 0 && <span className='file'></span> }
            </td>
            <td onClick={(e)=>{
                e.stopPropagation();
                setViewModal(true);
            }}>{list.subject}
            {
                viewModal && 
                <ViewMessageModal 
                setViewModal={setViewModal} 
                tit='보낸' 
                type='send'
                seq={list.seq}
                />
            }
            </td>
            <td onClick={()=>setAfterReadModal(true)}>{list.status}
                {/* {
                    (list.status.includes('/') && afterReadModal) && 
                    <AfterReadingModal 
                    setAfterReadModal={setAfterReadModal}
                    afterReadModal={afterReadModal}
                    />
                } */}
            </td>
            <td>
                {
                    list.btn_stat == 'cancel' ? <button className='btn'>발송 취소</button> : '-'
                }
            </td>
        </tr>
    )
});

function AfterReadingModal({setAfterReadModal,afterReadModal}){
    let [list,setList] = useState(null);

    if(afterReadModal){
        ajax("/notice.php/?mode=notice_read_detail", {
        }).then(res=>{
            console.log(res);
            setList(res.data);
        })
    }

    return(
        <div className="afterReadingModal">
            <button className='btn'
             onClick={(e)=>{
                setAfterReadModal(false)
                e.stopPropagation();
            }}
             >X</button>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>학년</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list && list.map((student,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{student.to_name}</td>
                                    <td>{student.grade}</td>
                                    <td>{student.status}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}


export default SendMessage;