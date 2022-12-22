import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import axios from "axios";

function Editor() {
    let [content, setContent] = useState("");

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("file", file);
                        fetch(`http://192.168.11.178:8080/upload`, {
                          method: "post",
                          body: body
                        })
                          .then((res) => res.json())
                          .then((res) => {
                            resolve({
                              default: `http://192.168.11.178:8080/images/${res.filename}`
                            });
                          })
                          .catch((err) => {
                            reject(err);
                          });
                        });
                    });
                },
            };
        }
        
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    return (
        <div>
            <h2>텍스트 에디터</h2>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    extraPlugins: [uploadPlugin],
                }}
                data={content}
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                    // data === 작성된 값
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                }}
            />

            {/* 
    editor // 에디터 설정
    data // 에디터 초기 value
    onReady // 로드 됐을때
    onChange // 값 변경했을때
    onFocus // 포커스 했을때
    onBlur // 포커스를 잃었을때
  */}
        </div>
    );
}

export default Editor;
