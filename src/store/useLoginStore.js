import create from 'zustand'

const useLoginStore = create(set=>({
    user_id: "",
    getUserId : (param)=> set (state=> {
        return ({user_id : param})
    })
}))

export default useLoginStore 