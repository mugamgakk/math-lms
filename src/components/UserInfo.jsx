import React from 'react';
import SelectTextbook from './ui/select/SelectTextbook';



function UserInfo({clickStudent}) {

    return ( 
        <dl className='row user-info'>
                <div>
                    <dt>학생이름</dt>
                    <dd>{clickStudent?.name}</dd>
                </div>
                <div>
                    <dt>교재</dt>
                    <dd>
                        <SelectTextbook/>
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