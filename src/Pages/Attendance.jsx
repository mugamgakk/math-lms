import React from "react";
import { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";
import ajax from "../ajax";
import ContentHeader from "../components/ContentHeader";
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
    const getCopyData = attendanceStore(state => state.getCopyData);
    const copyData = attendanceStore(state => state.copyData);

    let [date, setDate] = useState(new Date());
    let [classList, setClassList] = useState([]);
    let [studentList, setStudentList] = useState([]);
    let [searchText, setSearchText] = useState("");

    let [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        const param = {
            mode: "get_daily",
            ymd: date,
            class_cd: classList,
            qstr: searchText,
        };

        try{
            let res = await ajax("class_daily.php", { data: param });


            const { class_list, student_list } = res.data;

            if(!class_list){
                throw new Error("데이터가 없습니다.");
            }

            getCopyData(_cloneDeep(student_list));

            setClassList(class_list);
            setStudentList(student_list);
            
            setLoading(false)
        }catch(err){
            alert(err);
            setLoading(false);
        }

        
    };
    useEffect(() => {
        getData();
    }, []);

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
                    <LmsDatePicker
                        value={date}
                        onChange={(day) => {
                            setDate(day);
                        }}
                        maxDate={new Date()}
                    />
                </div>
                <div className="attendence-body">
                    <div className="search">
                        <ClassSelect className={"mr-10"} defaultValue="반 선택" />
                        <input
                            type="text"
                            className="textInput mr-10"
                            placeholder="학생명을 입력하세요"
                            style={{ width: "200px" }}
                        />
                        <button className="btn-green btn-icon mr-10">
                            <Icon icon={"search"} />
                            검색
                        </button>
                        <button className="btn-grey btn-icon">
                            <Icon icon={"reload"} />
                            새로고침
                        </button>
                    </div>

                    <table className='table tableA'>
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "13%" }}>학생명 (아이디)</th>
                                <th scope="col" style={{ width: "26%" }}>출결 체크</th>
                                <th scope="col" style={{ width: "61%" }}>출결 사유</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody style={{ maxHeight: "462px" }}>
                            {
                                loading
                                    ? <SkeletonTable R={7} width={["13%", "26%", "61%"]} />
                                    : (
                                        studentList?.map((ele, i) => {
                                            return <Tr ele={ele} index={i} key={"index" + i} />;
                                        })
                                    )
                            }

                        </tbody>
                    </table>
                    <div className="attendence-footer">
                        <button type="button" className="btn-green" onClick={() => { console.log(copyData) }}>
                            출결 내용 저장
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

const Tr = memo(({ ele, index }) => {
    let [text, setText] = useState((ele.reason ??= ""));
    let [state, setSTate] = useState(ele.attd);
    const changeCopyData = attendanceStore(state => state.changeCopyData);

    let [pen, setPen] = useState(false);

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
                                changeCopyData({ index, attd: a.value, 속성: "attd" })
                            }}

                            className={`${a.value === state ? "btn-orange" : "btn-grey-border"}`}
                        >
                            {a.label}
                        </button>
                    );
                })}
            </td>
            <td style={{ width: "61%" }} className="d-flex">
                <div className="pencil-input mr-10">
                    <button type="button" onClick={()=>{setPen(!pen)}}></button>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            changeCopyData({ index, attd: e.target.value, 속성: "reason" })
                        }}
                        className="textInput"
                        placeholder="내용을 입력하세요"
                        disabled={!pen}
                    />
                </div>
                <div style={{ width: "100px" }}>
                    {
                        pen && <button className="btn-grey-border">저장</button>
                    }
                </div>
            </td>
        </tr>
    );
});

export default Attendance;
