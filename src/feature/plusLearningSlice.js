import { createSlice } from '@reduxjs/toolkit'

export const plusLearningSlice = createSlice({
  name: 'students',
  initialState: {
    score : [1, 1.5, 0.5],
    upAllScore : 3
  },
  reducers: {
    updateScore: (state, action) => {
        let {index, score} = action.payload

        state.score[index] = score;

        let allScore = 0;

        state.score.forEach(a=>{
            allScore +=a
        })

        state.upAllScore = allScore

    },
  },
})

export const { updateScore } = plusLearningSlice.actions

// export const incrementAsync = (amount) => (dispatch) => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount))
//     }, 1000)
// }

export default plusLearningSlice.reducer