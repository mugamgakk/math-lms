import React, {useState} from 'react';
import MultiSelect from './ui/select/MultiSelect';



const options = [
    "중 3-1 뜨레스", "중1-1 뜨레스", "초6-1 아르케" , "중2-2 쓰레스", "중2-2액세스", "중3-1액세스",
    "초4-1 아르케"
]


const 중딩 = options.filter(item=> /(중)\s?[1-6]/.test(item));
const 초딩 = options.filter(item=> /(초)\s?[1-6]/.test(item));


중딩.sort((a,b)=>{

    a = a.match(/(중)\s?[1-6]/)[0].match(/[0-9]/)[0]
    b = b.match(/(중)\s?[1-6]/)[0].match(/[0-9]/)[0]

    return b-a
})
초딩.sort((a,b)=>{

    a = a.match(/(초)\s?[1-6]/)[0].match(/[0-9]/)[0]
    b = b.match(/(초)\s?[1-6]/)[0].match(/[0-9]/)[0]

    return b-a
})

const 잼민 = [...중딩, ...초딩];


function UserInfo({clickStudent}) {
    // 6개 기본 체크
    let [multiSelect, setMultiSelect] = useState(잼민.slice(0,6));


    return ( 
        <dl className='row user-info'>
                <div>
                    <dt>학생이름</dt>
                    <dd>{clickStudent?.name}</dd>
                </div>
                <div>
                    <dt>교재</dt>
                    <dd>
                        <MultiSelect
                        options={잼민}
                        onChange={(arr) => {
                            setMultiSelect(arr)
                        }}
                        value={multiSelect}
                        limit={6}
                        />
                    </dd>
                </div>
                <div>
                    <dt>학년</dt>
                    <dd>{clickStudent?.age}</dd>
                </div>
            </dl>
     );
}

export default UserInfo;