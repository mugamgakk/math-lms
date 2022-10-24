import create from "zustand";
import axios from "axios";
import dayjs from "dayjs";

const useLbtStore = create((set) => ({
    lbtData: [],
    createLbtInfo: { name: "", age: "", date: "", book: [], maker: "김교사", capus: "대치 캠퍼스" },
    createLbtData: [
        { option: "교재 학습 분석", optionItem: [] },
        { option: "플러스 학습 분석", optionItem: [] },
        { option: "평가 분석", optionItem: [] },
        { option: "학습 태도 분석", optionItem: [] },
        { option: "선생님의견", optionItem: [] },
    ],
    skeleton: true,
    getLbtData: async () => {
        let res = await axios.post("http://192.168.21.109:8080/lbt/list");

        set({ lbtData: res.data.list, skeleton: false });
    },

    setCreateInfo: (param) =>
        set((state) => {
            return { createLbtInfo: { ...state.createLbtInfo, ...param } };
        }),
    setCreateData: (param) =>
        set((state) => {
            let copy = [...state.createLbtData];

            copy.forEach((a) => {
                if (a.option === param.option) {
                    a.optionItem = param.optionItem;
                }
            });
            return { createLbtData: copy };
        }),
    createData: async (param) =>
        set((state) => {
            let obj = {
                info: state.createLbtInfo,
                data: state.createLbtData,
            };
            obj.info.makeDay = dayjs(new Date()).format("YYYY-MM-DD");

            axios.post("http://192.168.21.109:8080/lbt", obj);

            return { lbtData: [...state.lbtData, obj] };
        }),
}));

export default useLbtStore;
