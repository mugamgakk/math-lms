import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CkeditorCustom from "ckeditor5-custom-build";
import axios from "axios";
 
function Editor({contents,setContents, placeholder = ""}) {
    class UploadAdapter {
        constructor(loader, t) {
            this.loader = loader;
            this.t = t;
        }
    
        upload() {
            return new Promise((resolve, reject) => {
                const reader = this.reader = new FileReader();
    
                reader.onload = function () {
                    resolve({ default: reader.result });
                };
    
                reader.onerror = function (error) {
                    reject(error);
                };
    
                reader.onabort = function () {
                    reject();
                };
    
                this.loader.file.then(file => {
                    // var size = 1024 * 1024;
                    // if (file.size > size) {
                    //     reject('Image files can only be up to 1MB.');
                    //     return;
                    // }
    
                    reader.readAsDataURL(file);
                });
            });
        }
    
        abort() {
            if (this.reader) {
                this.reader.abort();
            }
        }
    }
    function Base64UploaderPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, editor.t);
        };
    }
    return (
        <div>
            <CKEditor
                editor={CkeditorCustom}
                config={{
                    extraPlugins: [Base64UploaderPlugin],
                    placeholder:placeholder
                }}
                data={contents && contents}
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                     setContents(data);
                    // data === ????????? ???
                    // console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    // console.log("Focus.", editor);
                }}
            />

            {/* 
    editor // ????????? ??????
    data // ????????? ?????? value
    onReady // ?????? ?????????
    onChange // ??? ???????????????
    onFocus // ????????? ?????????
    onBlur // ???????????? ????????????
  */}
        </div>
    );
}

export default Editor;
