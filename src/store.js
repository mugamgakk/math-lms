import { configureStore } from '@reduxjs/toolkit'
import studentsListSlice from './feature/studentsListSlice'
import studentsAttendance from './feature/studentsAttendance'

const store = configureStore({
  reducer: {
    studentList : studentsListSlice,
    studentsAttendance : studentsAttendance
  },
})

export default store