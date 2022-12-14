// 이미지 사이즈를 얻는 함수
export const getImgSize = (param) => {
    let img = new Image();
    img.src = param;

    return new Promise((resolve) => {
        // 이미지가 로드 되었을때
        img.addEventListener("load", function () {
            if (img.height < 10) {
                resolve( {width : img.width, height : 20} );
            } else {
                resolve({width : img.width, height : img.height});
            }
        });
        // 이미지가 문제가 있어 로드가 되지않았을때
        img.addEventListener("error", function () {
            resolve("imgerr");
        });
    });
};

// 넓이 x에 따라 이미지 높이값을 리턴한다.
export const proportionHeight = (width, height, x) => {
    return (height * x) / width;
};

// 문제의 총 높이 값을 구하는 함수
// (넓이값에 따른 높이 구하기)
export const getProblemHeight = async (list, 최대넓이, 초기값 = 0) => {
    let arr = [];

    for (let i = 0; i < list.length; i++) {
        // 초기값은 문제당 여유분 여백과 높이값을 제외한 마진값이다.
        list[i].height = 초기값;

        let res = await getImgSize(list[i].qa_path);

        if(res === "imgerr"){
            list[i].height += 22;
            list[i].문제높이 = 22;
        }else{
            // 비율에 맞춘 높이값
            let problemHeight = proportionHeight(res.width, res.height, 최대넓이);

            list[i].height += problemHeight;
            list[i].문제높이 = problemHeight;
        }

        for (let p = 1; p <= 5; p++) {
            let 선지이미지 = `https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${list[i].qa_code}_${p}.png`;

            let res = await getImgSize(선지이미지);

            if(res === "imgerr"){
                list[i].height += 22;
                list[i][`문제높이${p}`] = 22;
            }else{
                // 비율에 맞춘 높이값
                let problemHeight = proportionHeight(res.width, res.height, 최대넓이);

                list[i].height += problemHeight;
                list[i][`문제높이${p}`] = problemHeight;
            }

        }

        arr.push(list[i]);

    }

    return arr;
};

export const 풀이보기높이구하기 = async (list,최대넓이, 초기값 = 0) => {
    let arr = [];

    for (let i = 0; i < list.length; i++) {
        // 초기값은 문제당 여유분 여백과 높이값을 제외한 마진값이다.
        list[i].height = 초기값;
        list[i].qa_path = "https://file.parallaxedu.com/pxm/gplum/data/M11/tres/"+ list[i].qa_code +"_S.png";

        let res = await getImgSize(list[i].qa_path);

        if(res === "imgerr"){
            list[i].height += 22;
            list[i].문제높이 = 22;
        }else{
            // 비율에 맞춘 높이값
            let problemHeight = proportionHeight(res.width, res.height, 최대넓이);

            list[i].height += problemHeight;
            list[i].문제높이 = problemHeight;
        }

        arr.push(list[i]);

    }


    return arr;
};

// 1페이지 들어갈 문제를 분할한다. limit은 한페이지의 반의 크기를 말한다.
// 초기값은 상단의 head값
export const 분할하기 = (list, 초기값 = 100, limit = 1120) => {
    let count = 0;
    let 왼쪽높이 = 초기값;
    let 오른쪽높이 = 초기값;
    let arr = [];
    let 방향 = "left"

    list.forEach(a=>{

        if(왼쪽높이 + a.height > limit){
            방향 = "right";
        }
        if(오른쪽높이 + a.height > limit){
            방향 = "left";
            // 상단 메뉴 높이 빼기
            왼쪽높이 = 초기값;
            오른쪽높이 = 초기값;
            count++
        }

        

        if(Array.isArray(arr[count])=== false){
            arr[count] = new Array();
            arr[count][0] = new Array();
            arr[count][1] = new Array();
        }

        if(방향 === "left"){
            왼쪽높이 += a.height;
            arr[count][0].push(a);
        }

        if(방향 === "right"){
            오른쪽높이 += a.height
            arr[count][1].push(a);
        }

    })


    return arr;
};
