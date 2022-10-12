import create from "zustand";

const useLbtStore = create((set) => ({
    lbtData: [],
    createLbtInfo: { name: "", ele: "", day: "", book: [] },
    createLbtData: [
        { option: "교재 학습 분석", optionItem: [] },
        { option: "플러스 학습 분석", optionItem: [] },
        { option: "평가 분석", optionItem: [] },
        { option: "학습 태도 분석", optionItem: [] },
        { option: "선생님의견", optionItem: [] },
    ],
    getLbtData: () =>
        set((state) => {
            // 비동기 통신
            const data = [
                {
                    info: {
                        id: 1,
                        date: "2021 06 01 ~ 2021 06 30",
                        makeDay: "2021-07-02",
                        book: "중 2-1 노벰, 중2-2 엑사스",
                        maker: "김교사",
                    },
                    data: [
                        { option: "교재 학습 분석", optionItem: [] },
                        { option: "플러스 학습 분석", optionItem: [] },
                        { option: "평가 분석", optionItem: [] },
                        { option: "학습 태도 분석", optionItem: [] },
                        { option: "선생님의견", optionItem: [] },
                    ],
                },
            ];

            return { lbtData: data };
        }),
    removeLbtData: (param) =>
        set((state) => {
            return { lbtData: param };
        }),
    setCreateInfo: (param) =>
        set((state) => {
            return { createLbtInfo: param };
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
    createData: (param) =>
        set((state) => {
            let id = 0;

            state.lbtData.forEach((a) => {
                if (a.info.id > id) {
                    id = a.info.id;
                }
            });

            id += 1;

            const data = {
                info: {
                    id: id,
                    date: state.createLbtInfo.day,
                    makeDay: "2022.22.22",
                    book: state.createLbtInfo.book.join(","),
                    maker: "강호동",
                },
                data: state.createLbtData,
            };

            let copy = [...state.lbtData, data];
            // console.log("@@@@@@@@@@@", copy);

            return { lbtData: copy };
        }),
}));

export default useLbtStore;
