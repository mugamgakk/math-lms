import create from "zustand";


let list = [
   {
      no : 1,
      target : '전체',
      title : '2020년 기출 문제',
      badge : '필독',
      file: true,
      writer: 'GNB패럴랙스',
      date: '2021.08.01',
      view: 1234,
      
   },
   {
      no : 2,
      target : '중등',
      title : '2021년 2학기 일정 공지',
      badge : '공지',
      file: true,
      writer: 'GNB패럴랙스',
      date: '2021.08.01',
      view: 1234,
   },
   {
      no : 3,
      target : '초등',
      title : '2021년 여름방학 이벤트',
      badge : '이벤트',
      file: true,
      writer: 'GNB패럴랙스',
      date: '2021.08.01',
      view: 1234,
   },
   {
      no : 4,
      target : '전체',
      title : '2021년 여름방학 이벤트',
      badge : false,
      file: false,
      writer: 'GNB패럴랙스',
      date: '2021.08.01',
      view: 1234,
   },
 
]


const useReferenceStore= create(set =>({
    list : list,
    reCreateData : null,
    reCreateFunc: (payLoad) => {
      set(state=>{
        return({ reCreateData : payLoad }) 
      })
    },  
}))


export default useReferenceStore;