import React, { useRef, useState } from "react";
import { getByteSize, fileDown, makeZip } from "../../methods/methods";

function FileDownLoad() {
    let [files, setFiles] = useState([]);
    let 총파일크기 = useRef(0);

    const upload = (파일) => {
        var 업로드파일정규식 = /\.(hwp|doc|docx|xls|xlsx|ppt|pptx|pdf|jpg|png|zip)$/i;
        var 총파일사이즈 = 총파일크기.current;
        var $100mb = 1024 * 1024 * 100; // 100mb

        let arr = [];

        for (let value of 파일) {
            for (let a of files) {
                if (a.name === value.name) {
                    alert("이미 업로드 된 파일입니다.");
                    return;
                }
            }

            if (총파일사이즈 >= $100mb) {
                alert("총 파일 사이즈를 초과하였습니다 (100mb)");
                return;
            }

            if (업로드파일정규식.test(value.name) === false) {
                alert("일치하는 파일 형식이 아닙니다.");
                return;
            }

            if (value.size >= $100mb) {
                alert("파일이 너무 큽니다.");
                return;
            }

            arr.push(value);
            총파일크기.current = 총파일크기.current + value.size;
        }

        setFiles([...files, ...arr]);
    };

    console.log(files);

    return (
        <div>
            <div className="container">
                <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                        upload(e.target.files);
                    }}
                    className="d-none"
                    multiple
                />
                <label htmlFor="file" className="btn">
                    업로드
                </label>
                <button
                    className="btn"
                    onClick={() => {
                        makeZip(files, "ghhgfhg");
                    }}
                >
                    zip만드는 버튼
                </button>

                <div
                    style={{ padding: "10px", border: "1px solid #ccc" }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    // 리액트에서 드래그 오버 이벤트를 넣지 않으면 드롭이벤트가 먹지 않음 !
                    onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        var 파일 = e.dataTransfer.files;
                        // 드롭한 파일들이 모두 들어있음

                        if (파일.length === 0) {
                            return;
                        }

                        upload(파일);
                        console.log("드롭됨");
                    }}
                >
                    {files.length === 0 && (
                        <p style={{ textAlign: "center" }}>여기에 첨부파일을 끌어오세요</p>
                    )}
                    {files.map((a, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    fileDown(a);
                                }}
                            >
                                {a.name} ( {getByteSize(a.size)} )
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FileDownLoad;
