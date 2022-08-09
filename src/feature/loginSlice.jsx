import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    userId: '',
    userPassward : ''
  },
  reducers: {
    setUserId: (state, action) => {

        let {userId, userPassward} = state

        state.userId = action.payload.userId
        state.userPassward = action.payload.userPw

        console.log(state.userId)

    },
  },
})

export const { setUserId } = loginSlice.actions

export const logintAsync = (amount) => (dispatch) => {

    axios.post('/login', amount)
    .then((res)=>{
        //  맞다면

        if(res.status === 200){
            dispatch(setUserId(amount))
        }

    })

}

export default loginSlice.reducer