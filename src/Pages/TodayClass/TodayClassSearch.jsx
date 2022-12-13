// yeonju
import React, {useState} from 'react';
import { useEffect } from 'react';
import SearchBtn from '../../components/ui/button/SearchBtn';
import ClassSelect from '../../components/ui/select/ClassSelect';
import Icon from '../../components/Icon';

function TodayClassSearch({data,setFindList}) {
    
    let [search, setSearch] = useState('');
    // 반선택
    let [group, setGroup] = useState();

    return ( 
        <div className='d-flex'>
            <ClassSelect width={"200px"} value={group} onChange={ele=>{ setGroup(ele) }} />

            <input
                type="text"
                className="textInput mr-10 ml-10"
                placeholder="학생명(아이디)"
                style={{ width: "200px" }}
                value={search}
                onKeyUp={(e)=>{
                    if(e.key === "Enter"){
                        // findUser()
                    }
                }}
                onChange={(e)=>{
                    setSearch(e.target.value);
                }} />
                <button type='button' className='btn-search btn-green mr-10'><Icon icon={"search"} />검색</button>
                <button className="btn-grey btn-icon"><Icon icon={"reload"} />새로고침</button>
        </div>
     );
}

export default TodayClassSearch;