import {
  createSlice
} from '@reduxjs/toolkit'

export const plusLearningSlice = createSlice({
  name: 'students',
  initialState: {
    user: [{
        id: 1,
        name: '강호동',
        age: '중2',
        nickName: 'kangsh',
        반이름: '중등 월화수 A'
      },
      {
        id: 2,
        name: '이수근',
        age: '중3',
        nickName: 'sugumn',
        반이름: '중등 월화수 B'
      },
      {
        id: 3,
        name: '유재석',
        age: '중1',
        nickName: 'jesuck',
        반이름: '중등 월화수 B'
      },
      {
        id: 4,
        name: '김민수',
        age: '중2',
        nickName: 'jesuck',
        반이름: '중등 월화수 A'
      },
      {
        id: 5,
        name: '박명수',
        age: '중2',
        nickName: 'jesuck',
        반이름: '중등 월화수 B'
      },
      {
        id: 6,
        name: '이용진',
        age: '중1',
        nickName: 'jesuck',
        반이름: '중등 월화수 A'
      }
    ],
    clickStudent: null,
    score: [1, 1.5, 0.5],
    upAllScore: 3
  },
  reducers: {
    setClickStudent : (state, action)=>{
      
      state.clickStudent = action.payload;
    },
    updateScore: (state, action) => {
      let {
        index,
        score
      } = action.payload

      state.score[index] = score;

      let allScore = 0;

      state.score.forEach(a => {
        allScore += a
      })

      state.upAllScore = allScore

    },
  },
})

export const {
  updateScore,
  setClickStudent
} = plusLearningSlice.actions



export default plusLearningSlice.reducer