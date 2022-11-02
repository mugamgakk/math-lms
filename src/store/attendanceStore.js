import axios from 'axios'
import create from 'zustand'

const attendanceStore = create(set=>({
    list1: [],
    initialList : [],
    getList : async ()=>{
        let res = await axios.post("http://192.168.11.178:8080/attendace/list");

        let arr = [];

        for (let ele of res.data.list) {
            arr.push({ ...ele });
        }

        return set(state=> ({initialList : arr, list1 : res.data.list}))
    },
    increasePopulation : ()=> set (state=> {

        return ({bears : state.bears + 1})
    })
}))

export default attendanceStore