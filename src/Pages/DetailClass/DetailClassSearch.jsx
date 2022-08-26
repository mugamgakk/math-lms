import React, { useState, useEffect, useCallback } from "react";
import SelectBox from "../../components/ui/select/SelectBox";
import { useDispatch } from "react-redux";
import { setClickStudent } from "../../feature/studentsListSlice";
import SearchBtn from "../../components/ui/button/SearchBtn";


const userNameSort = (userArr)=>{
    let copy = [...userArr];

    copy.sort((a,b)=>{
        if(a.name < b.name){
            return -1
        }else{
            return 1
        }
    })

    return copy
}


function DetailClassSearch({ user }) {


    let dispatch = useDispatch();
    let [checkState, setCheckState] = useState([]);
    let [userList, setUserList] = useState([]);
    let [nameSearch, setNameSearch] = useState('');

    // redux에서 받은 초기값
    useEffect(()=>{
        setUserList(userNameSort(user))
    },[user])

//  클릭한 데이터
    const getUser = (list) => {
   
        dispatch(setClickStudent(list));
    };

    // 검색
    const searchStudents = useCallback(() => {
        let initialArray = [];

        // 반 검사
        checkState.forEach(function(a){
            let 반검사 = user.filter(stu=> stu.반이름 === a );
            initialArray = [...initialArray, ...반검사];
        })

        //  이름 검사
        if(nameSearch !== ''){
            let regex = new RegExp(nameSearch) 

            setUserList(initialArray.filter((stu)=> regex.test(stu.name) ));
        }else{

            setUserList(userNameSort(initialArray));
        }


    },[nameSearch, userList]);

    return (
        <div className="students-search">
            <header className="row" style={{ padding: "10px 0" }}>
                <SelectBox width={"150px"} checkState={checkState} setCheckState={setCheckState} />
                <input
                    type={"text"}
                    placeholder="이름"
                    className="form-control"
                    style={{ width: "100px", marginLeft: "10px" }}
                    value={nameSearch}
                    onChange={(e)=>{setNameSearch(e.target.value)}}
                />
                <SearchBtn onClick={searchStudents} />
            </header>
            <table>
                <colgroup>
                    <col style={{ width: "50px" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "70px" }} />
                    <col style={{ width: "80px" }} />
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
                    {userList.map((res,i) => {
                        return (
                            <tr key={res.id}>
                                <td>{i + 1}</td>
                                <td style={{cursor: "pointer"}} onClick={()=>{getUser(res)}}>
                                    {res.name}({res.nickName})
                                </td>
                                <td>{res.age}</td>
                                <td>
                                    <button className="btn">로그인</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <button className="btn" onClick={()=>{
                setUserList(userNameSort(user));
                setNameSearch('');
                setCheckState([]);
                }}>초기화</button>
        </div>
    );
}

export default DetailClassSearch;
