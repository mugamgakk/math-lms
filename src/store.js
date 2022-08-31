import { configureStore } from '@reduxjs/toolkit'
import studentsListSlice from './feature/studentsListSlice'
import plusLearningSlice from './feature/plusLearningSlice'
import loginSlice from './feature/loginSlice'
import todayClassListSlice from './feature/todayClassListSlice'
import attendanceSlice from './feature/attendanceSlice'
import studentsSearchSlice from './feature/studentsSearchSlice'

const store = configureStore({
  reducer: {
    studentList : studentsListSlice,
    todayClassList : todayClassListSlice,
    loginSlice,
    plusLearningSlice,
    attendanceSlice,
    studentsSearchSlice : studentsSearchSlice
  },
})

export default store