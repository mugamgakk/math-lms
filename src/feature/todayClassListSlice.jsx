
import { createSlice } from '@reduxjs/toolkit'

const todayClassList = createSlice({
  name: 'todayClassList',
  initialState: [
    {
      id : 0,
      name : '강수학',
      nickName : 'kangsh',
      thum : null,
      book : '중1-1 아르케 1',
      class : '1-2. (진분수) ÷ (자연수)',
      state1 : '100%',
      state2 : '25/30',
      state3 : undefined,
      state4 : undefined,
      state5 : null,
      sodanwon: '1.소인수분해',
  },
  {
      id : 1,
      name : '강시후',
      nickName : 'kshhhh',
      thum : null,
      book : '중1-1 뜨레스',
      class : 'ㅣ-3. (가분수) ÷ (자연수)',
      state1 : '100%',
      state2 : '10/12',
      state3 : {
        assessment : false,
        newplay : true,
      },
      state4 : '25/25',
      state5 : 'Pass',
      sodanwon: '2.소인수분해',
      
  },
  {
      id : 2,
      name : '김민찬',
      nickName : 'minck',
      thum : null,
      book : '중2-2 엑사스',
      class : 'Ⅱ-3. 공배수와 최소공배수',
      state1 : '33%',
      state2 : '-/12',
      state3 : {
        assessment : true,
        uds : 5,
        send : 10
      },
      state4 : '5/25',
      state5 : '-/4',
      sodanwon: '3.소인수분해',

  },
  {
      id : 3,
      name : '김민찬',
      nickName : 'minck',
      thum : null,
      class : '중2-2 엑사스',
      book : 'Ⅱ-3. 공배수와 최소공배수',
      state1 : undefined,
      state2 : undefined,
      state3 : {
        assessment : true,
        uds : 5,
        send : 10
      },
      state4 : '5/25',
      state5 : null,
      sodanwon: '5.소인수분해',

  },
  ]
})

export default todayClassList.reducer;