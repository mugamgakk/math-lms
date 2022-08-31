import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const studentsListSlice = createSlice({
  name: 'studentsList',
  initialState: {
    user: [
      {
          id : 1,
          name : '강호동',
          age : '중2',
          nickName : 'kangsh',
          반이름 : '중등 월화수 A',
          교재 : [
            {
              이름 : '중2-1 노벰',
              대단원 : 'I. 수와 연산',
              소단원 : [
                {
                  tit : '소인수분해',
                  state1 : '100%',
                  state2 : '10/12',
                  state3 : {
                    assessment : true,
                    uds : 5,
                    newplay : true,
                    send : 10
                  },
                  state4 : 24/30,
                  state5 : 12/12,
                }
              ]
            },
          ],
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
  ],
    clickStudent : null,
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

    }
  },
})

export const { setStudentsList, setClickStudent, setLbtOption, choiceLbt } = studentsListSlice.actions


// export const setClickStudent = (amount) => async(dispatch)=>{
//   console.log(amount)
//   let res = await axios.post("/detail-class/class", amount);

// }

export default studentsListSlice.reducer