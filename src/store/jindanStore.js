import create from "zustand";

const jindanStore = create((set) => ({
    jindanStudent: null,
    setJindanStudent: (param) => set((state) => ({ jindanStudent: param })),
    resetJindan: () => set(() => ({ jindanStudent: null })),
}));

export default jindanStore;
