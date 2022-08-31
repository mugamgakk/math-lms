import { createSlice } from '@reduxjs/toolkit';

export const studentsListSlice = createSlice({
  name: 'studentsList',
  initialState: {
    lastDay : null,
    startDay : null,
    subjectArr : null,
    교재학습분석 : [],
    플러스학습분석 : [],
    평가분석 : [],
    학습태도분석 : [],
    선생님의견 : [],
  },
  reducers: {
    setLbtOption : (state, action)=>{
      let {lastDay, startDay, subjectArr} = action.payload;

      state.lastDay = lastDay;
      state.startDay = startDay;
      state.subjectArr = subjectArr;

    },
    choiceLbt : (state, action)=>{

      let name = action.payload.name.replace(/\s/g, '');

      state[name] = action.payload.arr

    }
  },
})

export const { setLbtOption, choiceLbt } = studentsListSlice.actions


export default studentsListSlice.reducer