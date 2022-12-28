import React, { useState } from "react";
import ClassSelect from "./ui/select/ClassSelect";
import useStudentsStore from "../store/useStudentsStore";
import { useEffect } from "react";
import SkeletonTable from "./SkeletonTable";
import { memo } from "react";
import { useCallback } from "react";
import Icon from "./Icon";

function StudentsSearch({ children }) {
    let { user, setClickStudent, clickStudent, getStudentsData, resetStudent } =
        useStudentsStore();

    let [userList, setUserList] = useState(null);
    let [nameSearch, setNameSearch] = useState("");
    let [skeleton, setSkeleton] = useState(true);
    // 반선택
    let [classOption, setClassOption] = useState([]);

    //  클릭한 데이터
    const getUser = useCallback((list) => {
        setClickStudent(list);
    }, []);

    useEffect(() => {
        resetStudent();
        getStudentsData();
    }, []);

    useEffect(() => {
        // 학생 리스트
        user && setUserList(user);
    }, [user]);

    useEffect(() => {
        if (userList) {
            setSkeleton(false);
        }
    }, [userList]);

    return (
        <div className="bg bg-list student-list">
            <header className="student-list-header">

                {children}
                
                <div className="fj">
                    <ClassSelect
                        onChange={(ele) => {
                            getStudentsData(classOption, nameSearch);
                            setClassOption(ele);
                        }}
                        value={classOption}
                        width="160px"
                    />
                    <input
                        type="text"
                        className="textInput"
                        placeholder="학생명을 입력하세요"
                        style={{ width: "170px", margin: "0 4px" }}
                        value={nameSearch}
                        onChange={(e) => {
                            setNameSearch(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                getStudentsData(classOption, nameSearch);
                            }
                        }}
                    />
                    <button className="btn-icon btn-green" onClick={()=>{ getStudentsData(classOption, nameSearch); }}>
                        <Icon icon={"search"} />
                        검색
                    </button>
                </div>
            </header>
            <div className="student-list-body">
                <table className="table tableB">
                    <thead>
                        <tr>
                            <th style={{ width: "9.52380%" }}>번호</th>
                            <th style={{ width: "42.85714%" }}>학생명(아이디)</th>
                            <th style={{ width: "14.28571%" }}>학년</th>
                            <th style={{ width: "33.33333%" }}>학생 화면</th>
                        </tr>
                    </thead>

                    <tbody className='scroll' style={{ maxHeight: "550px" }}>
                        {
                            skeleton
                                ? <SkeletonTable R={10} width={["9.52380%", "42.85714%", "14.28571%", "33.33333%"]} />
                                : (
                                    userList?.map((res, i) => {
                                        return (
                                            <Tr
                                                res={res}
                                                key={res.usr_seq}
                                                index={i}
                                                getUser={getUser}
                                                clickStudent={clickStudent}
                                            />
                                        );
                                    })
                                )
                        }
                    </tbody>
                </table>

                {userList?.length === 0 && <div className="text-center">학생이 없습니다</div>}
            </div>

            <div className="student-list-footer">
                <button
                    className="btn-grey btn-icon"
                    onClick={() => {
                        getStudentsData();
                        setNameSearch("");
                    }}
                >
                    <Icon icon={"reload"} />
                    목록 초기화
                </button>
            </div>
        </div>
    );
}

const Tr = memo(({ res, clickStudent, getUser, index }) => {
    return (
        <tr className={res.usr_seq === clickStudent?.usr_seq ? "active" : ""}>
            <td style={{ width: "9.52380%" }}>{index + 1}</td>
            <td
                style={{ cursor: "pointer", width: "42.85714%" }}
                onClick={() => {
                    getUser(res);
                }}
                className="text-green"
            >
                {res.um_nm}(
                {res.um_id.length > 10 ? res.um_id.substr(0, 10) + ".".repeat(3) : res.um_id})
            </td>
            <td style={{ width: "14.28571%" }}>{res.school_grade}</td>
            <td style={{ width: "33.33333%" }}>
                <button className="btn-table">로그인</button>
            </td>
        </tr>
    );
});

export default StudentsSearch;
