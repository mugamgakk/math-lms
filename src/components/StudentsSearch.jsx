import React, { useState, useCallback } from "react";
import SelectBox from "./ui/select/SelectBox";
import SearchBtn from "./ui/button/SearchBtn";
import useStudentsStore from "../store/useStudentsStore";

const userNameSort = (userArr) => {
    let copy = [...userArr];

    copy.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else {
            return 1;
        }
    });

    return copy;
};

function StudentsSearch() {

    let {user, setClickStudent, clickStudent} = useStudentsStore(state=>state);
    let [checkState, setCheckState] = useState([]);
    let [userList, setUserList] = useState(user);
    let [nameSearch, setNameSearch] = useState("");


    //  클릭한 데이터
    const getUser = (list) => {
        setClickStudent(list)
    };

    // 검색
    const searchStudents = useCallback(() => {
        let initialArray = [];

        // 반 검사
        checkState.forEach(function (a) {
            let 반검사 = user.filter((stu) => stu.반이름 === a);
            initialArray = [...initialArray, ...반검사];
        });

        //  이름 검사
        if (nameSearch !== "") {

            if(nameSearch.length < 2){
                alert("두글자 이상 검색하세요");
                return
            }

            let regex = new RegExp(nameSearch);

            setUserList(initialArray.filter((stu) => regex.test(stu.name)));
        } else {
            setUserList(userNameSort(initialArray));
        }
    }, [nameSearch, userList]);


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
                onChange={(e) => {
                    setNameSearch(e.target.value);
                }}
                onKeyUp={(e)=>{
                    if(e.key === "Enter"){
                        searchStudents()
                    }
                }}
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
                {userList && userList.map((res, i) => {
                    return (
                        <tr key={res.id}>
                            <td>{i + 1}</td>
                            <td
                                style={{ cursor: "pointer" }}
                                className={res.name === clickStudent?.name ? "active" : ''}
                                onClick={() => {
                                    getUser(res);
                                }}
                            >
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

        <button
            className="btn"
            onClick={() => {
                setUserList(userNameSort(user));
                setNameSearch("");
                setCheckState([]);
            }}
        >
            초기화
        </button>
    </div>
     );
}

export default StudentsSearch;