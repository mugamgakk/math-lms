import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import { falseModal, fileDown } from "../../methods/methods";
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
    let [qData, setQdata] = useState([]);

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

    const getData = async () => {
        const data = {
            mode: "ct_score",
            sc_seq: sc_seq,
            usr_seq: clickStudent.usr_seq,
            qno: qnum,
        };

        try {
            let res = await ajax("/class_plus.php", { data: data });

            console.log(res);

            setQdata({ ...res.data });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, [qnum]);

    return (
        <div
            className="modal PlusLearningGradingModal"
            onClick={(e) => {
                falseModal(e, setModal);
            }}
        >
            <div className="modal-content">
                <div className="modal-container">
                    <div className="modal-header mb-3 fj">
                        <h4 className="title">서술형 따라잡기</h4>
                        <button
                            className="btn"
                            onClick={() => {
                                setModal(false);
                            }}
                        >
                            <Icon icon={"close"} />
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-name">
                            <strong className="name">강수학</strong>
                            <ul className="list">
                                <li>중2-1</li>
                                <li>I. 수와 식의 계산</li>
                                <li>번호, 주제</li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="layout">
                                <div className="problem-btn">
                                    <button
                                        className={`mr-10 ${qnum === 1 ? "btn-green" : "btn-grey"}`}
                                        onClick={() => {
                                            setQnum(1);
                                            getData(1);
                                        }}
                                    >
                                        1번 문항
                                    </button>
                                    <button
                                        className={`${qnum === 2 ? "btn-green" : "btn-grey"}`}
                                        onClick={() => {
                                            setQnum(2);
                                            getData(2);
                                        }}
                                    >
                                        2번 문항
                                    </button>
                                </div>

                                <div className="problem">
                                    <img
                                        src="https://file.parallaxedu.com/pxm/gplum/data/M11/tres/15M11TRA3104PR0010_2021_Q.png"
                                        alt="문제 영역"
                                        width={"100%"}
                                    />
                                </div>
                            
                                <div className="option-wrap">
                                <table>
                                    <colgroup>
                                        <col style={{ width: "71.9298%" }} />
                                        <col style={{ width: "10.5263%" }} />
                                        <col style={{ width: "17.5438%" }} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>채점 기준</th>
                                            <th>배점</th>
                                            <th>점수</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {qData[0]?.score.map((a, i) => {
                                            return <Tr key={i} ele={a} />;
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td style={{ textAlign: "center" }}>합계</td>
                                            <td>
                                                {qData[0]?.score.reduce((prev, ele) => {
                                                    return (
                                                        parseFloat(prev) +
                                                        parseFloat(ele.total_point || 0)
                                                    );
                                                }, 0)}
                                            </td>
                                            <td>
                                                {qData[0]?.score.reduce((prev, ele) => {
                                                    return prev + parseFloat(ele.point || 0);
                                                }, 0)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>

                                <div className="opinion">
                                    <h5>선생님 의견 (첨삭)</h5>
                                    <textarea id="option" defaultValue={qData?.comment}></textarea>
                                </div>

                                <div className="upload">
                                    <div className="upload-file mr-10 fs">
                                        <div className="file">
                                            <Icon icon={"file"} />
                                            첨부 파일1.pdf
                                        </div>
                                    </div>
                                    <div className="upload-button mr-10">
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
                                        <label htmlFor="upload">첨부 파일</label>
                                    </div>
                                    <button type="button" className="mr-10">
                                        +
                                    </button>
                                    <button type="button">-</button>
                                </div>
                                </div>
                            </div>

                            <div className="layout">
                                <div className="answer">
                                    <h4
                                        className="answer-header"
                                        style={{ backgroundColor: "#e6ddd8", color: "#444" }}
                                    >
                                        모범답안
                                    </h4>
                                    <div className="answer-body">
                                        <img
                                            src="https://img.animalplanet.co.kr/news/2022/03/14/700/uxh9813j6ydgv2vd6npp.jpg"
                                            alt=""
                                            width={"100%"}
                                        />
                                    </div>
                                </div>
                                <div className="answer">
                                    <h4
                                        className="answer-header"
                                        style={{ backgroundColor: "#664e3d", color: "#fff" }}
                                    >
                                        학생 답안지
                                    </h4>
                                    <div className="answer-body" style={{ overflow: "hidden" }}>
                                        <PrismaZoom ref={prizmaZoom}>
                                            <img
                                                src={"https://file.parallaxedu.com/pxm/gplum/data/M11/tres/15M11TRA3104PR0010_2021_Q.png"}
                                            />
                                        </PrismaZoom>
                                        <button
                                            type="button"
                                            className="plus"
                                            onClick={() => {
                                                window.open("https://file.parallaxedu.com/pxm/gplum/data/M11/tres/15M11TRA3104PR0010_2021_Q.png");
                                            }}
                                        >
                                            <Icon icon={"lnbDetail"} />
                                        </button>
                                        <button type="button" className="download" onClick={()=>{
                                            fileDown("https://file.parallaxedu.com/pxm/gplum/data/M11/tres/15M11TRA3104PR0010_2021_Q.png", "image.jpg");
                                        }}>
                                            <Icon icon={"downloadB"} />
                                        </button>
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
                            style={{ minWidth: "100px" }}
                        >
                            취소
                        </button>
                        <button className="btn-orange" style={{ minWidth: "100px" }}>
                            수정
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Tr = ({ ele, selectUpdate }) => {
    let [value, setValue] = useState(ele.score);
    const selectOption = () => {
        let result = [];

        for (let i = 0; i <= ele.total_point; i += 0.5) {
            result.push({ value: i, label: i });
        }

        return result;
    };

    return (
        <tr>
            <td className="text-left">{ele.scoring_guide}</td>
            <td>{ele.total_point}</td>
            <td style={{ padding: "5px" }}>
                <SelectBase
                    options={selectOption()}
                    value={value}
                    width="90px"
                    defaultValue="선택"
                    onChange={(a) => {
                        console.log(a)
                        // selectUpdate(a);
                        setValue(a)
                    }}
                />
            </td>
        </tr>
    );
};

export default PlusLearningGradingModal;
