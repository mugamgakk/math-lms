import React, {useState} from 'react';
import { useEffect } from 'react';
import ajax from '../ajax';
import useStudentsStore from '../store/useStudentsStore';
import MultiSelect from './ui/select/MultiSelect';


function UserInfo({clickStudent}) {
   
    let [multiSelect, setMultiSelect] = useState();
    let [optionsDefault, setoptionsDefault] = useState();
    let setBookList = useStudentsStore(state=>state.setBookList);

// 교재 6종 선택
    const choiceBook = async(list)=>{
        const data = {
            mode : "bk_select",
            usr_seq : clickStudent.usr_seq
        }

        data.bk_cd = list.map(ele=> ele.value);

        let res = await ajax("class_manage.php", {data});

        // console.log("교재 6종",data);
        // console.log("교재 6종 선택",res);

    }

    useEffect(()=>{
        if(clickStudent){
            const data = {
                mode : "std_info",
                usr_seq : clickStudent.usr_seq
            }
            ajax("/class_manage.php", {data})
            .then(res=>{
                // console.log(res)

                const options = res.data.bk_list.map(a=> ({value : a.bk_cd, label : a.bk_name}));

                // 초기값  // 6개 기본 체크
                setMultiSelect(options.slice(0,6));
                setBookList(options.slice(0,6))

                // option
                setoptionsDefault(options);

                return options.slice(0.6);

            })
            .then(data=>{
                choiceBook(data);
            })
            
        }
    },[clickStudent])


    return ( 
        <dl className='row user-info'>
                <div>
                    <dt>학생이름</dt>
                    <dd>{clickStudent?.um_nm}</dd>
                </div>
                <div>
                    <dt>교재</dt>
                    <dd>
                        <MultiSelect
                        options={optionsDefault}
                        onChange={(arr) => {
                            setMultiSelect(arr);
                            choiceBook(arr);
                        }}
                        value={multiSelect}
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