import React, { useState } from "react";
import ClassSelect from "./ui/select/ClassSelect";
import useStudentsStore from "../store/useStudentsStore";
import { useEffect } from "react";
import SkeletonTable from "./SkeletonTable";
import { memo } from "react";
import { useCallback } from "react";
import Icon from "./Icon";
import { useQuery } from "react-query";
import { fetchData } from "../methods/methods";

function StudentsSearch({ children, grade }) {
    let { setClickStudent, clickStudent, getStudentsData, resetStudent } =
        useStudentsStore();

    let [nameSearch, setNameSearch] = useState("");

    // 반선택
    let [classOption, setClassOption] = useState([]);
    let [scroll, setScroll] = useState();

    //  클릭한 데이터
    const getUser = useCallback((list) => {
        setClickStudent(list);
    }, []);

    const param = {
        mode : "student_list",
        class_cd : classOption.map(a=> a.class_cd ),
        qstr : nameSearch,
        qgrd : grade
    }

    let stuList = useQuery(["stuList",classOption], ()=> fetchData("class_st", param),{
        refetchOnWindowFocus : false,
        onSuccess : function(){
            setNameSearch("");
        }
    })

    useEffect(()=>{
        setScroll(scrollState());
    });

    const scrollState = () => {
        let TR = document.querySelectorAll('.tableB tbody>tr');
        let height = 22;

        for(let ele of TR){
            height += ele.clientHeight + 2;
        }

        if(height < 550){
            return false;
        }else{
            return true;
        }

    }

    useEffect(()=>{
        resetStudent()
    },[])

    // console.log(scroll);
    return (
        <div className="bg bg-list student-list">
            <header className="student-list-header">

                {children}
                
                <div className="fj">
                    <ClassSelect
                        onChange={(ele) => {
                            setClassOption(ele);
                        }}
                        value={classOption}
                        width="212px"
                    />
                    <input
                        type="text"
                        className="textInput"
                        placeholder="학생명(아이디)"
                        style={{ width: "118px", margin: "0 4px" }}
                        value={nameSearch}
                        onChange={(e) => {
                            setNameSearch(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                              stuList.refetch()
                            }
                        }}
                    />
                    <button className="btn-search btn-green" style={{ width:'81px' }} onClick={()=>{ stuList.refetch() }}>
                        <Icon icon={"search"} />
                        검색
                    </button>
                </div>
            </header>
            <div className="student-list-body">
                <table className="table tableB">
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>번호</th>
                            <th style={{ width: "170px" }}>학생명(아이디)</th>
                            <th style={{ width: "60px" }}>학년</th>
                            <th style={{ width: "140px" }}>학생 화면</th>
                        </tr>
                    </thead>

                    <tbody className='' style={{ maxHeight: "550px" }}>
                        {
                            stuList.isFetching
                                ? <SkeletonTable R={10} width={["9.52380%", "42.85714%", "14.28571%", "33.33333%"]} />
                                : (
                                    stuList.data?.student_list.map((res, i) => {
                                        return (
                                            <Tr
                                                res={res}
                                                key={res.usr_seq}
                                                index={i}
                                                getUser={getUser}
                                                clickStudent={clickStudent}
                                                scroll={scroll}
                                            />
                                        );
                                    })
                                )
                        }
                    </tbody>
                </table>
                {
                    stuList.isError && <div className="text-center">학생이 없습니다</div>
                }
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

const Tr = memo(({ res, clickStudent, getUser, index, scroll }) => {
    return (
        <tr className={res.usr_seq === clickStudent?.usr_seq ? "active" : ""}>
            <td style={{ width: "38px" }}>{index + 1}</td>
            <td
                style={{ cursor: "pointer", width: "170px" }}
                onClick={() => {
                    getUser(res);
                }}
                className="text-green t-start"
            >
                <div style={{width : "100%", paddingLeft : "10px"}}>
                {res.um_nm}(
                {res.um_id.length > 10 ? res.um_id.substr(0, 10) + ".".repeat(3) : res.um_id})
                </div>
            </td>
            <td style={{ width: "60px" }}>{res.school_grade}</td>
            <td style={ scroll ? { width: "109px" } : { width: '126px'}}>
                <button className="btn-table">로그인</button>
            </td>
        </tr>
    );
});

export default StudentsSearch;
