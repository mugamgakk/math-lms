import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const studentsListSlice = createSlice({
  name: 'studentsList',
  initialState: {
    user: [],
    clickStudent : null,
    lastDay : null,
    startDay : null,
    subjectArr : null,
    교재학습분석 :  ['단원 학습 현황', '단원별 정답률 및 향상도/수행평가', '행동 영역 분석', '내용 영역 분석'],
    플러스학습분석 : ['서술형 따라잡기', '교과서별 내신적중'],
    평가분석 : ['단원평가 분석', '총괄평가 분석'],
    학습태도분석 : ['학원 출경 상황', '온라인 학습 분석', '획득한 학습 포인트', '학습 태도 평가'],
    선생님의견 : ['123']
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
    },
    setLbtOption : (state, action)=>{
      let {lastDay, startDay, subjectArr} = action.payload;

      state.lastDay = lastDay;
      state.startDay = startDay;
      state.subjectArr = subjectArr;

    },
    choiceLbt : (state, action)=>{

      let name = action.payload.name.replace(/\s/g, '');

      state[name] = action.payload.arr

      // console.log(action.payload)
      // state.종합학습분석표 = action.payload
    }
  },
})

export const { setStudentsList, setClickStudent, setLbtOption, choiceLbt } = studentsListSlice.actions


// export const setClickStudent = (amount) => async(dispatch)=>{
//   console.log(amount)
//   let res = await axios.post("/detail-class/class", amount);

// }

export default studentsListSlice.reducer