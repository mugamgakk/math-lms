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
        setInitialClass(class_list)

        setSkeleton(false);
    };

    useEffect(() => {
        getPointData();
    }, []);

    return (
        <div className="Statistics container">
            <ContentHeader title={"학습 포인트 현황"} location="마이페이지 > 수학 > 학습 포인트 현황" />

            {/* 지플럼 수학 학습 포인트 지급 기준 */}
            <StatisticsStandard />

            <div className="Statistics-search fj mb-3">
                <div>
                    <button className="btn" onClick={resetList}>
                        초기화
                    </button>
                    <button
                        className="btn"
                        onClick={() => {
                            if (window.confirm("다운로드 하시겠습니까?")) {
                                onDownload();
                            } else {
                                return;
                            }
                        }}
                    >
                        다운로드
                    </button>
                </div>

                <div className="StatisticsSearch d-flex">

                    <ClassSelect width={"200px"} value={classList} options={initialClass} />

                    <LmsDatePicker
                        value={startDay}
                        onChange={(day) => {
                            setStartDay(day);
                        }}
                    />
                    ~
                    <LmsDatePicker
                        value={lastDay}
                        onChange={(day) => {
                            setLastDay(day);
                        }}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="학생 이름"
                        value={studentName}
                        onChange={(e) => {
                            setStudentName(e.target.value);
                        }}
                    />
                    <button type="button" className="btn" onClick={getPointData}>
                        조회
                    </button>
                </div>
            </div>

            <table ref={tableRef}>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>이름(아이디)</th>
                        <th>학년</th>
                        <th>캐럿(개)</th>
                        <th>미네랄(개)</th>
                        <th>
                            <div style={{display : "inline-flex"}}>
                            획득 포인트(점)
                            <button
                                className={"btn-sort" + `${sortPoint === "asc" ? " asc" : ""}`}
                                onClick={sortList}
                            ></button>
                            </div>
                        </th>
                        <th>내역</th>
                        <th>총 누적 포인트(점)</th>
                    </tr>
                </thead>
                <tbody>
                    {skeleton ? (
                        <SkeletonTable R={5} D={8} />
                    ) : (
                        value.map((a, i) => {
                            return <Tr key={i} list={a} index={i} />;
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

const Tr = memo(({ list, index }) => {
    let [modal, setModal] = useState(false);

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                {list.um_nm} ({list.um_id})
            </td>
            <td>{list.school_grade}</td>
            <td>{list.ct}</td>
            <td>{list.mi}</td>
            <td>{comma(list.point)}</td>
            <td>
                {modal && (
                    <PointModal userId={list.usr_seq} title={list.um_nm} setModal={setModal} />
                )}
                <button
                    className="btn"
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
