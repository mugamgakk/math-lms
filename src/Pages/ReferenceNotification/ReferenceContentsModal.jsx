// yeonju
import React from "react";
import { fetchData, fileDown } from "../../methods/methods";
import FileSaver from "file-saver";
import JSZip from "jszip";
import Icon from "../../components/Icon";
import { useQuery } from "react-query";
import dayjs from "dayjs";

// 앞뒤 따움표 제거
const removeD = (a = "") => {
    let d = a.replace(/^\"/, "");
    d = d.replace(/\"$/, "");

    return d;
};

function ReferenceContentsModal({ seq, setModal, postNumber, setPostNumber, totalCount }) {
    const param = {
        mode: "view",
        bd_seq: seq,
    };
    // console.log(seq, postNumber, totalCount);

    let postInfo = useQuery(["info", seq], () => fetchData("board", param), {
        refetchOnWindowFocus: false,
    });

    // console.log(postInfo)

    const makeZip = async (filesArr, fileName = "download") => {
        if (filesArr.length === 0) {
            return;
        }

        const zip = new JSZip();

        try {
            const fileArr = [];
            for (let ele of filesArr) {
                const response = await fetch(ele.fileurl);

                if(response.status === 404){
                    throw new Error("파일에 문제가 있습니다.");
                }

                const data = await response.blob();
                const ext = ele.filename.split(".").pop();
                const filename = ele.filename;
                const metadata = { type: `image/${ext}` };
                const file = new File([data], filename, metadata);
                fileArr.push(file);
            }

            fileArr.forEach((ele) => {
                zip.file(ele.name, ele, { binary: true });
            });

            zip.generateAsync({ type: "blob" }).then((content) => {
                FileSaver.saveAs(content, fileName);
            });
        } catch(err) {
            alert(err);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content referenceContentsModal">
                <div className="modal-header fj">
                    <h2 className="modal-title">게시물 확인</h2>
                    <button
                        className="btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setModal(false);
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="top">
                        <h3>{postInfo.data?.[0].bd_title}</h3>
                        <div className="text-right">조회수:{postInfo.data?.[0].hit}</div>
                        <div className="fj">
                            <div>
                                <span className="top-tit">대상</span>
                                {postInfo.data?.[0].bd_cate}
                            </div>
                            <div>
                                <span className="top-tit">작성자</span>
                                {postInfo.data?.[0].write}
                            </div>
                            <div className="date">
                                {
                                    dayjs(postInfo.data?.[0].reg_dt).format("YYYY.MM.DD") + " "
                                } 
                            </div>
                        </div>
                    </div>
                    <div
                        className="mid scroll"
                        dangerouslySetInnerHTML={{ __html: removeD(postInfo.data?.[0].bd_content) }}
                    ></div>
                    <div className="foot">
                        <div className="file scroll">
                            <Icon icon={"file"} style={{ color: "#666" }} />
                            {postInfo.data?.[0]?.files.length > 0 &&
                                postInfo.data?.[0]?.files.map((file) => {
                                    return (
                                        <div
                                            key={file.bf_seq}
                                            onClick={() => fileDown(file.fileurl, file.filename)}
                                        >
                                            {file.filename}({file.filesize})
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="fe mt-20">
                            <button
                                className="btn-grey"
                                onClick={() => {
                                    makeZip(postInfo.data?.[0].files, postInfo.data?.[0].bd_title);
                                }}
                            >
                                모두 받기
                            </button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    {postNumber !== 0 && (
                        <button
                            className="btn-brown mr-4"
                            onClick={() => {
                                setPostNumber(postNumber - 1);
                            }}
                        >
                            이전 글 보기
                        </button>
                    )}

                    <button className="btn-orange-border mr-4" onClick={() => {}}>
                        수정
                    </button>
                    <button className="btn-orange mr-4">삭제</button>
                    <button
                        className="btn-grey mr-4"
                        onClick={(e) => {
                            setModal(false);
                            e.stopPropagation();
                        }}
                    >
                        닫기
                    </button>
                    {totalCount - 1 !== postNumber && (
                        <button
                            className="btn-brown"
                            onClick={() => {
                                setPostNumber(postNumber + 1);
                            }}
                        >
                            다음 글 보기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReferenceContentsModal;
