function weekChange (param){
    switch(param){
        case 0 :
            return "일"
        case 1 : 
            return "월"
        case 2 : 
            return "화"
        case 3 : 
            return "수"
        case 4 : 
            return "목"
        case 5 : 
            return "금"
        case 6 : 
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


export {weekChange, getByteSize}