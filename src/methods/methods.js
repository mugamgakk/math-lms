import FileSaver from "file-saver";
import JSZip from "jszip";


function weekChange(param) {
    switch (param) {
        case 0:
            return "일"
        case 1:
            return "월"
        case 2:
            return "화"
        case 3:
            return "수"
        case 4:
            return "목"
        case 5:
            return "금"
        case 6:
            return "토"
    }
}

// 용량 체크 함수
// KB는 1,024Byte이고, MB는 1,024KB 임
const getByteSize = (size) => {
    // 파라미터에는 파일 사이즈

    const byteUnits = ["kb", "mb"];

    for (let i = 0; i < byteUnits.length; i++) {
        size = (size / 1024);

        if (size < 1024) return size.toFixed(1) + byteUnits[i];
    }
};


//  파일 한개를 파라미터로 넣어서 다운로드한다.
//  두번째 파라미터로 파일명을 지정한다 (기본값 : 원본 파일명)

// * 첨부파일 다운로드 시 탐색기 팝업 , 경로 지정 가능하도록 함  => 보안상 디렉토리 지정을 못함

const fileDown = (file, fileName = file.originalFileName) => {
    // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob, fileName)
    FileSaver.saveAs(file, fileName)
}

// zip 만들어주는 함수
// 파라미터로 파일들이 들어있는 배열을 넣는다
// 두번째 파라미터로 파일명을 지정한다 (기본값 : download)
const makeZip = (filesArr, fileName = "download") => {

    if(filesArr.length === 0){
        return 
    }

    const zip = new JSZip();

    filesArr.forEach(ele => {
        zip.file(ele.name, ele, {binary: true})
    })

    zip.generateAsync({type: "blob"})
        .then(content => {
            FileSaver.saveAs(content, fileName)
        })
}



export {
    weekChange,
    getByteSize,
    fileDown,
    makeZip
}