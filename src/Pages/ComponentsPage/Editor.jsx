import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


function Editor() {
    return ( 
        <div>
        <h2>텍스트 에디터</h2>
        <CKEditor
            editor={ClassicEditor}
            data="<p>들어갈 HTML</p>"
            onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
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