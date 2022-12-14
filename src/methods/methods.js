import FileSaver from "file-saver";
import JSZip from "jszip";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import ajax from "../ajax";

export const fetchData = async (url, param) => {
    // console.log(param);
    let res = await ajax("/" + url + ".php", { data: param });
    return res.data;
};

export function toggleBodyScroll(param) {
    if (param === true) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "unset";
    }
}

export function falseModal(e, target) {
    if (e.target === e.currentTarget) {
        var 변경 = target;
        변경(false);
    }
}

export function getBase64(param) {
    return new Promise((resolve) => {
        if (typeof param === "string") {
            resolve(btoa(param));
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(param);
            fileReader.onload = function (e) {
                resolve(e.target.result);
            };
        }
    });
}

export const _isScroll = (dom = "d", maxHeight)=>{
    let TR = document.querySelectorAll("." + dom + " tbody>tr");

    let height = 0;
    for(let ele of TR){
        height += ele.clientHeight
    }

    if(maxHeight <= height){
        return true
    }else{
        return false
    }
}

function weekChange(param) {
    switch (param) {
        case 0:
            return "일";
        case 1:
            return "월";
        case 2:
            return "화";
        case 3:
            return "수";
        case 4:
            return "목";
        case 5:
            return "금";
        case 6:
            return "토";
    }
}

// 용량 체크 함수
// KB는 1,024Byte이고, MB는 1,024KB 임
const getByteSize = (size) => {
    // 파라미터에는 파일 사이즈

    const byteUnits = ["kb", "mb"];

    for (let i = 0; i < byteUnits.length; i++) {
        size = size / 1024;

        if (size < 1024) return size.toFixed(1) + byteUnits[i];
    }
};

//  파일 한개를 파라미터로 넣어서 다운로드한다.
//  두번째 파라미터로 파일명을 지정한다 (기본값 : 원본 파일명)

// * 첨부파일 다운로드 시 탐색기 팝업 , 경로 지정 가능하도록 함  => 보안상 디렉토리 지정을 못함

const fileDown = (file, fileName = file.originalFileName) => {
    // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob, fileName)
    FileSaver.saveAs(file, fileName);
    // FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
};

// zip 만들어주는 함수
// 파라미터로 파일들이 들어있는 배열을 넣는다
// 두번째 파라미터로 파일명을 지정한다 (기본값 : download)
const makeZip = (filesArr, fileName = "download") => {
    if (filesArr.length === 0) {
        return;
    }

    const zip = new JSZip();

    filesArr.forEach((ele) => {
        zip.file(ele.name, ele, { binary: true });
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
        FileSaver.saveAs(content, fileName);
    });
};

// 가나다 순 정렬
// 1. 첫번째 파라미터 배열넣기
// 2. 두번째 파라미터 배열이 오브젝트일시 key 값을 넣음
const arrSort = (arr, key = undefined, order = -1) => {
    let copy = [...arr];

    if (typeof copy[0] === "object") {
        copy.sort((a, b) => {
            if (a[key] < b[key]) {
                return order === -1 ? -1 : 1;
            } else {
                return order === -1 ? 1 : -1;
            }
        });
    } else {
        copy.sort((a, b) => {
            if (a < b) {
                return order === -1 ? -1 : 1;
            } else {
                return order === -1 ? 1 : -1;
            }
        });
    }

    return copy;
};

// 숫자에 콤마 넣어주는 함수
const comma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getUrlFileSize = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.blob();
        const ext = url.split(".").pop();
        const filename = url.split("/").pop();
        const metadata = { type: `image/${ext}` };
        const size = new File([data], filename, metadata).size;
        return size;
    } catch (err) {
        console.log("cors 에러");
        return 0;
    }
};

// jpg다운로드 (display none 일때는 안됨)
export function htmlToImg(target, filName = "download", format = "jpeg") {
    html2canvas(target).then((canvas) => {
        const imgFile = canvas.toDataURL("image/" + format);
        // png로 바꾸면 png로 됨
        const imgName = filName;
        
        console.log(imgFile)

        FileSaver.saveAs(imgFile, imgName);
    });
}

export async function htmlToPdf(target){
    // 저장
    // html2pdf().from(target).save();

    // data URI
    let pdfAsString = await html2pdf().from(target).toPdf().output('datauristring');
    
    let result = pdfAsString.replace(/filename=generated.pdf;/, "");

    return result

    // base64
    html2pdf().from(target).outputPdf().then(function(pdf) {
    // This logs the right base64
    // console.log(pdf);
        // console.log(btoa(pdf))
        // console.log(btoa(pdf));
    });


    // html2pdf().from(target).outputImg()
    // .then(data=>{
    //     console.log(data.src)
    // })

}

export function _map(list, fn) {
    const arr = [];

    _each(list, function (ele, i) {
        arr.push(fn(ele, i));
    });

    return arr;
}

export function _filter(list, fn) {
    const arr = [];

    _each(list, function (ele, i) {
        if (fn(ele, i)) {
            arr.push(ele);
        }
    });

    return arr;
}

export function _each(list, fn) {
    for (var i = 0; i < list.length; i++) {
        fn(list[i], i);
    }

    return list;
}

export function _remove(list, obj) {
    var key = Object.keys(obj)[0];
    var value = Object.values(obj)[0];

    var arr = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i][key] !== value) {
            arr.push(list[i]);
        }
    }

    return arr;
}

export function _cloneDeep(list) {
    let arr = [];

    list.forEach((a) => {
        arr.push({ ...a });
    });

    return arr;
}

export { weekChange, getByteSize, fileDown, makeZip, arrSort, comma };
