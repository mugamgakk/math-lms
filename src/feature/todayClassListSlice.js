
import { createSlice } from '@reduxjs/toolkit'

export const todayClassListSlice = createSlice({
  name: 'todayClassList',
  initialState: {
    todayClassList: [
      {
        id : 1,
        name : '강수학',
        nickName : 'kangsh',
        thum : null,
        book : '중1-1 아르케 1',
        class : '1-2. (진분수) ÷ (자연수)',
        state1 : '100%',
        state2 : '25/30',
        state3 : 'all',
        state4 : null,
        state5 : null,
    },
    {
        id : 2,
        name : '강시후',
        nickName : 'kshhhh',
        thum : null,
        book : '중1-1 뜨레스',
        class : 'ㅣ-3. (가분수) ÷ (자연수)',
        state1 : '100%',
        state2 : '10/12',
        state3 : null,
        state4 : 25/25,
        state5 : 'Pass',
    },
    {
        id : 3,
        name : '김민찬',
        nickName : 'minck',
        thum : null,
        class : '중2-2 엑사스',
        book : 'Ⅱ-3. 공배수와 최소공배수',
        state1 : '33%',
        state2 : '-/12',
        state3 : null,
    },
    ]
  },
  reducers: {
    setTodayClassList: (state, action) => {
      state.user = [...action.payload]
    },
  },
})

export const {setTodayClassList} = todayClassListSlice.actions

export default todayClassListSlice.reducer