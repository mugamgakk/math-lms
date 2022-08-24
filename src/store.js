import { configureStore } from '@reduxjs/toolkit'
import studentsListSlice from './feature/studentsListSlice'
import studentsAttendance from './feature/studentsAttendance'
import plusLearningSlice from './feature/plusLearningSlice'
import loginSlice from './feature/loginSlice'
import todayClassListSlice from './feature/todayClassListSlice'

const store = configureStore({
  reducer: {
    studentList : studentsListSlice,
    studentsAttendance : studentsAttendance,
    todayClassList : todayClassListSlice,
    loginSlice,
    plusLearningSlice
  },
})

export default store