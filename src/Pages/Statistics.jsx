import React, { useState, useRef } from "react";
import ContentHeader from "../components/ContentHeader";
import StatisticsStandard from "./Statistics/StatisticsStandard";
import { useDownloadExcel } from "react-export-table-to-excel";
import PointModal from "./Statistics/PointModal";
import { useEffect } from "react";
import ajax from "../ajax";
import { arrSort, comma } from "../methods/methods";
import SkeletonTable from "../components/SkeletonTable";
import ClassSelect from "../components/ui/select/ClassSelect";
import LmsDatePicker from "../components/LmsDatePicker";
import { memo } from "react";
import Icon from "../components/Icon";

function Statistics() {
    // table data
    let [value, setValue] = useState(null);
    // sort
    let [sortPoint, setSortPoint] = useState("desc");
    // reset count
    let [selectReset, setSelectReset] = useState(0);

    // class list
    let [classList, setClassList] = useState([]);
    let [initialClass, setInitialClass] = useState([]);

    // 포인트 지급 기준
    let [standard, setStandard] = useState(false);

    const tableRef = useRef(null);

    // search name
    let [studentName, setStudentName] = useState("");
    let [startDay, setStartDay] = useState(new Date());
    let [lastDay, setLastDay] = useState(new Date());

    let [skeleton, setSkeleton] = useState(true);

    // 라이브러리때문에 3번 재랜더링 됨
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Users table",
        sheet: "Users",
    });

    const sortList = () => {
        let copy = [...value];

        if (sortPoint === "desc") {
            setValue(arrSort(copy, "point"));
            setSortPoint("asc");
        } else {
            setValue(arrSort(copy, "point", 1));
            setSortPoint("desc");
        }
    };
    // 내림 : desc // 오름 : asc

    const resetList = () => {
        setSelectReset(selectReset + 1);
    };

    const getPointData = async () => {
        !skeleton && setSkeleton(true);

        let url = "/point.php/";
        let query = {
            mode: "list",
            // class_cd: 12312313,
            // sdate: dayjs(startDay).format("YYYY-MM-DD") ,
            // edate: dayjs(lastDay).format("YYYY-MM-DD"),
            // qstr: studentName,
            // order: "desc",
        };

        let res = await ajax(url, { data: query });

        let { class_list, point_list } = res.data;

        setValue(arrSort(point_list, "um_nm"));

        setClassList(class_list);
        setInitialClass(class_list);

        setSkeleton(false);
    };

    useEffect(() => {
        getPointData();
    }, []);

    return (
        <>
            {/* 지플럼 수학 학습 포인트 지급 기준 */}
            {
                standard && <StatisticsStandard setStandard={setStandard}/>
            }
            
            <ContentHeader
                title={"학습 포인트 현황"}
                location={["마이페이지", "수학", "학습 포인트 현황"]}
            />

            <div className="bg Statistics">
                <div className="tabs-header">
                    <strong>&lt;지플럼 수학 학습 포인트 지급 기준 &gt;</strong>
                    <button className="btn-orange" onClick={()=>{setStandard(true)}}>확인</button>
                </div>

                <div className="fj">
                    <div className="fa">
                        <button
                            className="btn-grey-border btn-icon mr-10"
                            style={{ minWidth: "100px" }}
                            onClick={() => {
                                if (window.confirm("다운로드 하시겠습니까?")) {
                                    onDownload();
                                } else {
                                    return;
                                }
                            }}
                        >
                            <Icon icon={"downloadB"} style={{ transform: "rotate(180deg)" }} />
                            다운로드
                        </button>
                        <button
                            className="btn-grey"
                            onClick={resetList}
                            style={{ minWidth: "100px" }}
                        >
                            초기화
                        </button>
                    </div>

                    <div className="fa">
                        <ClassSelect
                            width={"200px"}
                            value={classList}
                            options={initialClass}
                            className="mr-10"
                        />
                        <LmsDatePicker
                            value={startDay}
                            onChange={(day) => {
                                setStartDay(day);
                            }}
                        />
                        <span className="water">~</span>
                        <LmsDatePicker
                            value={lastDay}
                            style={{ marginRight: "10px" }}
                            onChange={(day) => {
                                setLastDay(day);
                            }}
                        />
                        <input
                            type="text"
                            className="textInput mr-10"
                            placeholder="학생이름을 입력하세요"
                            value={studentName}
                            onChange={(e) => {
                                setStudentName(e.target.value);
                            }}
                            style={{ width: "194px" }}
                        />
                        <button
                            type="button"
                            className="btn-grey"
                            style={{ minWidth: "100px" }}
                            onClick={getPointData}
                        >
                            조회
                        </button>
                    </div>
                </div>

                <table ref={tableRef} className="table tableA" style={{marginTop : "10px"}}>
                    <thead>
                        <tr>
                            <th style={{width : "4.0026%"}}>번호</th>
                            <th style={{width : "27.0847%"}}>이름</th>
                            <th style={{width : "8.6724%"}}>학년</th>
                            <th style={{width : "12.008%"}}>캐럿(갯수)</th>
                            <th style={{width : "12.008%"}}>미네랄(갯수)</th>
                            <th style={{width : "12.008%"}}>
                                <div style={{ display: "inline-flex" }}>
                                    획득 포인트(점)
                                    <button
                                        className={
                                            "btn-sort" + `${sortPoint === "asc" ? " asc" : ""}`
                                        }
                                        onClick={sortList}
                                    ></button>
                                </div>
                            </th>
                            <th style={{width : "12.008%"}}>내역</th>
                            <th style={{width : "12.2081%"}}>총 누적 포인트(점)</th>
                        </tr>
                    </thead>
                    <tbody className="scroll">
                        {skeleton ? (
                            <SkeletonTable R={5} width={[]} />
                        ) : (
                            value.map((a, i) => {
                                return <Tr key={i} list={a} index={i} />;
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

const Tr = memo(({ list, index }) => {
    let [modal, setModal] = useState(false);

    return (
        <tr>
            <td style={{width : "4.0026%"}}>{index + 1}</td>
            <td className="align-left text-green" style={{width : "27.0847%"}}>
                {list.um_nm} ({list.um_id})
            </td>
            <td style={{width : "8.6724%"}}>{list.school_grade}</td>
            <td style={{width : "12.008%"}}>{list.ct}</td>
            <td style={{width : "12.008%"}}>{list.mi}</td>
            <td style={{width : "12.008%"}}>{comma(list.point)}</td>
            <td style={{width : "12.2081%"}}>
                {modal && (
                    <PointModal userId={list.usr_seq} title={list.um_nm} setModal={setModal} />
                )}
                <button
                    className="btn-table"
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    상세 보기
                </button>
            </td>
            <td>{comma(list.total_point)}</td>
        </tr>
    );
});

export default Statistics;
