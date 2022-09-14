import create from "zustand";


let data = [
  {
     id : 0, 
     deadanwon : 'I. 수와 연산',
     sodanwon : '1. 소인수분해',
     keyword : '소수와 합성수',
     class : '개념서',
     num : 3,
     answer : '객관식',
     level : '중하'
  },
  {
     id : 1, 
     deadanwon : 'I. 수와 연산',
     sodanwon : '1. 소인수분해',
     keyword : '소인수분해',
     class : '뜨레스',
     num : 10,
     answer : '객관식',
     level : '중상'
  },
  {
     id : 2, 
     deadanwon : 'I. 수와 연산',
     sodanwon : '3. 최소공배수와 그 활용',
     keyword : '최소공배수의 활용',
     class : '뜨레스',
     num : 7,
     answer : '주관식',
     level : '중'
  },
  {
     id : 3, 
     deadanwon : 'I. 수와 연산',
     sodanwon : '2. 최대공약수와 그 활용',
     keyword : '최소공배수 구하기',
     class : '개념서',
     num : 5,
     answer : '객관식',
     level : '하'
  },
]

const useCreationModal = create(set =>({
    data : data,
    reCreateData : null,
    reCreateFunc: (payLoad) => {
      set(state=>{
        return({ reCreateData : payLoad }) 
      })
    },
     
}))

export default useCreationModal;