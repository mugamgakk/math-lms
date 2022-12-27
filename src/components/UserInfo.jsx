import React, { useState } from 'react';
import { useEffect } from 'react';
import ajax from '../ajax';
import useStudentsStore from '../store/useStudentsStore';
import SelectBook from './ui/select/SelectBook';


function UserInfo({ clickStudent }) {

    // 셀렉트 선택값
    let [chiceItem, setChiceItem] = useState();
    
    // 셀렉트 체크값
    let [multiSelect, setMultiSelect] = useState();
    // 셀렉트 옵션값
    let [optionsDefault, setoptionsDefault] = useState();

    // 선택 북 
    let setBookList = useStudentsStore(state => state.setBookList);

    // 교재 6종 선택
    const choiceBook = async (list) => {
        const data = {
            mode: "bk_select",
            usr_seq: clickStudent.usr_seq
        }

        data.bk_cd = list.map(ele => ele.value);

        let res = await ajax("class_manage.php", { data });

        // console.log("교재 6종",data);
        // console.log("교재 6종 선택",res);

    }

    const getStudentBookList = async ()=>{
        const data = {
            mode: "std_info",
            usr_seq: clickStudent.usr_seq
        }

        let res = await ajax("/class_manage.php", {data});

        const bookList = res.data.bk_list.map(a=> ({value : a.bk_cd, label : a.bk_name}));

        // 초기값  // 6개 기본 체크
        setMultiSelect(bookList.slice(0, 6));
        choiceBook(bookList.slice(0, 6))

        // store에 넣을 선택값
        setBookList(bookList[0]);

        // select초기값
        setChiceItem(bookList[0])

        // option
        setoptionsDefault(bookList);
    }

    useEffect(() => {
        if (clickStudent) {
            getStudentBookList();
        }
    }, [clickStudent])


    return (
        <div className='fa user-info'>
            <strong className='name'>{clickStudent?.um_nm}</strong>
            <div className="grade">{clickStudent?.school_grade}</div>
            <SelectBook
                options={optionsDefault}
                onCheck={(arr) => {
                    setMultiSelect(arr);
                    choiceBook(arr);
                }}
                width="160px"
                onChange={(ele) => {
                    setChiceItem(ele);
                    setBookList(ele);
                }}
                value={chiceItem}
                checkValue={multiSelect}
                limit={6}
            />
        </div>
    );
}

export default UserInfo;