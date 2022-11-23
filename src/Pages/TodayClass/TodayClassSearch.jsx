import React, {useState} from 'react';
import { useEffect } from 'react';
import SearchBtn from '../../components/ui/button/SearchBtn';
import ClassSelect from '../../components/ui/select/ClassSelect';
import Icon from '../../components/Icon';

function TodayClassSearch({data,setFindList,option = []}) {
    
    let [search, setSearch] = useState('');
    let [sel, setSel] = useState(option);

    // 찾기 버튼
    const findUser = () => {
        let array = [];

        data.forEach(function (a) {
            let regexp = new RegExp(search);

            if (regexp.test(a.name)) {
                array.push(a);
            }
        });
        setFindList(array);
    };

    useEffect(()=>{
        
        if(option.length !== 0){
            setSel(option);
        }
    },[option])


    const findBan = (choiceArr) => {
        
        const matchingArr = data.filter(a=>{
            for(let ele of choiceArr){
                if(a.반이름 === ele){
                    return true
                }
            }
        })
        setFindList(matchingArr)
        
    }


    return ( 
        <div className='d-flex'>
            <ClassSelect width={"200px"} value={sel} onChange={ele=>{ setSel(ele) }} options={option} />
            <input
                type="text"
                className="textInput mr-10 ml-10"
                placeholder="학생"
                style={{ width: "200px" }}
                value={search}
                onKeyUp={(e)=>{
                    if(e.key === "Enter"){
                        findUser()
                    }
                }}
                onChange={(e)=>{
                    setSearch(e.target.value);
                }} />
                <button type='button' className='btn-search btn-green mr-10' onClick={findUser}><Icon icon={"search"} />검색</button>

        </div>
     );
}

export default TodayClassSearch;