// yeonju
import React, {useState,useEffect,memo} from 'react';
import SearchBtn from '../../components/ui/button/SearchBtn';
import SelectBase from '../../components/ui/select/SelectBase';
import ajax from "../../ajax";
import ViewMessageModal from './ViewMessageModal';
import WriteMessageModal from './WriteMessageModal';
import Icon from '../../components/Icon';
import RadioBox from '../../components/RadioBox';
import Checkbox from '../../components/Checkbox';

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
            setCheckList([...checkList, parseInt(seq)])
        }else{
            setCheckList(checkList.filter(item=> item !== parseInt(seq)))
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

   const deleteList = async (checkList) => {
    let url = "/notice.php";
    let query = {
        mode: "notice_delete",
        delete_num : checkList
    };

    let res = await ajax(url, {data: query});
    console.log(res);

 }

   
//    const deleteList = (checkList) => {
//     console.log(checkList);
//     checkList.length === 0 ? window.alert('1개 이상 선택바람') 
//     : (window.confirm('삭제?') &&
//         ajax("/notice.php/?mode=notice_delete", {
//             delete_no : checkList
//         }).then(res=>{
//             window.alert('삭제 성공');
//         }))
//     }

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
                        <button className="btn-orange" 
                        onClick={() => setWriteModal(true)}
                        style={{ width: '146px' }}
                        >메세지 보내기</button>
                    {
                        writeModal && <WriteMessageModal setWriteModal={setWriteModal} />
                    }
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
                            <th style={{ width:'13.33%' }}>보낸 시각</th>
                            <th style={{ width:'10.66%' }}>받는 사람</th>
                            <th style={{ width:'8%' }}>첨부</th>
                            <th style={{ width:'38.66%' }}>제목</th>
                            <th style={{ width:'15.26%' }}>상태</th>
                            <th style={{ width:'10.73%' }}>발송 취소</th>
                        </tr>
                    </thead>
                    <tbody className='scroll'>
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
            <td style={{ width:'3.33%' }}>
                 <Checkbox
                  onChange={(e)=>checkState(e.target.checked,list.seq)}
                  checked={checkList.includes(list.seq)}
                 />
            </td>
            <td style={{ width:'13.33%' }}>{list.send_date}</td>
            <td style={{ width:'10.66%' }}>{list.to_name}</td>
            <td style={{ width:'8%' }}>
                { list.files > 0 && <span className='file'><Icon icon={"clip"} style={{ fontSize:'30px' }}/></span> }
            </td>
            <td style={{ width:'38.66%' }} onClick={(e)=>{
                e.stopPropagation();
                setViewModal(true);
            }}>{list.subject}
            {
                viewModal && 
                <ViewMessageModal 
                setViewModal={setViewModal} 
                type='send'
                seq={list.seq}
                />
            }
            </td>
            <td style={{ width:'15.26%' }} onClick={()=>setAfterReadModal(true)}>{list.status}
                {/* {
                    (list.status.includes('/') && afterReadModal) && 
                    <AfterReadingModal 
                    setAfterReadModal={setAfterReadModal}
                    afterReadModal={afterReadModal}
                    />
                } */}
            </td>
            <td style={{ width:'10.73%' }}>
                {
                    list.btn_stat == 'cancel' ? <button className='btn-table'>발송 취소</button> : '-'
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