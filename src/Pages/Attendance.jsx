import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ajax from "../ajax";
import ContentHeader from "../components/ContentHeader";
import DateNext from "../components/DateNext";
import SearchBtn from "../components/ui/button/SearchBtn";
import ClassSelect from "../components/ui/select/ClassSelect";
import { _cloneDeep, _remove } from "../methods/methods";
import AttendanceTableList from "./Attendance/AttendanceTableList";

// 출결 P:출석 / L:지각 / E:조퇴 / A:결석

const response = {
    class_list: [
        {
            class_cd: 23141224124124,
            class_name: "수학테스트",
        },
        {
            class_cd: 123123,
            class_name: "도덕",
        },
        {
            class_cd: 121,
            class_name: "경제",
        },
    ],
    student_list: [
        {
            usr_seq: "407",
            um_id: "gkatjdwn1",
            um_nm: "강호동",
            attd: "A",
            reason: "밥먹다가 지각",
        },
        {
            usr_seq: "207",
            um_id: "dnvoiwk2",
            um_nm: "이승주",
            attd: "P",
            reason: "",
        },
        {
            usr_seq: "427",
            um_id: "jkjs2",
            um_nm: "이제동",
            attd: "E",
            reason: "배아파서",
        },
    ],
};

function Attendance() {
    // 리스트
    let [list, setList] = useState([]);

    //날짜
    let [date, setDate] = useState(new Date());
    // 검색어
    let [search, setSearch] = useState("");

    let [banValue, setbanValue] = useState();
    let [banOption, setBanOption] = useState();

    let initialData = useRef([]);

    const updateData = ( userId, value, key ) => {
        let copy = [...list];

        copy.forEach((a) => {
            if (a.usr_seq == userId) {
                a[key] = value;
            }
        });

        setList(copy);
    };

    const getData = async () => {
        const ymd = dayjs(date).format("YYYYMMDD");

        const data = {
            mode: "get_daily",
            ymd,
        };
        if (search.trim() !== "") data.qstr = search;
        if (banValue) data.class_cd = banValue.map((a) => a.class_cd);

        let res = await ajax("class_daily.php", { data });
        // console.log(res);

        
        setList(_cloneDeep(res.data.student_list));

        initialData.current = _cloneDeep(res.data.student_list);

        setBanOption(res.data.class_list);
        setbanValue(res.data.class_list);
    };

    useEffect(() => {
        getData();

    }, [date]);

    return (
        <>
            <ContentHeader
                title="출석 체크"
                location={"마이페이지 > 수학 학습 관리 > 오늘의 수업"}
            />

            <div className="bg">
                <header className="mb-3">
                    <div className="fc">
                        <DateNext
                            value={date}
                            onChange={(ele) => {
                                setDate(ele);
                            }}
                        />
                    </div>
                    <div className="fj">
                        <div>
                            <button
                                className="btn-grey"
                                onClick={() => {
                                    let copy = [...list];
                                    copy.forEach((a) => {
                                        a.attd = "P";
                                    });
                                    setList(copy);
                                }}
                            >
                                모두 출석
                            </button>
                            <button className="btn-grey-border" onClick={()=>{
                                setList(_cloneDeep(initialData.current));
                            }}>
                                초기화
                            </button>
                        </div>
                        <div>
                            <ClassSelect
                                width={"200px"}
                                value={banValue}
                                options={banOption}
                                onChange={(ele) => {
                                    console.log(ele);
                                }}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="학생"
                                style={{ width: "200px", margin: "0 5px" }}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <SearchBtn />
                        </div>
                    </div>
                </header>

                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>학생명(아이디)</th>
                            <th style={{ width: "25%" }}>출결 체크</th>
                            <th style={{ width: "auto" }}>출결 사유</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((ele, i) => {
                            return (
                                <AttendanceTableList updateData={updateData} ele={ele} key={i} />
                            );
                        })}
                    </tbody>
                </table>

                <div>
                    <button
                        className="btn"
                        onClick={() => {
                            console.log(list);
                        }}
                    >
                        출결내용 저장
                    </button>
                </div>
            </div>
        </>
    );
}

export default Attendance;
