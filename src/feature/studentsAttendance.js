import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const studentsAttendance = createSlice({
  name: 'studentsAttendance',
  initialState: {
    attendanceList: [
      { id : 1, name: "강수학(kangsh)", 사유: "@@@@@@@" },
      { id : 2, name: "강시후(kshhhh)", 사유: "@@@@@@@" },
      { id : 3, name: "김민찬(minck)", 사유: "@@@@@@@" },
      { id : 4, name: "박연아(parkya)", 사유: "@@@@@@@" },
      { id : 5, name: "오지연(yonnii)", 사유: "@@@@@@@" }
  ]
  },
  reducers: {
    attendanceAmount: (state, action) => {
        state.attendanceList = [...action.payload]
    },
    saveInput : (state, action)=>{

      let {value , index} = action.payload

      state.attendanceList[index].사유 = value

    } 
  },
})

export const { attendanceAmount, saveInput } = studentsAttendance.actions


export default studentsAttendance.reducer