import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const studentsListSlice = createSlice({
  name: 'studentsList',
  initialState: {
    user: [],
    clickStudent : {name : '', age : ''}
  },
  reducers: {
    setStudentsList: (state, action) => {
      state.user = [...action.payload]
    },
    setClickStudent : (state,action)=>{
        state.clickStudent = {...action.payload}
    }
  },
})

export const { setStudentsList, setClickStudent } = studentsListSlice.actions

export const getStudentsList = (amount) => async (dispatch) => {

    let res = await axios.get("/detail-class/user");

    dispatch(setStudentsList(res.data))
}

// export const setClickStudent = (amount) => async(dispatch)=>{
//   console.log(amount)
//   let res = await axios.post("/detail-class/class", amount);

// }

export default studentsListSlice.reducer