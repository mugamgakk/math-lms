import create from "zustand";

const useTodayClassStore = create(set =>({
    students : [
        {
          id : 0,
          name : '김민찬',
          반이름: '중등 월화수 A',
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
                  newplay : true,
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
                state3 : undefined,
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
                  assessment : false,
                },
                state4 : '5/25',
                state5 : '-/4',
                sodanwon: '3.소인수분해',
              },
            ]
            },
        ]
      },
        {
          id : 1,
          name : '김수학',
          nickName : 'minck',
          반이름: '중등 월화수 B',
          thum : null,
          book : [
            {
              bookTit : '중3-1 뜨레스 1',
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
                state4 : undefined,
                state5 : undefined,
                sodanwon: '3.소인수분해',
              },
            ]
            },
            {
              bookTit : '중3-2 뜨레스 1',
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
                state4 : '-/20',
                state5 : '-',
                sodanwon: '3.소인수분해',
              },
            ]
            },
            {
              bookTit : '중3-3 뜨레스 1',
              className : [
              {
                tit: '11-3. 정수와 유리수의 뺄셈',
                state1 : '55%',
                state2 : '4/12',
                state3 : {
                  assessment : false,
                  newplay: true,
                },
                state4 : '25/25',
                state5 : 'Pass',
                sodanwon: '3.소인수분해',
              },
            ]
            },
        ]
      },
      ], // state
    inclease : (payload)=>{
        set(state=>{
            return ({count : state.count + 1})
        })
    }
}))

export default useTodayClassStore