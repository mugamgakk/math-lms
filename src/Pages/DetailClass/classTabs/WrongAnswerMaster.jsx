// yeonju
import React, { useState, useMemo, useEffect} from "react";
import SelectBase from '../../../components/ui/select/SelectBase';
import ajax from "../../../ajax";
import PrintModalWrongAnswer from '../../../components/PrintModalWrongAnswer';
import dayjs from "dayjs"
import useStudentsStore from "../../../store/useStudentsStore";
import Icon from "../../../components/Icon";
import Checkbox from "../../../components/Checkbox";
import CreationModal_detail from "../modal/CreationModal_detail";
import CustomDatePicker from "../../../components/CustomDatePicker";
import { _isScroll } from "../../../methods/methods";

function WrongAnswer() {
    let [checkData,setCheckData] = useState([]);
    let [wrongList, setWrongList] = useState(null);
    let [filterData, setFilterData] = useState(null);
    let [selectChoice,setSelecChoice] = useState(null);
    let [selectOption, setSelectOption] = useState(null);
    let [date,setDate] = useState(new Date());
    let [scroll,setScroll] = useState();
    const clickStudent = useStudentsStore(state=>state.clickStudent);

    // console.log(scroll);
    useEffect(()=>{
        // console.log(checkData);
    },[checkData])
    
    useEffect(()=>{
        getData();
    },[]);
    
    const getData = async () => {
        let url = "/class_wrong.php";
        let query = {
            mode: "list",
            usr_seq : clickStudent.usr_seq,
            sdate : startDay,
            edate : endDay,
        };
        
        let res = await ajax(url, {data: query});
        // const res = await axios("/json/wrongAnswer_table.json");

        setWrongList(res.data.wrong_list);
        setFilterData(res.data.wrong_list);

        let arr = [{value:null, label:'전체'}];

        res.data.bk_list.forEach(list=>{
            arr.push({value: list.bk_cd, label: list.bk_name});
        });

        setSelectOption(arr);
        setSelecChoice(arr[0])

        setScroll(_isScroll('custom-table',554))

    }

    const allCheck = (checked) => {
        if(checked){
            let arr = [];
            filterData && filterData.map(list=>{
                arr.push(list.wa_seq);
            });
            
            setCheckData(arr);
        }else{
            setCheckData([]);
        }

    }
    
    const checkFunc = (checked,data) => {
        if(checked){
            setCheckData([...checkData, data]);
        }else{
            setCheckData(checkData.filter(item=>item !== data));
        }
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
    let [endDay, setEndDay] = useState(new Date());
    
    let [option, setOption] = useState(false);
    let [subjectArr, setSubjectArr] = useState([]);

    const optionBtn = () => {
        if (startDay !== "" && endDay !== "") {
            setOption(true);
        }
    };

    const removeConfirm = (checkData) => {
        if(checkData.length == 0) return window.alert('1개 이상 선택해주세요');
        window.alert('삭제 완료');
        setCheckData([]);
    }

     return (
        <>
        <div className='detailClass wrongAnswerMaster'>
                <p className="warning mb-20 mt-20">※ 오답 정복하기는 학생별 오답 맞춤 학습지입니다 학생 화면 나의 오답 목록에 반영</p>
            <div className="top fj" style={{ marginBottom:'20px' }}>
                <div className="top-left fj">
                    <button className="btn-grey-border mr-10" onClick={()=>removeConfirm(checkData)}>선택 삭제</button>
                    <SelectBase 
                        onChange={(ele)=>{setSelecChoice(ele)}} 
                        options={selectOption && selectOption} // 모든 옵션들 <br/>
                        value={selectChoice}  //현재 값 <br/>
                    />
                </div>
                <div className="top-right fj">
                    <CustomDatePicker
                        value={startDay}
                        width="130px"
                        onChange={(day) => { setStartDay(day) }}
                        label={true}
                    />
                    <span className="water">
                        ~
                    </span>
                    <CustomDatePicker
                        value={endDay}
                        width="130px"
                        onChange={(day) => { setEndDay(day) }}
                        label={true}
                        className="mr-10"
                    />
              
                <button 
                    className='btn-search btn-green' 
                    onClick={optionBtn}
                    style={{width : "81px"}}
                    ><Icon icon={"search"} />조회</button>
                </div>
            </div>
            <table className="wrongAnswerMaster-table custom-table">
                <thead>
                        <tr>
                            <th style={{ width:"6.91%" }}>
                                <Checkbox color='orange' onChange={(e)=>allCheck(e.target.checked)} checked={ checkData.length == filterData?.length }/>
                                선택
                            </th>
                            <th style={{ width:'11.82%' }}>생성일</th>
                            <th style={{ width:'11.82%' }}>교재</th>
                            <th style={{ width:'21.76%' }}>제목</th>
                            <th style={{ width:'16.3%' }}>범위</th>
                            <th style={{ width:'7.85%' }}>문항 수</th>
                            <th style={{ width:'11.72%' }}>상태</th>
                            <th style={{ width:'11.82%' }}>시험지</th>
                            {
                                scroll && <th style={{ width:'17px', border:"none" }}></th>
                            }
                        </tr>
                </thead>
                <tbody style={{ maxHeight:'554px' }}> 
                    {
                        wrongList && wrongList.map((data,i)=>{
                            return <Tr key={i} data={data} checkData={checkData} checkFunc={checkFunc} setCheckData={setCheckData} />
                        })
                        
                    }
                </tbody>

            </table>
        </div>
        </>
     );
}

const Tr = ({data,checkData,checkFunc})=>{
    let [printModal, setPrintModal] = useState(false);
    let [creationMo, setCreationMo] = useState(false);

    return(
        <tr key={data.wa_seq}>
            <td style={{ width:"6.91%" }}>
                <Checkbox color='orange' onChange={(e)=>checkFunc(e.target.checked,data.wa_seq)} checked={checkData.includes(data.wa_seq)}/>
            </td>
            <td style={{ width:'11.82%' }}>{data.reg_dt}</td>
            <td style={{ width:'11.82%' }}>{data.bk_name}</td>
            <td style={{ width:'21.76%' }} onClick={()=>setCreationMo(true)}>
                <div className="title">
                    {data.wa_title}
                </div>
                {
                    creationMo && <CreationModal_detail setCreationMo={setCreationMo} seq={data.wa_seq}/>
                }
            </td>
            <td style={{ flexDirection:'column',width:'16.3%'  }}>
                {/* {
                    data.wa_range.map((range,i)=>{
                        return(
                            <div key={i}>{range}</div>
                            )
                        })
                } */}
                 {data.wa_range}
            </td>
            <td style={{ width:'7.85%' }}>{data.wa_seq}</td>
            <td style={{ flexDirection:'column', width:'11.72%' }}>
                <div className={data.wa_status == '학습 완료' ? 'done' : ''}>{data.wa_status}</div>
                { 
                    data.wa_status == '학습 중' && <button className="btn-orange">완료</button>
                }
            </td>
            <td style={{ width:'11.82%' }}><button className="btn-table" onClick={()=> setPrintModal(true)}><Icon icon={"print"} style={{ marginRight:'5px' }} />인쇄</button>
            {
                printModal && <PrintModalWrongAnswer closeModal={setPrintModal} wa_seq={data.wa_seq} />
            }
            </td>
        </tr>
    )
};

export default WrongAnswer;