import React, {useState} from 'react';
import SearchBtn from '../../components/ui/button/SearchBtn';
import SelectBox from '../../components/ui/select/SelectBox';


function TodayClassSearch({data,setFindList}) {

    let [checkState, setCheckState] = useState([]);
    let [search, setSearch] = useState('');

    // 찾기 버튼
    const findUser = ()=>{
        let arr = [];

        data.forEach(list=>{

            // 반으로 찾기
            checkState.forEach(a=>{

                if(list.반이름 === a){
                    arr.push(list)
                }

            })
        })


        //  검색창이 공백일시 반으로만 찾기
        if(search === ''){
            setFindList(arr)
        }else{
            // 이름 검색으로 찾기

            let array = []

            arr.forEach(function(a){
                let regexp = new RegExp(search);

                if(regexp.test(a.name)){
                    array.push(a);
                    setFindList(array)
                }

            })
        }

    }


    return ( 
        <div>
            <SelectBox width={"200px"} checkState={checkState} setCheckState={setCheckState} />
            
            <input
                type="text"
                className="form-control"
                placeholder="학생"
                style={{ width: "200px", margin: "0 5px" }}
                value={search}
                onKeyUp={(e)=>{
                    if(e.key === "Enter"){
                        findUser()
                    }
                }}
                onChange={(e)=>{
                    setSearch(e.target.value);
                }}
            />
            <SearchBtn onClick={findUser}/>
        </div>
     );
}

export default TodayClassSearch;