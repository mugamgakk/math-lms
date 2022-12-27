import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";
import ajax from "../ajax";
import ContentHeader from "../components/ContentHeader";
import CustomDatePicker from "../components/CustomDatePicker";
import DateNext from "../components/DateNext";
import Icon from "../components/Icon";
import ClassSelect from "../components/ui/select/ClassSelect";
import { _cloneDeep } from "../methods/methods";
import { _isScroll } from "../methods/methods";

const att = [
    { value: "P", label: "출석" },
    { value: "L", label: "지각" },
    { value: "E", label: "조퇴" },
    { value: "A", label: "결석" },
];

function Attendance() {
    let [date, setDate] = useState(new Date());
    let [classList, setClassList] = useState([]);
    let [studentList, setStudentList] = useState([]);
    let [searchText, setSearchText] = useState("");

    let [scroll, setScroll] = useState(false);

    let [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        const param = {
            mode: "get_daily",
            ymd: dayjs(date).format("YYYYMMDD"),
            class_cd: classList,
            qstr: searchText,
        };

        try {
            let res = await ajax("class_daily.php", { data: param });
            // let res = await axios("/json/attendance.json");

            const { student_list } = res.data;

            if (!student_list) {
                throw new Error("잠시후에 시도해주세요");
            }

            // 리스트 값
            setStudentList(student_list.slice(0));

            setSearchText("");
            setLoading(false);
        } catch (err) {
            alert(err);
            setLoading(false);
        }
    };

    // 모두 출석 후 저장
    const allCheckAttd = async () => {
        let result = studentList.map((a) => {
            a.attd = "P";
            return { ...a };
        });

        let student_list = result.map((a) => {
            return { usr_seq: a.user_seq, attd: a.attd };
        });

        try {
            let res = await ajax("class_daily.php", {
                data: {
                    mode: "set_daily",
                    ymd: dayjs(date).format("YYYYMMDD"),
                    student_list: student_list,
                },
            });

            if (res.data.ok == 1) {
                setStudentList(result);
            } else {
                throw new Error("다시 시도해주세요");
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getData();
    }, [date, classList]);

    useEffect(() => {
        setScroll(_isScroll("attendence-table", 500));
    });

    return (
        <>
            <ContentHeader
                title="출석 체크"
                location={["마이페이지", "수학 학습 관리"]}
                icon="attendence"
                current="출석 체크"
            />

            <div className="attendence bg layout-height">
                <div className="attendence-head d-flex">
                    <DateNext
                        value={date}
                        onChange={(day) => {
                            setDate(day);
                        }}
                        style={{ marginRight: "4px" }}
                    />

                    <CustomDatePicker
                        value={date}
                        onChange={(day) => {
                            setDate(day);
                        }}
                        maxDate={new Date()}
                    />
                </div>
                <div className="attendence-body">
                    <div className="search">
                        <ClassSelect
                            className={"mr-10"}
                            defaultValue="반 선택"
                            value={classList}
                            onChange={(ele) => {
                                console.log(ele);
                                setClassList(ele);
                            }}
                            width="160px"
                        />
                        <input
                            type="text"
                            className="textInput mr-10"
                            placeholder="학생명(아이디)"
                            style={{ width: "200px" }}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    getData();
                                }
                            }}
                        />
                        <button className="btn-green btn-icon mr-10" onClick={getData}>
                            <Icon icon={"search"} />
                            검색
                        </button>
                        <button className="btn-grey btn-icon" onClick={getData}>
                            <Icon icon={"reload"} />
                            새로 고침
                        </button>
                    </div>

                    <table className="attendence-table custom-table">
                        <thead>
                            <tr>
                                <th style={{ width: "10%" }}>학생명 (아이디)</th>
                                <th style={{ width: "30%" }}>
                                    <div>
                                        <div>출결 체크</div>
                                        <button className="btn-allcheck" onClick={allCheckAttd}>
                                            모두 출석
                                        </button>
                                    </div>
                                </th>
                                <th style={{ width: "60%" }}>출결 사유</th>

                                {scroll && <th style={{ width: "17px", border: "none" }}></th>}
                            </tr>
                        </thead>
                        <tbody style={{ maxHeight: "500px" }}>
                            {studentList?.map((ele, i) => {
                                return <Tr ele={ele} date={date} key={"index" + i} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

const Tr = memo(({ ele, date }) => {
    let [text, setText] = useState((ele.reason ??= ""));
    let [state, setSTate] = useState(ele.attd);
    let [pen, setPen] = useState(ele.reason ? true : false);

    // 사유 저장
    const saveReason = async () => {
        const data = {
            mode: "set_reason",
            ymd: dayjs(date).format("YYYYMMDD"),
            reason: text,
            usr_seq: ele.user_seq,
        };

        let res = await ajax("/class_daily.php", { data });
        // console.log(res);

        if (res.data.ok == 1) alert("저장이 완료되었습니다.");
    };

    // 체크후 저장
    const saveAtte = async (attd) => {
        setSTate(attd);

        const data = {
            mode: "set_daily",
            ymd: dayjs(date).format("YYYYMMDD"),
            student_list: [{ usr_seq: ele.user_seq, attd: attd }],
        };
        let res = await ajax("/class_daily.php", { data });
        // console.log(res);

        if (res.data.ok == 1) {
        } else {
            alert("잠시후에 시도해주세요");
            setSTate(state);
        }
    };

    useEffect(() => {
        setText((ele.reason ??= ""));
        setSTate(ele.attd);
        if (!ele.reason) {
            setPen(false);
        }
    }, [ele]);

    return (
        <tr>
            <td style={{ width: "10%" }} className="t-start">
                <div>
                    <div className="user-name">{ele.um_nm}</div>
                    <div className="user-id">{ele.um_id}</div>
                </div>
            </td>
            <td style={{ width: "30%" }}>
                {att.map((a) => {
                    return (
                        <button
                            key={a.value}
                            onClick={() => {
                                saveAtte(a.value);
                            }}
                            className={`btn-grey-border ${
                                a.value === state ? `attd-${a.value}` : ""
                            }`}
                        >
                            {a.label}
                        </button>
                    );
                })}
            </td>
            <td style={{ width: "60%" }} className="t-start">
                <div className="pencil-input mr-10">
                    <button
                        type="button"
                        className="btn-pencil"
                        onClick={() => {
                            setPen(!pen);
                        }}
                    ></button>
                    <textarea
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        placeholder="사유 입력(50자 이내)"
                        value={text}
                        disabled={!pen}
                        onKeyDown={resizeaa}
                        onKeyUp={resizeaa}
                        maxLength="50"
                    ></textarea>
                    {pen && (
                        <button className="btn-grey-border" onClick={saveReason}>
                            저장
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
});

function resizeaa(e) {
    e.target.style.height = "1px";
    e.target.style.height = 2 + e.target.scrollHeight + "px";
}

export default Attendance;
