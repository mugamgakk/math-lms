import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ContentHeader from "../components/ContentHeader";
import DateNext from "../components/DateNext";
import Icon from '../components/Icon';
import LmsDatePicker from '../components/LmsDatePicker';
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
                <Icon icon={"attendence"} style={{color : "#00A37F"}} />
            </ContentHeader>
            <div className="attendence bg">
                <div className='attendence-head'>
                    <DateNext value={date} />
                    <LmsDatePicker/>
                </div>
                <div className='attendence-body'>
                    <div className='search'>
                        <ClassSelect className={"mr-10"} />
                        <div className='textInput mr-10'>
                            <input type='text' className="textInput-default" placeholder='학생명을 입력하세요' style={{ width: "200px" }} />
                        </div>
                        <button className='btn-green btn-icon mr-10'>
                            <Icon icon={"search"}  />
                            검색
                        </button>
                        <button className='btn-grey btn-icon'>
                        <Icon icon={"reload"} />
                            새로고침
                        </button>
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
                                studentList.map((ele, i) => {
                                    return <Tr ele={ele} key={"index" + i} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

const Tr = ({ ele }) => {
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
                <div className='textInput'>
                    <input type='text' className="textInput-default" placeholder='학생명을 입력하세요' />
                </div>
            </td>
        </tr>
    )
}

export default Attendance;      