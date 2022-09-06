import React from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getByteSize } from "../methods/methods";

const Box = styled.div`
    display : inline-block;
    padding : 20px;
    border
    1px solid #ccc
`;

function Test() {
    let [files, setFiles] = useState([]);
    let 총파일크기 = useRef(0);

    const upload = useCallback(
        (파일) => {
            var 업로드파일정규식 = /\.(hwp|doc|docx|xls|xlsx|ppt|pptx|pdf|jpg|png|zip)$/i;
            var 파일사이즈 = 파일[0].size;
            var 총파일사이즈 = 총파일크기.current;

            let arr = [];

            for (let key of 파일) {
                for (let a of files) {
                    if (a.name === key.name) {
                        alert("이미 업로드 된 파일입니다.");
                        return;
                    }
                }

                if (총파일사이즈 >= 104857600) {
                    alert("총 파일 사이즈를 초과하였습니다 (100mb)");
                    return;
                }

                if (업로드파일정규식.test(key.name) === false) {
                    alert("일치하는 파일 형식이 아닙니다.");
                    return;
                }

                if (key.size >= 104857600) {
                    alert("파일이 너무 큽니다.");
                    return;
                }

                arr.push(key);
                총파일크기.current = 총파일크기.current + key.size;
            }

            setFiles([...files, ...arr]);
        },
        [files]
    );

    console.log(files);

    return (
        <div>
            <div className="container">
                <Box>
                    <input type="file" id="file" onChange={(e)=>{upload(e.target.files)}} className="d-none" multiple />
                    <label htmlFor="file" className="btn">
                        업로드
                    </label>
                </Box>

                <div
                    style={{ padding: "10px", border: "1px solid #ccc" }}
                    onDragOver={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        var 파일 = e.dataTransfer.files;
                        upload(파일)
                        console.log("드롭됨")
                    }}
                >
                    {files.length === 0 && (
                        <p style={{ textAlign: "center" }}>여기에 첨부파일을 끌어오세요</p>
                    )}
                    {files.map((a, i) => {
                        return (
                            <div key={i}>
                                {a.name} ( {getByteSize(a.size)} ){" "}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Test;
