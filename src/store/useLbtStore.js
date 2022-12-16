import create from "zustand";
import { _cloneDeep } from "../methods/methods";

const dataLists = [
    {
        option: "교재 학습 분석",
        optionItem: [
            { label: "단원 학습 현황", value: "lec_stat" },
            { label: "단원별 정답률 및 향상도/수행평가", value: "lec_assa" },
            { label: "행동 영역 분석", value: "an_act" },
            { label: "내용 영역 분석", value: "an_con" },
        ],
    },
    {
        option: "플러스 학습 분석",
        optionItem: [
            { label: "서술형 따라잡기", value: "plus_ct" },
            { label: "교과서별 내신적중", value: "plus_tb" },
        ],
    },
    {
        option: "평가 분석",
        optionItem: [
            { label: "단원평가 분석", value: "an_ut" },
            { label: "총괄평가 분석", value: "an_bt" },
        ],
    },
    {
        option: "학습 태도 분석",
        optionItem: [
            { label: "학원 출결 상황", value: "attd_stat" },
            { label: "온라인 학습 분석", value: "an_online" },
            { label: "획득한 학습 포인트", value: "point" },
            { label: "학습 태도 평가", value: "attd_eval" },
        ],
    },
    {
        option: "comment",
        optionItem: [
            { label: "선생님의견", value: "tch_comm" },
            { label: "AI분석", value: "art_an" },
        ],
    },
];

const useLbtStore = create((set) => ({
    dataLists: _cloneDeep(dataLists),
    checkedList: _cloneDeep(dataLists),
    setCheckedList: ({ key, value }) => {
        return set((state) => {
            let clone = _cloneDeep(state.checkedList);

            for (let ele of clone) {
                if (ele.option === key) {
                    ele.optionItem = value;
                    break;
                }
            }
          return ({ checkedList: clone })
        });
    },
    allCheckfnL: (checked) => {
        let clone = _cloneDeep(dataLists);

        if (checked) {
            return set((state) => ({ checkedList: clone }));
        } else {
            for (let ele of clone) {
                ele.optionItem = [];
            }
            return set((state) => ({ checkedList: clone }));
        }
    },
}));

export default useLbtStore;
