import {
  createSlice
} from '@reduxjs/toolkit'

export const plusLearningSlice = createSlice({
  name: 'students',
  initialState: {
    clickStudent: null,
    score: [1, 1.5, 0.5],
    upAllScore: 3
  },
  reducers: {
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