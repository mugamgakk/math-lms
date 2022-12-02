import create from "zustand";

const attendanceStore = create((set) => ({
    copyData : [],
    getCopyData : (param)=> set (state=> ({copyData : param})),
    changeCopyData : ({index, value, 속성})=> {
        return set (state=> {

            state.copyData[index][속성] = value;

           return ({copyData :state.copyData})
        })
    }
}));

export default attendanceStore;
