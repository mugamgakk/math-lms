import create from 'zustand'

const useBearStore = create(set=>({
    bears: 0,
    increasePopulation : ()=> set (state=> ({bears : state.bears + 1})),
    setCheckedList: ({ key, value }) => {

        return set((state) => {
           

          return ({ checkedList: clone })
        });
    },
}))

export default useBearStore