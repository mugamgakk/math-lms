import { createSlice } from '@reduxjs/toolkit'

export const attendanceSlice = createSlice({
  name: 'students',
  initialState: {
    data: [
        {id : 1, name : "강수학", userId : "kangsh",출결 : '', 사유 : "ㅁㄴㅇㅁㄴㅇㅁㄴㅇ", 반이름 : "중등 월화수 A" },
        {id : 2, name : "강시후", userId : "kshhhh",출결 : '', 사유 : "", 반이름 : "중등 월화수 A" },
        {id : 3, name : "김민찬", userId : "minck",출결 : '', 사유 : "", 반이름 : "중등 월화수 A" },
        {id : 4, name : "박연아", userId : "parkya",출결 : '', 사유 : "", 반이름 : "중등 월화수 B" },
        {id : 5, name : "오지연", userId : "yonnii",출결 : '', 사유 : "", 반이름 : "중등 월화수 B" }
    ],
  },
  reducers: {
    checkDataUpdate: (state, action) => {
       let {id, option} = action.payload

       state.data.forEach((a,i)=>{
            if(a.id === id){
                state.data[i].출결 = option
                return false ;
            }
       })

    },
    reasonDataUpdate : (state, action)=>{
        let {id, option} = action.payload;

        state.data.forEach((a,i)=>{
            if(a.id === id){
                state.data[i].사유 = option
                return false ;
            }
       })

    }
  },
})

export const { checkDataUpdate, reasonDataUpdate } = attendanceSlice.actions

// export const incrementAsync = (amount) => (dispatch) => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount))
//     }, 1000)
// }

export default attendanceSlice.reducer