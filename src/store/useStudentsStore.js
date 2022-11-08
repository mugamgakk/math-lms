import create from 'zustand'
import ajax from '../ajax'
import { arrSort } from '../methods/methods'


const useStudentsStore = create(set=>({
    user: [],
    clickStudent : null,
    classList : [],
    bookList : [],
    setBookList  : (param)=> set(state=> ({bookList : param})),
    getStudentsData : async (classCd, queryStr)=>{
      // 리스트 가져오기
      
      const url = "/class_st.php"
      const data = {
        mode: "student_list",
        class_cd : classCd,
        qstr : queryStr
      }

      const res = await ajax(url, {data});

      // if(res.data.ok === 0){
      //   localStorage.removeItem("isLogin")
      //   window.location = "/login"
      // }

      const {class_list , student_list} = res.data;

      return set (state=> ({user : arrSort(student_list, "um_nm"), classList : class_list}))
    },
    setClickStudent : (payload)=> set (state=> ({clickStudent : payload})),
    resetStudent : ()=> set (state=> ({clickStudent : null}) )
}))

export default useStudentsStore