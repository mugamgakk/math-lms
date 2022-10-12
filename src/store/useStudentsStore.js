import create from 'zustand'
import ajax from '../ajax'
import { arrSort } from '../methods/methods'


const useStudentsStore = create(set=>({
    user: [],
    clickStudent : null,
    classList : [],
    getStudentsData : async (classCd, queryStr)=>{

      const url = "/class_st.php/?mode=student_list"
      const param = {
        class_cd : classCd,
        qstr : queryStr
      }

      const res = await ajax(url,param);

      if(res.data.ok === 0){
        localStorage.removeItem("lmsLogin")
        window.location = "/login"
      }

      console.log(res)

      const {class_list , student_list} = res.data;

      return set (state=> ({user : arrSort(student_list, "um_nm"), classList : class_list}))
    },
    setClickStudent : (payload)=> set (state=> ({clickStudent : payload})),
    resetStudent : ()=> set (state=> ({clickStudent : null}) )
}))

export default useStudentsStore