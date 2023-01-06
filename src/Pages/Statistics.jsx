import React, { useState, useRef, useEffect } from "react";
import ContentHeader from "../components/ContentHeader";
import StatisticsStandard from "./Statistics/StatisticsStandard";
import { useDownloadExcel } from "react-export-table-to-excel";
import PointModal from "./Statistics/PointModal";
import { arrSort, comma, fetchData, _isScroll } from "../methods/methods";
import SkeletonTable from "../components/SkeletonTable";
import ClassSelect from "../components/ui/select/ClassSelect";
import { memo } from "react";
import Icon from "../components/Icon";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import SelectBase from "../components/ui/select/SelectBase";
import { useMemo } from "react";
import ajax from "../ajax";

const createYearOption = () => {
    const todayYear = dayjs(new Date()).year();

    let arr = [];
    for (let i = todayYear - 10; i <= todayYear; i++) {
        arr.push({ label: i + "년", value: i });
    }

    arr.reverse();

    return arr;
};

const createMonthOption = () => {
    let arr = [];
    for (let i = 1; i <= 12; i++) {
        arr.push({ label: (10 > i ? "0" + i : i) + "월", value: i });
    }

    return arr;
};

const yearOption = createYearOption();
const monthOption = createMonthOption();

function Statistics() {
    // sort
    let [sortPoint, setSortPoint] = useState("asc");

    // class list
    let [classList, setClassList] = useState([]);

    // 포인트 지급 기준
    let [standard, setStandard] = useState(false);

    const tableRef = useRef(null);

    // search name
    let [studentName, setStudentName] = useState("");

    let [year, setYear] = useState(yearOption[0]);
    let [month, setMonth] = useState(monthOption[0]);

    let [scroll, setScroll] = useState(false);

    // 라이브러리때문에 3번 재랜더링 됨
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "학습 포인트 현황 목록",
        sheet: "학습 포인트 현황 목록",
    });

    // 내림 : desc // 오름 : asc

    const dayFormat = useMemo(() => {
        let a = dayjs(year.value + "-" + month.value).format("YYYYMM");
        let b = dayjs(new Date()).format("YYYYMM");

        if (a === b) {
            return {
                start: dayjs(a).format("YYYY-MM-DD"),
                end: dayjs(new Date()).format("YYYY-MM-DD"),
            };
        } else {
            return {
                start: dayjs(a).format("YYYY-MM-DD"),
                end: dayjs(a).format("YYYY-MM") + "-" + dayjs(a).daysInMonth(),
            };
        }
    }, [year, month]);

    const resetPoint = async () => {
        const res = await ajax("/class.php", { data: { mode: "get_tch_class_i" } });

        setStudentName("");
        setYear(yearOption[0]);
        setMonth(monthOption[0]);
        setClassList(res.data.class_list);
    };

    const param = {
        mode: "list",
        class_cd: classList.map((a) => a.class_cd),
        sdate: dayFormat.start,
        edate: dayFormat.end,
        qstr: studentName,
        order: sortPoint,
    };

    // console.log("parameter",param)

    let pointList = useQuery(["point", classList, sortPoint], () => fetchData("point", param), {
        refetchOnWindowFocus: false,
        onSuccess: function () {
            setStudentName("");
        },
    });
    
    // console.log("response",pointList.data)
    useEffect(() => {
        setScroll(_isScroll("point-list-table", 550));
    });

    return (
        <>
            <ContentHeader
                title={"학습 포인트"}
                location={["마이페이지", "수학 학습 관리"]}
                current={"학습 포인트 현황"}
                icon="point"
            />

            <div className="bg Statistics layout-height">
                <div className="tabs-header">
                    <strong>&lt;지플럼 수학 학습 포인트 지급 기준 &gt;</strong>

                    <div
                        className="standardBtn"
                        tabIndex={1}
                        onClick={(e) => {
                            if (e.currentTarget === e.target) {
                                setStandard(!standard);
                            }
                        }}
                        onBlur={() => {
                            setStandard(false);
                        }}
                    >
                        {standard ? "닫기" : "확인"}
                        {standard && <StatisticsStandard />}
                    </div>
                    {/* 지플럼 수학 학습 포인트 지급 기준 */}
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
                            style={{ minWidth: "100px" }}
                            onClick={resetPoint}
                        >
                            초기화
                        </button>
                    </div>

                    <div className="fa">
                        <ClassSelect
                            width={"212px"}
                            value={classList}
                            className="mr-10"
                            onChange={(ele) => {
                                setClassList(ele);
                            }}
                        />

                        <SelectBase
                            value={year}
                            options={yearOption}
                            onChange={(ele) => {
                                setYear(ele);
                            }}
                            width="120px"
                            className="mr-10"
                        />
                        <SelectBase
                            value={month}
                            options={monthOption}
                            onChange={(ele) => {
                                setMonth(ele);
                            }}
                            width="120px"
                            className="mr-10"
                        />

                        <input
                            type="text"
                            className="textInput mr-10"
                            placeholder="학생 이름을 입력하세요."
                            value={studentName}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") pointList.refetch();
                            }}
                            onChange={(e) => {
                                setStudentName(e.target.value);
                            }}
                            style={{ width: "194px" }}
                        />
                        <button
                            type="button"
                            className="btn-green btn-icon"
                            style={{ width: "81px" }}
                            onClick={() => {
                                pointList.refetch();
                            }}
                        >
                            <Icon icon={"search"} />
                            조회
                        </button>
                    </div>
                </div>

                <table
                    className="custom-table point-list-table"
                    style={{ marginTop: "10px" }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: "4%" }}>번호</th>
                            <th style={{ width: "27%" }}>학생명(아이디)</th>
                            <th style={{ width: "9%" }}>학년</th>
                            <th style={{ width: "12%" }}>
                                <div className="carat" style={{ marginRight: "4px" }}></div>
                                캐럿(개)
                            </th>
                            <th style={{ width: "12%" }}>
                                <div className="mineral" style={{ marginRight: "4px" }}></div>
                                미네랄(개)
                            </th>
                            <th style={{ width: "12%" }}>
                                <div style={{ display: "inline-flex" }}>
                                    획득 포인트(CP){" "}
                                    <button
                                        className={`sort-btn ${
                                            sortPoint === "desc" ? "active" : ""
                                        }`}
                                        onClick={() => {
                                            setSortPoint(sortPoint === "desc" ? "asc" : "desc");
                                        }}
                                    >
                                        <Icon icon={"selct_typeC"} />
                                    </button>
                                </div>
                            </th>
                            <th style={{ width: "12%" }}>내역</th>
                            <th style={{ width: "12%" }}>총 누적 포인트(점)</th>
                            {scroll && <th style={{ width: "17px", border: "none" }}></th>}
                        </tr>
                    </thead>
                    <tbody style={{ maxHeight: "550px" }}>
                        {pointList.isFetching ? (
                            <SkeletonTable
                                R={10}
                                width={["4%", "27%", "9%", "12%", "12%", "12%", "12%", "12%"]}
                            />
                        ) : (
                            pointList.data.point_list?.map((a, i) => {
                                return <Tr key={i} list={a} index={i} />;
                            })
                        )}
                    </tbody>
                </table>


                <div className="d-none">
                    <table
                        ref={tableRef}
                    >
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>학생명(아이디)</th>
                                <th>학년</th>
                                <th>캐럿(개)</th>
                                <th>미네랄(개)</th>
                                <th>획들 포인드(CP)</th>
                                <th>충 누적 포인트(점)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pointList.data?.point_list?.map((a, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td className="text-left">
                                                {a.um_nm} ({a.um_id})
                                            </td>
                                            <td>{a.school_grade}</td>
                                            <td>{a.ct}</td>
                                            <td>{a.mi}</td>
                                            <td>{comma(a.point)}</td>
                                            <td>{comma(a.total_point)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

const Tr = memo(({ list, index }) => {
    let [modal, setModal] = useState(false);

    return (
        <tr>
            <td style={{ width: "4%" }}>{index + 1}</td>
            <td className="t-start" style={{ width: "27%" }}>
                <div className="text-green" style={{ fontWeight: "500" }}>
                    {list.um_nm} ({list.um_id})
                </div>
            </td>
            <td style={{ width: "9%" }}>{list.school_grade}</td>
            <td style={{ width: "12%" }}>{list.ct}</td>
            <td style={{ width: "12%" }}>{list.mi}</td>
            <td style={{ width: "12%" }}>{comma(list.point)}</td>
            <td style={{ width: "12%" }}>
                {modal && (
                    <PointModal userId={list.usr_seq} title={list.um_nm} setModal={setModal} />
                )}
                <button
                    className="btn-table-brown"
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    상세 보기
                </button>
            </td>
            <td style={{ width: "12%" }}>{comma(list.total_point)}</td>
        </tr>
    );
});

export default Statistics;
