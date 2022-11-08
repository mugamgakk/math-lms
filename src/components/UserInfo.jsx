import React, {useState} from 'react';
import { useEffect } from 'react';
import ajax from '../ajax';
import MultiSelect from './ui/select/MultiSelect';


function UserInfo({clickStudent}) {
   
    let [multiSelect, setMultiSelect] = useState();
    let [optionsDefault, setoptionsDefault] = useState();

    useEffect(()=>{
        if(clickStudent){
            const data = {
                mode : "std_info",
                usr_seq : clickStudent.usr_seq
            }
            ajax("/class_manage.php", {data})
            .then(res=>{
                let userData = {
                    um_id : "gkatjdwn1",
                    um_nm : "강호동",
                    school_grade : "초1",
                    bk_list : [{bk_cd : "M12_C12",bk_name : "중 2-1 노벰"}]
                }

                const options = userData.bk_list.map(a=> ({value : a.bk_cd, label : a.bk_name}));

                // 초기값  // 6개 기본 체크
                setMultiSelect(options.slice(0,6))

                // option
                setoptionsDefault(options);

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
                            console.log(arr)
                            setMultiSelect(arr)
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