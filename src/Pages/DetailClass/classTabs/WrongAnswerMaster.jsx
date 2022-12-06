import React, { useState, useMemo, useEffect} from "react";
import SelectBase from '../../../components/ui/select/SelectBase';
import ajax from "../../../ajax";
import DatePicker from "react-date-picker";
import PrintModal from '../../../components/PrintModal';
import dayjs from "dayjs"
import useStudentsStore from "../../../store/useStudentsStore";


const options = [
    { value: null, label: "전체" },
    { value: '중2-1노벰', label: '중2-1노벰' },
    { value: '중2-2뜨레스', label: '중2-2뜨레스' },
    { value: '중2-2노벰', label: '중2-2노벰' },
];

// const data = {
//     bk_list : [
//         { bk_cd : 'M12_C12', bk_name: '중2-1노벰'},
//         { bk_cd : 'M12_C12', bk_name: '중2-1노벰'},
//     ],
//     wrong_list : [
//         {
//             wa_seq : 123,
//             reg_dt : "2021-01-01",
//             bk_name : "중2-1 뜨레스",
//             wa_title : "제목 중2-1뜨레스 _강수학 말줄임표 없이",
//             wa_range : "줄바꿈은<br>어떻게<br>할것인가",
//             wa_qnum : 30,
//             wa_status : "학습중",
//         },
//         {
//             wa_seq : 124,
//             reg_dt : "2021-01-01",
//             bk_name : "중2-2 노벰",
//             wa_title : "제목 중2-1뜨레스 _강수학 말줄임표 없이",
//             wa_range : "줄바꿈은<br>어떻게<br>할것인가",
//             wa_qnum : 30,
//             wa_status : "학습중",
//         },
//     ]
// }
function WrongAnswer() {
    let [checkData,setCheckData] = useState([]);
    let [wrongList, setWrongList] = useState(null);
    let [filterData, setFilterData] = useState(null);
    let [selectOption, setSelectOption] = useState(null);
    let today = dayjs(new Date()).format('YYYY-MM-DD');
    let monthAge = dayjs(new Date()).subtract(1,'month').format('YYYY-MM-DD');
    let bookList = useStudentsStore((state) => state.bookList);
    let clickStudent = useStudentsStore((state) => state.clickStudent);
    
    useEffect(()=>{
        getData();
    },[]);
    
    console.log(selectOption);
    const getData = async () => {
        let url = "/class_wrong.php";
        let query = {
            mode: "list",
            usr_seq : clickStudent.usr_seq,
            sdate : monthAge,
            edate : today,
        };
        
        let res = await ajax(url, {data: query});
        let data = res.data;

        console.log(data);
        setWrongList(data.wrong_list);

        let arr = [{value:null, label:'전체'}];

        data.bk_list.forEach(list=>{
            arr.push({value: list.bk_cd, label: list.bk_name});
        });

        setSelectOption(arr);

        

    }
    
    // useEffect(()=>{
    //     if(selectOption == '전체'){
    //         setRenderData(data);
    //         return;
    //     }
    //     if(selectOption){
    //         let array = renderData && data.filter(item => item.book == selectOption);
    //         array && setRenderData(array);
    //     }

    // },[selectOption]);

    // useEffect(()=>{
    //     filterData && setRenderData(filterData);
    //  },[filterData]);
        


    let oneMonthAgo = useMemo(() => {
        var now = new Date();
        var oneMonthAgo = dayjs(now).subtract(1,"M").$d;
        return oneMonthAgo;
    }, []);

    let [startDay, setStartDay] = useState(oneMonthAgo);
    let [option, setOption] = useState(false);

    let [lastDay, setLastDay] = useState(new Date());
    let [subjectArr, setSubjectArr] = useState([]);

    const optionBtn = () => {
        if (startDay !== "" && lastDay !== "") {
            setOption(true);
        }
    };



     return (
        <>
        <div className='detailClass wrongAnswerMaster'>
                <p>※ 오답 정복하기는 학생별 오답 맞춤 학습지입니다 학생 화면 나의 오답 목록에 반영</p>
            <div className="top fj">
                <div className="top-left">
                    <button className="btn">선택 삭제</button>
                    <SelectBase 
                        onChange={(ele)=>{setSelectOption(ele)}} 
                        options={selectOption && selectOption} // 모든 옵션들 <br/>
                        value={selectOption}  //현재 값 <br/>
                    />
                </div>
                <div className="top-right">

                <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        setStartDay(day);
                    }}
                    value={startDay}
                    maxDate={new Date()}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                    />
                    ~
                <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        setLastDay(day);
                    }}
                    value={lastDay}
                    maxDate={new Date()}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                    />
                <button className="btn" onClick={optionBtn} >조회</button>
                </div>
            </div>
            <table>
                <colgroup>
                    <col width='5%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                    <col width='20%'/>
                    <col width='10%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                </colgroup>
                <thead>
                        <tr>
                            <th>선택</th>
                            <th>생성일</th>
                            <th>교재</th>
                            <th>제목</th>
                            <th>범위</th>
                            <th>문항 수</th>
                            <th>상태</th>
                            <th>시험지</th>
                        </tr>
                </thead>
                <tbody>
                    {
                        filterData && filterData.map(data=>{
                            return <Tr data={data} checkData={checkData} setCheckData={setCheckData} />
                        })
                        
                    }
                </tbody>

            </table>
        </div>
        </>
     );
}

const Tr = ({data,checkData,setCheckData})=>{
    let [modalState, setModalState] = useState(false);
    let getDate = data.date.split('-').join('');

    const closeModal = () => {
        setModalState(false)
    }

    const checkFunc = (checked,data) => {
        if(checked){
            setCheckData([...checkData, data]);
        }else{
            setCheckData(checkData.filter(item=>item !== data));
        }
    }


    return(
        <tr key={data.id}>
            <td>
                <input type="checkbox" 
                onChange={(e)=>checkFunc(e.target.checked,data)} 
                checked={checkData.includes(data)}/>
            </td>
            <td>{data.date}</td>
            <td>{data.book}</td>
            <td>{data.tit}</td>
            <td>
                {
                    data.range.map((range,i)=>{
                        return(
                            <div key={i}>{range}</div>
                            )
                        })
                }
            </td>
            <td>{data.count}</td>
            <td>
                <div>{data.state}</div>
                { 
                    data.state == '학습 중' && <button className="btn">완료</button>
                }
            </td>
            <td><button className="btn" onClick={()=> setModalState(true)}>인쇄</button>
            {
                modalState && <PrintModal closeModal={closeModal} title={`[오답 정복하기]${data.name}/${getDate}_${data.book}_오답 정복하기`}/>
            }
            </td>
        </tr>
    )
};

export default WrongAnswer;