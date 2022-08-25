import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const studentsListSlice = createSlice({
  name: 'studentsList',
  initialState: {
    user: [],
    clickStudent : null,
  },
  reducers: {
    setStudentsList: (state, action) => {
      const user = [
        {
            id : 1,
            name : '강호동',
            age : '중2',
            nickName : 'kangsh',
            반이름 : '중등 월화수 A'
        },
        {
            id : 2,
            name : '이수근',
            age : '중3',
            nickName : 'sugumn',
            반이름 : '중등 월화수 B'
        },
        {
            id : 3,
            name : '유재석',
            age : '중1',
            nickName : 'jesuck',
            반이름 : '중등 월화수 B'
        },
        {
            id : 4,
            name : '김민수',
            age : '중2',
            nickName : 'jesuck',
            반이름 : '중등 월화수 A'
        },
        {
            id : 5,
            name : '박명수',
            age : '중2',
            nickName : 'jesuck',
            반이름 : '중등 월화수 B'
        },
        {
            id : 6,
            name : '이용진',
            age : '중1',
            nickName : 'jesuck',
            반이름 : '중등 월화수 A'
        }
    ]


      state.user = [...user]
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