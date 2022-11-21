import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ContentHeader from "../components/ContentHeader";
import DateNext from "../components/DateNext";
import Icon from '../components/Icon';
import ClassSelect from "../components/ui/select/ClassSelect";
import attendanceStore from '../store/attendanceStore';

function Attendance() {

    const { date, classList, studentList, searchText, getList } = attendanceStore(state => state);


    useEffect(() => {
        getList({ date, searchText, classList })
    }, [])


    return (
        <>
            <ContentHeader
                title="출석 체크"
                location={"마이페이지 > 수학 학습 관리 > "}
            >
                <Icon icon={"attendence"} color="#00A37F" />
            </ContentHeader>
            <div className="bg">
                <div>
                    <DateNext value={date} />
                </div>
                <div className='fe'>
                    <ClassSelect />
                    <input type="text" className='form-control' placeholder='학생명을 입력하세요' style={{ width: "200px" }} />
                    <button className='btn-green'>검색</button>
                    <button className='btn-grey'>새로고침</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope='col'>학생명 (아이디)</th>
                            <th scope='col'>출결 체크</th>
                            <th scope='col'>출결 사유</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentList.map((ele,i)=>{
                                return <Tr ele={ele} key={"index" + i} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

const Tr = ({ele}) => {
    console.log(ele)
    return (
        <tr>
            <td>{ele.um_nm} ({ele.um_id})</td>
            <td>
                <button className='btn-green'>출결</button>
                <button className='btn-green'>출결</button>
                <button className='btn-green'>출결</button>
                <button className='btn-green'>출결</button>
            </td>
            <td>
                <input type="text" className='form-control' />
            </td>
        </tr>
    )
}

export default Attendance;      