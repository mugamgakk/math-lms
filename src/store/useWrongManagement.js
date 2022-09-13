import create from "zustand";


let data = [
  {
      id : 0,
      date : '2021-07-21',
      book : '중2-1노벰',
      tit : '중2-1뜨레스_오답',
      range : ['I-2. 최대공약수','I-2. 최대공약수','I-3. 최소공배수'],
      count : 25,
      state : '학습 완료',
  },
  {
      id : 1,
      date : '2021-07-20',
      book : '중2-2뜨레스',
      tit : '중2-1노벰_강수학 오답',
      range : ['I-2. 최대공약수'],
      count : 20,
      state : '인쇄 전',
  },
  {
      id : 2,
      date : '2021-07-20',
      book : '중2-2노벰',
      tit : '중2-rlaasdf 오답',
      range : ['I-2. 최대공약수'],
      count : 11,
      state : '학습 중',
  },
  {
      id : 3,
      date : '2021-07-20',
      book : '중2-2노벰',
      tit : '중2-1노벰_강수학 오답',
      range : ['I-2. 최대공약수'],
      count : 11,
      state : '학습 중',
  },
]


const useWrongManagement = create(set =>({
    data : data,
    filterData : null,
    removeList: (payLoad,option) => {
      set(state=>{
        let afterRemoveData = state.data.filter(data => !payLoad.includes(data));
        let newData;
        if(option && option !== '전체'){
          newData = afterRemoveData.filter(data => data.book == option);
        }
        return({ data : afterRemoveData , filterData : newData }) 
      })
    },
     
}))

export default useWrongManagement