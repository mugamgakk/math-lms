import React, {useState} from 'react';
import MultiSelect from './ui/select/MultiSelect';

const options = [
    "수학", "국어", "영어", "역사", "도덕", "체육"
]

function UserInfo({clickStudent}) {
    let [multiSelect, setMultiSelect] = useState([options[0]]);

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
                        options={options}
                        onChange={(arr) => {
                            setMultiSelect(arr)
                        }}
                        value={multiSelect}
                        limit={3}
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