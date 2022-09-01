import create from 'zustand'

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
        if(payload === ""){
            return ({user : user})
        }
       return ({user : state.user.filter(a=> a.name === payload )})
    }),
    choice : (payload)=> set (state=> ({choiceUser : payload}) )
}))

export default useReservationStore