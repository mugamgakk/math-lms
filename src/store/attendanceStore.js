import create from "zustand";
import ajax from "../ajax";

const attendanceStore = create((set) => ({
    date: new Date(),
    classList: [],
    studentList: [],
    copyStudentList: [],
    searchText: "",
    getList: async ({date, searchText, classList}) => {
        const param = {
            mode: "get_daily",
            ymd: date,
            class_cd: classList,
            qstr: searchText,
        };

        let res = await ajax("class_daily.php", { data: param });

        const { class_list, student_list } = res.data;

        return set((state) => ({ classList: class_list, studentList: student_list, copyStudentList :  student_list}));
    },
}));

export default attendanceStore;
