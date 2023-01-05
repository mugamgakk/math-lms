import create from 'zustand'

const useStudentsStore = create(set=>({
    // 선택된 학생 리스트
    clickStudent : null,
    // 교재 6종 
    bookList : {},
    // 교재 6종 선택
    setBookList  : (param)=> set(state=> ({bookList : param})),
    setClickStudent : (payload)=> set (state=> ({clickStudent : payload})),
    resetStudent : ()=> set (state=> ({clickStudent : null}) )
}))

export default useStudentsStore