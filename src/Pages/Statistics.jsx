import React, { useState, useRef } from "react";
import ContentHeader from "../components/ContentHeader";
import StatisticsSearch from "./Statistics/StatisticsSearch";
import StatisticsStandard from "./Statistics/StatisticsStandard";
import { useDownloadExcel } from "react-export-table-to-excel";
import PointModal from "./Statistics/PointModal";

const data = [
    {
        id: 1,
        name: "강수학",
        nickName: "kimsw",
        grade: "중2",
        carrot: 20,
        mineral: 10,
        getPoint: 250,
        beforePoint: 2300,
        ban: "중등 월화수 A",
    },
    {
        id: 2,
        name: "강시후",
        nickName: "qwkjlk",
        grade: "중1",
        carrot: 22,
        mineral: 12,
        getPoint: 280,
        beforePoint: 2100,
        ban: "중등 월화수 B",
    },
    {
        id: 3,
        name: "김민찬",
        nickName: "wlkj24",
        grade: "중2",
        carrot: 42,
        mineral: 0,
        getPoint: 420,
        beforePoint: 2000,
        ban: "중등 월화수 A",
    },
    {
        id: 4,
        name: "박연하",
        nickName: "wlkj35",
        grade: "중3",
        carrot: 21,
        mineral: 4,
        getPoint: 230,
        beforePoint: 1230,
        ban: "중등 월화수 A",
    },
    {
        id: 5,
        name: "신중누",
        nickName: "45jsda",
        grade: "중1",
        carrot: 32,
        mineral: 12,
        getPoint: 380,
        beforePoint: 1200,
        ban: "중등 월화수 B",
    },
];

function Statistics() {
    let [value, setValue] = useState(data);
    let [sortPoint, setSortPoint] = useState("desc");
    let [selectReset, setSelectReset] = useState(0);
    const tableRef = useRef(null);

    // 라이브러리때문에 3번 재랜더링 됨
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Users table",
        sheet: "Users",
    });
    

    const sortList = () => {
        let copy = [...value];

        if (sortPoint === "desc") {
            copy.sort((a, b) => {
                return a.getPoint - b.getPoint;
            });

            setValue(copy);
            setSortPoint("asc");
        } else {
            copy.sort((a, b) => {
                return b.getPoint - a.getPoint;
            });

            console.log(copy);
            setValue(copy);
            setSortPoint("desc");
        }
    };
    // 내림 : desc // 오름 : asc

    const resetList = () => {
        setValue(data);
        setSelectReset(selectReset + 1)
    };


    return (
        <div className="Statistics container">
            <ContentHeader title={"학습 포인트 현황"} />

            {/* 지플럼 수학 학습 포인트 지급 기준 */}
            <StatisticsStandard />

            <div className="Statistics-search fj">
                <div>
                    <button className="btn" onClick={resetList}>
                        초기화
                    </button>
                    <button className="btn" onClick={()=>{
                        if(window.confirm("다운로드 하시겠습니까?")){
                            onDownload()
                        }else{
                            return 
                        }
                        }}>
                        다운로드
                    </button>
                </div>
                <StatisticsSearch data={data} value={value} setValue={setValue} selectReset={selectReset} />
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
                            획득 포인트(점)
                            <button
                                className={"btn-sort" + `${sortPoint === "asc" ? " asc" : ""}`}
                                onClick={sortList}
                            ></button>
                        </th>
                        <th>내역</th>
                        <th>총 누적 포인트(점)</th>
                    </tr>
                </thead>
                <tbody>
                    {value.map((a) => {
                        return <Tr key={a.id} list={a} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = ({ list }) => {

    let [modal, setModal] = useState(false);

    return (
        <tr>
            <td>{list.id}</td>
            <td>
                {list.name} ({list.nickName})
            </td>
            <td>{list.grade}</td>
            <td>{list.carrot}</td>
            <td>{list.mineral}</td>
            <td>{list.getPoint}</td>
            <td>
                {
                    modal && <PointModal title={list.name} setModal={setModal}/>
                }
                <button className="btn" onClick={()=>{setModal(true)}}>상세 보기</button>
            </td>
            <td>{list.beforePoint}</td>
        </tr>
    );
};

export default Statistics;
