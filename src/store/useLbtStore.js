import create from 'zustand'

const useLbtStore = create(set=>({
    lbtData: [],
    createLbtInfo : {name : "", ele : "", day : "", book : []},
    createLbtData : [
        {option: "교재 학습 분석", optionItem : []},
        {option: "플러스 학습 분석", optionItem : []},
        {option: "평가 분석", optionItem : []},
        {option: "학습 태도 분석", optionItem : []},
        {option: "선생님의견", optionItem : []},
],
    getLbtData : ()=> set (state=> {

        // 비동기 통신
        const data = [
            {id : 1 , date : "2021 06 01 ~ 2021 06 30", makeDay : "2021-07-02", book : "중 2-1 노벰, 중2-2 엑사스", maker : "김교사"},
            {id : 2 , date : "2021-05 01 ~ 2021 05 31", makeDay : "2021-06-03", book : "중2 1 노벰 , 중 2 2 엑사스", maker : "김교사"},
            {id : 3 , date : "2021-04 01 ~ 2021 04 30", makeDay : "2021 04 30", book : "중2 1 엑사스 , 중 2 1 노벰", maker : "김교사"},
            {id : 4 , date : "2021 03 01 ~ 2021 03 31", makeDay : "2021 04 01", book : "중2 1 엑사스", maker : "김교사"},
            {id : 5 , date : "2021 02 01 ~ 2021 02 28", makeDay : "2021 03 02 중", book : "중2 1 아르케 3, 중 2 1 뜨레스 , 중 2 1 엑사스", maker : "김교사"},
        ];


        return ({lbtData : data})
    }),
    removeLbtData : (param)=>set (state=>{
        return ({lbtData : param})
    }),
    setCreateInfo : (param)=>set (state=>{
        return ({createLbtInfo : param})
    }),
    setCreateData : (param)=>set (state=>{

        let copy = [...state.createLbtData]

        copy.forEach(a=>{
            if(a.option === param.option){
                a.optionItem = param.optionItem
            }
        })
        return ({createLbtData : copy})
    }),
}))

export default useLbtStore