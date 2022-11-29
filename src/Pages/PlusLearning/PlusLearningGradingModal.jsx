import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import { getByteSize } from "../../methods/methods";
import PrismaZoom from "react-prismazoom";
import { useCallback } from "react";
import useStudentsStore from "../../store/useStudentsStore";
import ajax from "../../ajax";
import Icon from "../../components/Icon";

function PlusLearningGradingModal({ setModal, sc_seq }) {
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    let prizmaZoom = useRef();
    let [files, setFiles] = useState([]);
    let 총파일크기 = useRef(0);

    let [score, setScore] = useState(0);

    // checked Files
    let [checkedFile, setCheckedFile] = useState([]);

    // 통신 데이터
    let [qData, setQdata] = useState(null);
    // 문항번호
    let [qnum, setQnum] = useState(1);

    const upload = useCallback(
        (파일) => {
            var 업로드파일정규식 = /\.(pdf|jpg|png)$/i;
            var 총파일사이즈 = 총파일크기.current;
            var $10mb = 1024 * 1024 * 10; // 10mb

            let arr = [];

            if (files.length === 3) {
                alert("업로드 파일 갯수를 초과 하였습니다.");
                return;
            }

            for (let value of 파일) {
                for (let a of files) {
                    if (a.name === value.name) {
                        alert("이미 업로드 된 파일입니다.");
                        return;
                    }
                }

                if (총파일사이즈 >= $10mb) {
                    alert("총 파일 사이즈를 초과하였습니다 (10mb)");
                    return;
                }

                if (업로드파일정규식.test(value.name) === false) {
                    alert("일치하는 파일 형식이 아닙니다.");
                    return;
                }

                if (value.size >= $10mb) {
                    alert("파일이 너무 큽니다.");
                    return;
                }

                arr.push(value);
                총파일크기.current = 총파일크기.current + value.size;
            }

            setFiles([...files, ...arr]);
        },
        [files]
    );

    const fileCheck = (check, ele) => {
        check
            ? setCheckedFile([...checkedFile, ele])
            : setCheckedFile(checkedFile.filter((a) => a !== ele));
    };

    const selectUpdate = (ele, data) => {
        const { value } = data;

        let copy = [...qData.score];
        copy.forEach((a) => {
            if (a.scoring_guide === ele.scoring_guide) {
                a.stdpoint = value;
            }
        });

        setQdata({ ...qData, score: copy });
    };

    const removeFile = () => {
        let 체크된파일사이즈 = 0;
        let copyFiles = [...files];

        checkedFile.forEach((a) => {
            체크된파일사이즈 += a.size;

            copyFiles.forEach((dd, i) => {
                if (a.name === dd.name) {
                    copyFiles.splice(i, 1);
                }
            });
        });

        setFiles(copyFiles);
        총파일크기.current = 총파일크기.current - 체크된파일사이즈;
    };

    const getData = async (qnum) => {
        const data = {
            mode: "ct_score",
            sc_seq: sc_seq,
            usr_seq: clickStudent.usr_seq,
            qno: qnum,
        };

        try {
            let res = await axios.post("http://192.168.11.178:8080/pluslearning/popup", data);

            setQdata(res.data);

            console.log(res.data);

            let num = res.data.score.reduce((prev, ele) => {
                return prev + ele.stdpoint;
            }, 0);

            setScore(num);
        } catch (err) { }
    };

    useEffect(() => {
        getData();
    }, [qnum]);

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header mb-3 fj">
                    <h4 className="title">서술형 따라잡기</h4>
                    <button className='btn'
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name">
                        <strong className="name">
                            강수학
                        </strong>
                        <ul className="list">
                            <li>중2-1</li>
                            <li>I. 수와 식의 계산</li>
                            <li>번호, 주제</li>
                        </ul>
                    </div>
                    <div className="row">
                    <div className="col-6">
                        <div className="btn-group mb-3">
                            <button
                                className={`btn-grey ${qnum === 1 ? "btn-green" : ""}`}
                                onClick={() => {
                                    setQnum(1);
                                    getData(1);
                                }}
                            >
                                1번 문항
                            </button>
                            <button
                                className={`btn-grey ${qnum === 2 ? "btn-green" : ""}`}
                                onClick={() => {
                                    setQnum(2);
                                    getData(2);
                                }}
                            >
                                2번 문항
                            </button>
                        </div>

                        <div className="problem mb-3" style={{ height: "250px", overflow: "auto" }}>
                            <img
                                src={qData?.aimage_path + qData?.qimg_filename}
                                alt="문제 영역"
                                width={"100%"}
                            />
                        </div>

                        <table className="mb-3">
                            <colgroup>
                                <col style={{ width: "auto" }} />
                                <col style={{ width: "100px" }} />
                                <col style={{ width: "100px" }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>채점 기준</th>
                                    <th>배점</th>
                                    <th>점수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {qData?.score.map((ele, i) => {
                                    return <Tr ele={ele} key={i} selectUpdate={selectUpdate} />;
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>합계</td>
                                    <td>
                                        {qData?.score.reduce((prev, ele) => {
                                            return ele.point + prev;
                                        }, 0)}{" "}
                                        점
                                    </td>
                                    <td>
                                        {qData?.score.reduce((prev, ele) => {
                                            return ele.stdpoint + prev;
                                        }, 0)}{" "}
                                        점
                                    </td>
                                </tr>
                            </tfoot>
                        </table>

                        <label htmlFor="option">선생님 의견 (첨삭)</label>
                        <textarea id="option" rows="10" defaultValue={qData?.comment}></textarea>

                        <div className="file-wrap fj">
                            <div
                                className="file-view border"
                                style={{ minWidth: "100px", height: "80px" }}
                            >
                                {files.map((a, i) => {
                                    return (
                                        <div key={i}>
                                            <input
                                                type="checkbox"
                                                id={a.name}
                                                checked={checkedFile.includes(a)}
                                                onChange={(e) => {
                                                    fileCheck(e.target.checked, a);
                                                }}
                                            />
                                            {a.name.length > 20 ? (
                                                <label htmlFor={a.name}>
                                                    {a.name.substr(0, 20) + ".".repeat(3)}
                                                </label>
                                            ) : (
                                                <label htmlFor={a.name}>{a.name} </label>
                                            )}{" "}
                                            ({getByteSize(a.size)})
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="file-button">
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        upload(e.target.files);
                                    }}
                                    id="upload"
                                    name="upload"
                                    style={{ display: "none" }}
                                    multiple
                                />
                                <label htmlFor="upload" className="d-flex">
                                    첨부 파일
                                </label>
                                <button className="btn" onClick={removeFile}>
                                    선택 삭제
                                </button>
                            </div>
                        </div>

                        <div className="text-center">

                        </div>
                    </div>

                    <div className="col-6">
                        <div style={{ height: "50%" }}>
                            <h4 style={{ padding: "5px", backgroundColor: "skyblue" }}>모범답안</h4>
                            <div style={{ height: "calc(100% - 30px)", overflow: "auto" }}>
                                <img
                                    src="https://img.animalplanet.co.kr/news/2022/03/14/700/uxh9813j6ydgv2vd6npp.jpg"
                                    alt=""
                                    width={"100%"}
                                />
                            </div>
                        </div>
                        <div style={{ height: "50%" }}>
                            <h4
                                className="fj"
                                style={{ padding: "5px", backgroundColor: "skyblue" }}
                            >
                                학생 답안지
                                <div className="btn-group">
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            prizmaZoom.current.zoomIn(1);
                                        }}
                                    >
                                        플러스
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            prizmaZoom.current.zoomOut(1);
                                        }}
                                    >
                                        마이너스
                                    </button>
                                </div>
                            </h4>
                            <div style={{ height: "calc(100% - 30px)", overflow: "auto" }}>
                                <PrismaZoom ref={prizmaZoom}>
                                    <img
                                        src={
                                            "https://img.animalplanet.co.kr/news/2022/03/14/700/uxh9813j6ydgv2vd6npp.jpg"
                                        }
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </PrismaZoom>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn-grey-border mr-10"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        취소
                    </button>
                    <button className="btn-orange">수정</button>
                </div>
            </div>
        </div>
    );
}

const Tr = ({ ele, selectUpdate }) => {
    const selectOption = () => {
        let result = [];

        for (let i = 0; i <= ele.point; i += 0.5) {
            result.push({ value: i, label: i });
        }

        return result;
    };

    return (
        <tr>
            <td className="text-left">{ele.scoring_guide}</td>
            <td>{ele.point}</td>
            <td>
                <SelectBase
                    value={ele.stdpoint}
                    onChange={(data) => {
                        selectUpdate(ele, data);
                    }}
                    options={selectOption()}
                />
            </td>
        </tr>
    );
};

export default PlusLearningGradingModal;
