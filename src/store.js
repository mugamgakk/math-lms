import { configureStore } from '@reduxjs/toolkit'
import studentsListSlice from './feature/studentsListSlice'
import studentsAttendance from './feature/studentsAttendance'
import loginSlice from './feature/loginSlice'
import todayClassListSlice from './feature/todayClassListSlice'

const store = configureStore({
  reducer: {
    studentList : studentsListSlice,
    studentsAttendance : studentsAttendance,
    todayClassList : todayClassListSlice,
    loginSlice,
  },
})

export default store