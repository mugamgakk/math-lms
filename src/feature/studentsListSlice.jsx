import { createSlice } from '@reduxjs/toolkit'

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

export const getStudentsList = (amount) => (dispatch) => {

    const user = [
        {
            id : 1,
            name : '강호동',
            age : '중2',
            nickName : 'kangsh'
        },
        {
            id : 2,
            name : '이수근',
            age : '중3',
            nickName : 'sugumn'
        },
        {
            id : 3,
            name : '유재석',
            age : '중1',
            nickName : 'jesuck'
        },
        {
            id : 4,
            name : '김민수',
            age : '중2',
            nickName : 'jesuck'
        },
        {
            id : 5,
            name : '박명수',
            age : '중2',
            nickName : 'jesuck'
        },
        {
            id : 6,
            name : '이용진',
            age : '중1',
            nickName : 'jesuck'
        },
    ]

    setTimeout(() => {
      dispatch(setStudentsList(user))
    }, 1000)
}

export default studentsListSlice.reducer