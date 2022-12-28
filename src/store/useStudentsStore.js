import create from 'zustand'
import ajax from '../ajax'
import { arrSort } from '../methods/methods'


const useStudentsStore = create(set=>({
    // 학생 리스트
    user: [],
    // 선택된 학생 리스트
    clickStudent : null,
    // 교재 6종 
    bookList : {},
    // 교재 6종 선택
    setBookList  : (param)=> set(state=> ({bookList : param})),
    getStudentsData : async ({grade, classOption, nameSearch})=>{
      // 리스트 가져오기
      
      const url = "/class_st.php"
      const data = {
        mode: "student_list",
        class_cd : classOption,
        qstr : nameSearch,
        qgrd : grade
      }

      console.log(data);

      const res = await ajax(url, {data});
      // console.log(res);

      const {student_list} = res.data;

      return set (state=> ({user : arrSort(student_list, "um_nm")}))
    },
    setClickStudent : (payload)=> set (state=> ({clickStudent : payload})),
    resetStudent : ()=> set (state=> ({clickStudent : null}) )
}))

export default useStudentsStore