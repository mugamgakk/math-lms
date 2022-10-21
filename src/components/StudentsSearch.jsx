import React, { useState } from "react";
import ClassSelect from "./ui/select/ClassSelect";
import SearchBtn from "./ui/button/SearchBtn";
import useStudentsStore from "../store/useStudentsStore";
import { useEffect } from "react";
import SkeletonTable from "./SkeletonTable";

function StudentsSearch() {
    let { user, setClickStudent, clickStudent, getStudentsData, resetStudent, classList} = useStudentsStore();
    let [userList, setUserList] = useState(null);
    let [nameSearch, setNameSearch] = useState("");
    let [skeleton, setSkeleton] = useState(true);
    
    // 반선택
    let [classOption, setClassOption] = useState([]);
    //  클릭한 데이터
    const getUser = (list) => {
        setClickStudent(list);
    };


    // 검색
    const searchStudents = () => {
        setSkeleton(true);
        let regexp = new RegExp(nameSearch);

        let list = user.filter((a) => regexp.test(a.um_nm));

        setUserList(list);

        setSkeleton(false);

        setNameSearch("");
    };

    useEffect(()=>{
        if(classList.length !== 0){
            setClassOption(classList)
        }
    },[classList])

    useEffect(() => {
        resetStudent();
        getStudentsData();
    }, []);

    useEffect(() => {
        // setTimeout(() => {
            user && setUserList(user);
        // }, 200);
    }, [user]);

    useEffect(() => {
        if (userList) {
            setSkeleton(false);
        }
    }, [userList]);

    return (
        <div className="col-4 pr-4">
            <header className="row mb-3">
                <div className="col-6 pr-2">
                    <ClassSelect width={"100%"} onChange={(ele)=>{ console.log(ele); setClassOption(ele)}} value={classOption} options={classList} />
                </div>
                <div className="col-6 pl-2">
                <input
                    type={"text"}
                    placeholder="이름"
                    className="form-control"
                    style={{ width: "calc(100% - 30px)"}}
                    value={nameSearch}
                    onChange={(e) => {
                        setNameSearch(e.target.value);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            searchStudents();
                        }
                    }}
                />
                <SearchBtn onClick={searchStudents} />
                </div>
            </header>

            <div style={{ maxHeight: "600px", overflow: "auto" }}>
                <table className="students-table">
                    <colgroup>
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "30%" }} />
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
                        {skeleton && <SkeletonTable R={14} D={4} />}

                        {userList?.map((res, i) => {
                            return (
                                <tr
                                    key={res.usr_seq}
                                    style={res.usr_seq === clickStudent?.usr_seq ?{backgroundColor : "#dee2e6"} : {}}
                                >
                                    <td>{i + 1}</td>
                                    <td
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            getUser(res);
                                        }}
                                    >
                                        {res.um_nm}(
                                        {res.um_id.length > 7
                                            ? res.um_id.substr(0, 5) + ".".repeat(3)
                                            : res.um_id}
                                        )
                                    </td>
                                    <td>{res.school_grade}</td>
                                    <td>
                                        <button className="btn">로그인</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {userList?.length === 0 && <div className="text-center p-10">학생이 없습니다</div>}
            </div>

            <div className="text-center mt-10">
                <button
                    className="btn"
                    onClick={() => {
                        setUserList(user);
                        setNameSearch("");
                    }}
                >
                    목록 초기화
                </button>
            </div>
        </div>
    );
}

export default StudentsSearch;
