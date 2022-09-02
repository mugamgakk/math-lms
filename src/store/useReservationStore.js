import create from 'zustand'
import dayjs from 'dayjs'

var user = [
    {name : "김일우", date : "2022.09.08.14:00", phone : "010-1243-2341"},
    {name : "김이우", date : "2022.06.08.14:00", phone : "010-1243-2341"},
    {name : "김삼우", date : "2022.02.08.14:00", phone : "010-1243-2341"},
    {name : "김사우", date : "2022.04.08.14:00", phone : "010-1243-2341"},
    {name : "김오우", date : "2022.01.08.14:00", phone : "010-1243-2341"},
    {name : "김육우", date : "2022.07.08.14:00", phone : "010-1243-2341"},
]

const useReservationStore = create(set=>({
    user: user,
    choiceUser : null,
    findUser : (payload)=> set (state=> {

        let {start, end, text} = payload;

        if(text === ""){
                return ({user : user})
        }

        text = new RegExp(text);

        const result = user.filter(a=>{
            return ( 
                start < dayjs(a.date) && //시작날싸 
                dayjs(a.date) < end && //끝 날짜
                text.test(a.name) // 이름
                )
        })


            return ({user : result})

    }),
    choice : (payload)=> set (state=> ({choiceUser : payload}) )
}))

export default useReservationStore