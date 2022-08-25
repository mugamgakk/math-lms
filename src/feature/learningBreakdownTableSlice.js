import { createSlice } from '@reduxjs/toolkit'

export const learningBreakdownTable = createSlice({
  name: 'students',
  initialState: {
    value: 0,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { incrementByAmount } = learningBreakdownTable.actions

export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount))
    }, 1000)
}

export default learningBreakdownTable.reducer