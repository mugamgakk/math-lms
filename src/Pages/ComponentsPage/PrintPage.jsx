import * as React from "react";
import ReactToPrint from "react-to-print"; // pdf, 인쇄
import html2canvas from "html2canvas";
import FileSaver from "file-saver";
import html2pdf  from "html2pdf.js";



function PrintPage() {
    const printComponent = React.useRef();

    return (
        <div style={{ marginTop: "100px" }}>
            <h2>Pdf 만들기</h2>
            <ReactToPrint
                trigger={() => <button className="btn">프린트 버튼</button>} //  trigger : 인쇄를 명령할 컴포넌트를 넣어주기
                content={() => printComponent.current} // content : 인쇄 대상 ref를 넘겨주기
                // documentTitle= "pdf이름" //pdf 로 저장할때 이름
            />

            <ReactToPrint
                trigger={() => <button className="btn">pdf 버튼</button>} 
                content={() => printComponent.current} 
                print={async (printIframe) => {
                    const document = printIframe.contentDocument;
                    console.log(document)
                    if (document) {
                        const html = document.getElementsByTagName('html')[0];
                        console.log(html);
                        await html2pdf().set({filename : "파일명.pdf"}).from(html).save()
                    }
                  }}
            />

            <button
                className="btn"
                onClick={() => {
                    html2canvas(printComponent.current).then((canvas) => {
                        const imgFile = canvas.toDataURL("image/jpeg");
                        // png로 바꾸면 png로 됨
                        const imgName = "download";

                        FileSaver.saveAs(imgFile, imgName);
                    });
                }}
            >
                jpg다운로드
            </button>

            {/* // A4 사이즈를 width 210 mm 를 px로 793.701px 이다 */}
            <div ref={printComponent} style={{ width: "210mm"}}>

                프린트 될 내용 입니다.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            </div>
        </div>
    );
}

export default PrintPage;
