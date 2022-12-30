import React from "react";
import { useRef } from "react";
import Icon from "../../components/Icon";
import SelectBase from "../../components/ui/select/SelectBase";
import PrismaZoom from "react-prismazoom";
import { useState } from "react";
import { fileDown, _cloneDeep } from "../../methods/methods";
import { useCallback } from "react";
import ajax from "../../ajax";
import useStudentsStore from "../../store/useStudentsStore";
import { useEffect } from "react";
import { getBase64, getUrlFileSize } from "../../methods/methods";

function PlusLearningGradingModal({ setModal, sc_seq, edit }) {
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let prizmaZoom = useRef();

    // 파일
    let [files, setFiles] = useState([[]]);
    // 문항
    let [num, setNum] = useState(0);
    let [data, setData] = useState(null);
    let [comment, setComment] = useState("");

    const getData = async () => {
        const data = {
            mode: "ct_score",
            sc_seq,
            usr_seq: clickStudent.usr_seq,
            qno: num + 1,
        };

        let res = await ajax("/class_plus.php", { data });

        let arr = [];
        // 파일 이름과 확장자 나누기
        for (let i = 0; i < res.data[0].files.length; i++) {
            let file = res.data[0].files[i];
            res.data[0].files[i] = {
                ...res.data[0].files[i],
                ...fileEXtentionDetail(file.file_name),
            };
            res.data[0].files[i].size = await getUrlFileSize(file.file_url);
            arr.push(new Array(res.data[0].files[i]));
        }

        // 시험지별 재할당 하지않게 공통영역 처리
        if (files[0].length === 0) {
            setFiles(arr);
        }
        if (comment === "") {
            setComment(res.data[0].comment);
        }

        setData(res.data[0]);
    };

    //  파일 업로드
    const upload = useCallback(
        (file, index) => {
            const $5mb = 1024 * 1024 * 5; // 5mb

            if (!file[0]) {
                return;
            }

            if (/\.(pdf|jpg|png)$/i.test(file[0].name) === false) {
                alert("일치하는 파일 형식이 아닙니다.");
                return;
            }

            // 총파일 검사
            let allCount = 0;
            for (let i = 0; i < files.length; i++) {
                // 파일이 들어있을때, 해당 index 파일 예외 총 용량
                if (i !== index && files[i].length === 1) {
                    allCount += files[i][0].size;
                }
            }

            // console.log("5메가", $5mb);
            // console.log("allCount", allCount);
            // console.log("올리려는파일", file[0].size);

            if (allCount + file[0].size >= $5mb) {
                alert("총 파일 용량을 초과하였습니다 (5mb)");
                return;
            }

            if (file[0].size >= $5mb) {
                alert("파일 사이즈를 초과하였습니다 (5mb)");
                return;
            }

            // 확장자 , 파일명 분리
            let { fileExtention, fileName } = fileEXtentionDetail(file[0].name);
            file[0].fileExtention = fileExtention;
            file[0].fileName = fileName;

            const copyFiles = [...files];
            copyFiles[index] = new Array(file[0]);
            setFiles(copyFiles);
        },
        [files]
    );

    const selectChange = (score, index) => {
        let copyScore = _cloneDeep(data.score);
        copyScore[index].point = score.value;
        setData({ ...data, score: copyScore });
    };

    // 저장
    const savePlus = async () => {
        const param = {
            mode: "ct_score_save",
            sc_seq: sc_seq,
            usr_seq: clickStudent.usr_seq,
            qno: num + 1,
            score: data.score.map((a) => parseFloat(a.point || 0)),
            comment: comment,
            files: [],
        };

        // 새로 업로드한 파일만
        for (let ele of files) {
            if (ele[0] instanceof File) {
                let base64 = await getBase64(ele[0]);
                param.files.push({ filename: ele[0].name, file: base64 });
            }
        }

        let res = await ajax("/class_plus.php", { data: param });

        if (res.data.ok == 1) {
            alert("저장이 완료되었습니다.");
        }
    };

    // 파일 삭제
    const removeFile = (index) => {
        if (files[index].length !== 0) {
            if (window.confirm("파일을 삭제하시겠습니까?")) {
                if (files.length === 1 && files[0].length === 1) {
                    setFiles([[]]);
                    return;
                }
                let copy = [...files];
                copy.splice(index, 1);
                setFiles(copy);
            } else {
                return;
            }
        } else {
            let copy = [...files];
            copy.splice(index, 1);
            setFiles(copy);
        }
    };

    useEffect(() => {
        getData();
    }, [num]);

    return (
        <div className="modal PlusLearningGradingModal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">서술형 따라잡기</h2>
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

                    <div className="grading-content">
                        <div className="row">
                            <div className="col-6" style={{ paddingRight: "20px" }}>
                                <div className="button-group">
                                    <button
                                        className={`${num === 0 ? "btn-green" : "btn-grey"} mr-10`}
                                        onClick={() => {
                                            setNum(0);
                                        }}
                                    >
                                        1번 문항
                                    </button>
                                    <button
                                        className={`${num === 1 ? "btn-green" : "btn-grey"}`}
                                        onClick={() => {
                                            setNum(1);
                                        }}
                                    >
                                        2번 문항
                                    </button>
                                </div>
                                <div className="grading-problem">
                                    <img src={data?.qimg_filename} alt="문제" />
                                </div>
                                <div className="options-wrap">
                                    <div className="grading-table">
                                        <table>
                                            <colgroup>
                                                <col style={{ width: "auto" }} />
                                                <col style={{ width: "61px" }} />
                                                <col style={{ width: "81px" }} />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>채점 기준</th>
                                                    <th>배점</th>
                                                    <th>점수</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.score.map((a, i) => {
                                                    return (
                                                        <Tr
                                                            ele={a}
                                                            index={i}
                                                            key={i}
                                                            selectChange={selectChange}
                                                        />
                                                    );
                                                })}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td>합계</td>
                                                    <td>
                                                        {data?.score.reduce((prev, ele) => {
                                                            return (
                                                                prev + parseFloat(ele.total_point)
                                                            );
                                                        }, 0)}
                                                    </td>
                                                    <td>
                                                        {data?.score.reduce((prev, ele) => {
                                                            return (
                                                                prev + parseFloat(ele.point || 0)
                                                            );
                                                        }, 0)}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="grading-opinion">
                                        {comment === "" && <p className="alert-msg">텍스트 입력</p>}
                                        <h5>선생님 의견 (첨삭)</h5>
                                        <textarea
                                            id="option"
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                            }}
                                            maxLength={500}
                                            value={comment}
                                        ></textarea>
                                    </div>
                                    {files.map((a, i) => {
                                        return (
                                            <div className="upload" key={i}>
                                                <div className="upload-file mr-10 fs">
                                                    {a.length !== 0 && (
                                                        <div className="file">
                                                            <Icon icon={"file"} />
                                                            {a[0].fileName.length > 18
                                                                ? a[0].fileName.substr(0, 21) +
                                                                  ".".repeat(3) +
                                                                  a[0].fileExtention
                                                                : a[0].fileName +
                                                                  "." +
                                                                  a[0].fileExtention}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="upload-button mr-10">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            upload(e.target.files, i);
                                                        }}
                                                        id={`upload${i}`}
                                                        className="d-none"
                                                    />
                                                    <label htmlFor={`upload${i}`}>첨부 파일</label>
                                                </div>
                                                {files.length - 1 === i && files.length < 3 && (
                                                    <button
                                                        type="button"
                                                        className="mr-10"
                                                        onClick={() => {
                                                            setFiles([...files, []]);
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                )}
                                                {files.length !== 1 ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            removeFile(i);
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                ) : (
                                                    files[0].length !== 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                removeFile(i);
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-6" style={{ paddingLeft: "20px" }}>
                                <div className="answer">
                                    <h4
                                        className="answer-header"
                                        style={{ backgroundColor: "#e6ddd8", color: "#444" }}
                                    >
                                        모범답안
                                    </h4>
                                    <div className="answer-body">
                                        <img src={data?.aimg_filename} alt="답안" width={"100%"} />
                                    </div>
                                </div>
                                <div className="answer">
                                    <h4
                                        className="answer-header"
                                        style={{ backgroundColor: "#664e3d", color: "#fff" }}
                                    >
                                        학생 답안지
                                    </h4>
                                    {/* <p className='alert-msg'>학생이 등록한 답안이 없습니다.</p> */}
                                    <div className="answer-body" style={{ overflow: "hidden" }}>
                                        <PrismaZoom ref={prizmaZoom}>
                                            <img src={data?.aimage_path} />
                                        </PrismaZoom>
                                        <button
                                            type="button"
                                            className="plus"
                                            onClick={() => {
                                                window.open(data?.aimage_path);
                                            }}
                                        >
                                            <Icon icon={"lnbDetail"} />
                                        </button>
                                        <button
                                            type="button"
                                            className="download"
                                            onClick={() => {
                                                fileDown(data?.aimage_path, "image.jpg");
                                            }}
                                        >
                                            <Icon icon={"downloadB"} />
                                        </button>
                                    </div>
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
                    <button className="btn-orange" onClick={savePlus}>
                        {edit ? "수정" : "채점 완료"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const Tr = ({ ele, index, selectChange }) => {
    return (
        <tr>
            <td>{ele.scoring_guide}</td>
            <td>{ele.total_point}</td>
            <td>
                <SelectBase
                    options={createOption(ele.total_point)}
                    width="70px"
                    defaultValue="점수"
                    onChange={(a) => {
                        selectChange(a, index);
                    }}
                    value={parseFloat(ele.point || 0)}
                />
            </td>
        </tr>
    );
};

const createOption = (point) => {
    const totalPoint = parseFloat(point);
    let arr = [];
    for (let i = 0; i <= totalPoint; i += 0.5) {
        arr.push({ value: i, label: i });
    }
    return arr;
};

const fileEXtentionDetail = (fileName) => {
    let obj = {
        fileExtention: "",
        fileName: "",
    };
    let arr = fileName.split(".");
    obj.fileExtention = arr.pop();
    obj.fileName = arr.join("");

    return obj;
};

export default PlusLearningGradingModal;
