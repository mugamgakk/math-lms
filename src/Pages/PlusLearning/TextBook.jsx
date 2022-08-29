import React from 'react';
import UserInfo from '../../components/UserInfo';
import {useSelector} from 'react-redux';


function TextBook() {
    let {clickStudent} = useSelector(state=>state.plusLearningSlice)

    return ( 
        <div>
            <UserInfo clickStudent={clickStudent} />
            asdasd
        </div>
     );
}

export default TextBook;