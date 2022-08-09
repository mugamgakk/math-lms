import React, { useEffect } from 'react';
import SelectBox from '../components/ui/SelectBox';
import ContentHeader from '../layouts/ContentHeader';
import { useSelector, useDispatch } from 'react-redux'
import {getStudentsList, setClickStudent} from '../feature/studentsListSlice';
import DetailClassContent from '../layouts/DetailClassContent';




function DetailClass() {

    let {user} = useSelector(state=>state.studentList);
    let dispatch = useDispatch();

    

    useEffect(()=>{
        dispatch(getStudentsList())
    },[])

    const getUser = (e)=>{

        let ele = e.target;

        let data = {
            name : ele.innerHTML,
            age : ele.nextSibling.innerHTML
        }


        dispatch(setClickStudent(data));
    }


    return ( 
        <div className='container'>
            <ContentHeader title={'학생별 수업 관리'} />

            <div className='row'>
            <div className="students-search">
                <header className='row' style={{padding : '10px 0'}}>
                    <SelectBox width={'150px'}/>
                    <input type={"text"} placeholder="이름" className="form-control" style={{width : "100px", marginLeft : "10px"}}/>
                    <button>찾기</button>
                </header>
                <table>
                    <colgroup>
                        <col style={{width : "50px"}} />
                        <col style={{width : "auto"}} />
                        <col style={{width : "70px"}} />
                        <col style={{width : "80px"}} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>이름(아이디)</th>
                            <th>학년</th>
                            <th>학생 화면</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map(res=>{
                                return (
                                <tr key={res.id}>
                                    <td>{res.id}</td>
                                    <td onClick={getUser}>
                                        {res.name}({res.nickName})
                                    </td>
                                    <td>{res.age}</td>
                                    <td>
                                        <button>로그인</button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <DetailClassContent/>
            </div>
        </div>
     );
}

export default DetailClass;