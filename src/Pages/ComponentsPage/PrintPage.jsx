import * as React from "react";
import ReactToPrint from 'react-to-print'; // pdf, 인쇄



function PrintPage() {

    // 인쇄될 컴포넌트를 가져온다
    const printComponent = React.useRef();

    return ( 
        <div style={{marginTop : "100px"}}>
                <h2>Pdf 만들기</h2>
                <ReactToPrint
                    trigger={() => <button className="btn">프린트 버튼</button>} //  trigger : 인쇄를 명령할 컴포넌트를 넣어주기
                    content={() => printComponent.current} // content : 인쇄 대상 ref를 넘겨주기
                    // documentTitle= "pdf이름" //pdf 로 저장할때 이름
                />

            {/* // A4 사이즈를 width 210 mm 를 px로 793.701px 이다 */}
                <div ref={printComponent} style={{width : "793.701px"}}>
                    인쇄나 pdf로 만들 요소
                </div>

            </div>
     );
}

export default PrintPage;