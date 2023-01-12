import create from 'zustand'

const useLoginStore = create(set=>({
    user_id: "",
    roleId : 0,
    getUserData : (userId, roleId = 0)=> set(state=> ({user_id : userId, roleId }))
}))

export default useLoginStore 