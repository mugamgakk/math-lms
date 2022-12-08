import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { memo } from "react";
import { useState } from "react";
import ajax from "../ajax";
import ContentHeader from "../components/ContentHeader";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDatePickerMonth from "../components/CustomDatePickerMonth";
import DateNext from "../components/DateNext";
import Icon from "../components/Icon";
import LmsDatePicker from "../components/LmsDatePicker";
import SkeletonTable from "../components/SkeletonTable";
import ClassSelect from "../components/ui/select/ClassSelect";
import { _cloneDeep } from "../methods/methods";
import attendanceStore from "../store/attendanceStore";

const att = [
    { value: "P", label: "출석" },
    { value: "L", label: "지각" },
    { value: "E", label: "조퇴" },
    { value: "A", label: "결석" },
];
function Attendance() {
    const getCopyData = attendanceStore((state) => state.getCopyData);
    const copyData = attendanceStore((state) => state.copyData);

    let [date, setDate] = useState(new Date());
    let [classList, setClassList] = useState([]);
    let [studentList, setStudentList] = useState([]);
    let [searchText, setSearchText] = useState("");

    let [loading, setLoading] = useState(true);
    let banOptions = useRef([]);

    // 모두 출석 count
    let [allAtten, setAllAtten] = useState(0);

    const defaultList = useRef();

    const getData = async () => {
        setLoading(true);
        const param = {
            mode: "get_daily",
            ymd: dayjs(date).format("YYYYMMDD"),
            class_cd: classList,
            qstr: searchText,
        };

        try {
            // let res = await ajax("class_daily.php", { data: param });
            let res = await axios("/json/attendance.json");

            const { class_list, student_list } = res.data;

            if (!class_list) {
                throw new Error("데이터가 없습니다.");
            }

            // store에 copy 데이터
            getCopyData(_cloneDeep(student_list));

            // 새로고침을 위한 copy 데이터
            defaultList.current = _cloneDeep(student_list);

            // 반 초기값
            banOptions.current = class_list;

            // 반 값
            setClassList(class_list);

            // 리스트 값
            setStudentList(student_list);

            setSearchText("");
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const saveList = async () => {
        let data = {
            mode: "set_daily",
            ymd: dayjs(date).format("YYYYMMDD"),
            student_list: copyData,
        };

        let res = await ajax("/class_daily.php", { data });

        alert("잠시후에 시도해주세요");
    };

    useEffect(() => {
        getData();
    }, [date]);

    return (
        <>
            <ContentHeader
                title="출석 체크"
                location={["마이페이지", "수학 학습 관리"]}
                icon="attendence"
                current="출석 체크"
            />

            <div className="attendence bg">
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
                            onChange={(ele) => setClassList(ele)}
                            options={banOptions.current}
                            width="200px"
                        />
                        <input
                            type="text"
                            className="textInput mr-10"
                            placeholder="학생명을 입력하세요"
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
                        <button
                            className="btn-grey btn-icon"
                            onClick={() => {
                                setStudentList(_cloneDeep(defaultList.current));
                            }}
                        >
                            <Icon icon={"reload"} />
                            새로고침
                        </button>
                    </div>

                    <table className="table tableA">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "13%" }}>
                                    학생명 (아이디)
                                </th>
                                <th scope="col" style={{ width: "26%" }} className="f-column">
                                    <div>출결 체크</div>
                                    <button
                                        className="btn-table"
                                        onClick={() => {
                                            setAllAtten(allAtten + 1);
                                        }}
                                    >
                                        모두 출석
                                    </button>
                                </th>
                                <th scope="col" style={{ width: "61%" }}>
                                    출결 사유
                                </th>
                            </tr>
                        </thead>
                        <tbody className="scroll" style={{ maxHeight: "462px" }}>
                            {loading ? (
                                <SkeletonTable R={7} width={["13%", "26%", "61%"]} />
                            ) : (
                                studentList?.map((ele, i) => {
                                    return (
                                        <Tr
                                            ele={ele}
                                            index={i}
                                            date={date}
                                            key={"index" + i}
                                            allAtten={allAtten}
                                        />
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                    <div className="attendence-footer">
                        <button type="button" className="btn-green" onClick={saveList}>
                            출결 내용 저장
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

const Tr = memo(({ ele, index, date, allAtten }) => {
    let [text, setText] = useState((ele.reason ??= ""));
    let [state, setSTate] = useState(ele.attd);
    const changeCopyData = attendanceStore((state) => state.changeCopyData);

    let [pen, setPen] = useState(ele.reason ? true : false);

    const reSize = (e) => {
        const ele = e.target;

        setText(ele.value);
        changeCopyData({ index, value: ele.value, 속성: "reason" });
    };

    const saveReason = async () => {
        const data = {
            mode: "set_reason",
            ymd: dayjs(date).format("YYYYMMDD"),
            reason: text,
            usr_seq: ele.user_seq,
        };

        // console.log(data);
        let res = await ajax("/class_daily.php", { data });

        if (res.data.ok == 1) alert("저장이 완료되었습니다.");
    };

    useEffect(() => {
        setText((ele.reason ??= ""));
        setSTate(ele.attd);
        if (!ele.reason) {
            setPen(false);
        }
    }, [ele]);

    useEffect(() => {
        if (allAtten !== 0) {
            setSTate("P");
            changeCopyData({ index, value: "P", 속성: "attd" });
        }
    }, [allAtten]);

    return (
        <tr>
            <td style={{ width: "13%" }}>
                {ele.um_nm}({ele.um_id})
            </td>
            <td style={{ width: "26%" }}>
                {att.map((a) => {
                    return (
                        <button
                            key={a.value}
                            onClick={() => {
                                setSTate(a.value);
                                changeCopyData({ index, value: a.value, 속성: "attd" });
                            }}
                            className={`${a.value === state ? "btn-orange" : "btn-grey-border"}`}
                        >
                            {a.label}
                        </button>
                    );
                })}
            </td>
            <td style={{ width: "61%" }}>
                <div className="pencil-input mr-10">
                    <button
                        type="button"
                        onClick={() => {
                            setPen(!pen);
                        }}
                    ></button>
                    <textarea
                        style={{ overflow: "visible" }}
                        onChange={reSize}
                        placeholder="사유 입력(50자 이내)"
                        value={text}
                        disabled={!pen}
                        maxLength={50}
                    ></textarea>
                </div>
                <div style={{ width: "100px" }}>
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

export default Attendance;
