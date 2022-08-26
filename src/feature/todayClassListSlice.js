
import { createSlice } from '@reduxjs/toolkit'

const todayClassList = createSlice({
  name: 'todayClassList',
  initialState: [
    {
      id : 2,
      name : '김민찬',
      nickName : 'minck',
      thum : null,
      book : [
        {
          bookTit : '중1-1 뜨레스',
          className : [
          {
            tit: '11-3. 정수와 유리수의 곱셈',
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
            tit: 'Ⅱ-4. 정수와 유리수의 나눗셈',
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
        ]
        },
        {
          bookTit : '중1-1 아르케 1',
          className : [
          {
            tit: '11-3. 정수와 유리수의 곱셈',
            state1 : '55%',
            state2 : '4/12',
            state3 : {
              assessment : true,
              uds : 5,
              send : 10
            },
            state4 : '5/25',
            state5 : '-/4',
            sodanwon: '3.소인수분해',
          },
        ]
        },
    ]
  },
  //   {
  //     id : 2,
  //     name : 'asdf',
  //     nickName : 'minck',
  //     thum : null,
  //     book : [
  //       {
  //         bookTit : '중1-1 아르케 1',
  //         className : [
  //         {
  //           tit: '11-3. 정수와 유리수의 곱셈',
  //           state1 : '55%',
  //           state2 : '4/12',
  //           state3 : {
  //             assessment : true,
  //             uds : 5,
  //             send : 10
  //           },
  //           state4 : '5/25',
  //           state5 : '-/4',
  //           sodanwon: '3.소인수분해',
  //         },
  //       ]
  //       },
  //   ]
  // },
  ]
})

export default todayClassList.reducer;