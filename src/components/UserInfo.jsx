import React, { useState } from 'react';
import { useEffect } from 'react';
import ajax from '../ajax';
import useStudentsStore from '../store/useStudentsStore';
import SelectBook from './ui/select/SelectBook';


function UserInfo({ clickStudent }) {

    let [multiSelect, setMultiSelect] = useState();
    let [chiceItem, setChiceItem] = useState();

    let [optionsDefault, setoptionsDefault] = useState();
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

    useEffect(() => {
        if (clickStudent) {
            const data = {
                mode: "std_info",
                usr_seq: clickStudent.usr_seq
            }
            ajax("/class_manage.php", { data })
                .then(res => {
                    // console.log(res)

                    // const options = res.data.bk_list.map(a=> ({value : a.bk_cd, label : a.bk_name}));

                    const options = [
                        { value: 123, label: "수학" },
                        { value: 1323, label: "영어" },
                        { value: 323, label: "도덕" },
                        { value: 313, label: "기술" },
                        { value: 3, label: "개그" },
                        { value: 2, label: "찬양" },
                        { value: 1, label: "축구" }
                    ]

                    // 초기값  // 6개 기본 체크
                    setMultiSelect(options.slice(0, 6));

                    // store에 넣을 초기값
                    setBookList(options[0]);

                    // select초기값
                    setChiceItem(options[0])

                    // option
                    setoptionsDefault(options);

                    return options.slice(0.6);

                })
                .then(data => {
                    choiceBook(data);
                })

        }
    }, [clickStudent])


    return (
        <dl className='row user-info'>
            <div>
                <dt>학생이름</dt>
                <dd>{clickStudent?.um_nm}</dd>
            </div>
            <div>
                <dt>교재</dt>
                <dd>
                    <SelectBook
                        options={optionsDefault}
                        onCheck={(arr) => {
                            setMultiSelect(arr);
                            choiceBook(arr);
                        }}
                        onChange={(ele) => {
                            setChiceItem(ele);
                            setBookList(ele);
                        }}
                        value={chiceItem}
                        checkValue={multiSelect}
                        limit={6}
                    />
                </dd>
            </div>
            <div>
                <dt>학년</dt>
                <dd>{clickStudent?.school_grade}</dd>
            </div>
        </dl>
    );
}

export default UserInfo;