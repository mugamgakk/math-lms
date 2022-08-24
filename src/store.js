import { configureStore } from '@reduxjs/toolkit'
import studentsListSlice from './feature/studentsListSlice'
import studentsAttendance from './feature/studentsAttendance'
import plusLearningSlice from './feature/plusLearningSlice'
import loginSlice from './feature/loginSlice'

const store = configureStore({
  reducer: {
    studentList : studentsListSlice,
    studentsAttendance : studentsAttendance,
    loginSlice,
    plusLearningSlice
  },
})

export default store