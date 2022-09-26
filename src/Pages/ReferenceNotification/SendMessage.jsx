import React, {useState,useEffect,memo} from 'react';
import SearchBtn from '../../components/ui/button/SearchBtn';
import ajax from "../../ajax";

function SendMessage() {
    let [sendList, setSendList] = useState(null);
    let [coToState,setCoToState] = useState('co');
    useEffect(()=>{
        ajax("/notice.php/?mode=notice_list_send", {
            qcate : coToState,
            qstr : '박',
            listnum : 30,
            page : 1
        }).then(res=>{
            setSendList(res.data.list);
        })
    },[]);

    useEffect(()=>{
        console.log(sendList);
    },[sendList])

    const readingState = (state) => {
        if(!state.includes('/')) return false;
        
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
                    <button className="btn">메세지 보내기</button>
                    <button className="btn">선택 삭제</button>
                </div>
            </div>
            <div className="messageList">
                <table>
                    <thead>
                        <tr>
                            <td><input type="checkbox" id="all-check"/></td>
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
                                   <Tr list={list} key={i}/>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </>
    );
}

const Tr = memo(({list}) => {
    let [afterReadModal,setAfterReadModal] = useState(false);
    useEffect(()=>{
        console.log(afterReadModal);
    },[afterReadModal])
    return(
        <tr>
            <td>
                <input type="checkbox" name="" id="" />
            </td>
            <td>{list.send_date}</td>
            <td>{list.to_name}</td>

            <td>
                { list.files > 0 && <span className='file'></span> }
            </td>
            <td>{list.subject}</td>
            <td onClick={()=>setAfterReadModal(true)}>{list.status}
                {
                    (list.status.includes('/') && afterReadModal) && 
                    <AfterReadingModal 
                    setAfterReadModal={setAfterReadModal}
                    afterReadModal={afterReadModal}
                    />
                }
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
    useEffect(()=>{
        console.log('asdf');
    },[afterReadModal])
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

                </tbody>
            </table>
        </div>
    )

}


export default SendMessage;