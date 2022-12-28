import React from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import Checkbox from "../../components/Checkbox";
import Icon from "../../components/Icon";
import { useState } from "react";
import RadioBox from "../../components/RadioBox";

function UiPage() {
    return (
        <div style={{ padding: "10px 20px" }}>
       
            <table className="custom-table">
            <thead>
                <tr>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>@@@@@@@@@@@@@@@@@@@@@@@@@@@@</td>
                    </tr>
                </tbody>
            </table>

            <div className="mb-20">
                <h3>button</h3>
                <div>
                    <button className="btn-search btn-green">
                        <Icon icon={"search"} />
                        검색
                    </button>
                    <pre>
                        {`
                        <button className='btn-search btn-green'><Icon icon={"search"} />검색</button>
                        `}
                    </pre>

                    <button className="btn-green">btn-green</button>
                    <button className="btn-green" disabled>
                        btn-green
                    </button>
                    <button className="btn-green-border">btn-green-light</button>
                    <button className="btn-green-border" disabled>
                        btn-green-light
                    </button>
                    <button className="btn-green-light">btn-green-light</button>
                    <button className="btn-green-light" disabled>
                        btn-green-light
                    </button>
                </div>
                <div>
                    <button className="btn-orange">btn-orange</button>
                    <button className="btn-orange" disabled>
                        btn-orange
                    </button>
                    <button className="btn-orange-border">btn-orange-light</button>
                    <button className="btn-orange-border" disabled>
                        btn-orange-light
                    </button>
                    <button className="btn-orange-light">btn-orange-light</button>
                    <button className="btn-orange-light" disabled>
                        btn-orange-light
                    </button>
                </div>
                <div>
                    <button className="btn-brown">btn-brown</button>
                    <button className="btn-brown" disabled>
                        btn-brown
                    </button>
                </div>
                <div>
                    <button className="btn-table">btn-table</button>
                    <button className="btn-table-orange">btn-table-orange</button>
                    <button className="btn-table-orange-border">btn-table-orange</button>
                </div>
                <div>
                    <button className="btn-grey">btn-grey</button>
                    <button className="btn-grey" disabled>
                        btn-grey
                    </button>
                    <button className="btn-grey-border">btn-grey-border</button>
                    <button className="btn-grey-border" disabled>
                        btn-grey-border
                    </button>
                </div>
            </div>

            <div>
                <h3>Modal</h3>
                <pre>
                    {`
                        <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className='modal-title'>title</h2>
                                <button className='btn'>
                                    <Icon icon={"close"} />
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="modal-name">
                                <strong className="name">
                                    강수학
                                </strong>
                                <ul className="list">
                                    <li>중2-1</li>
                                    <li>I. 수와 식의 계산</li>
                                    <li>번호, 주제</li>
                                </ul>
                            </div>
        
                            </div>
                            <div className="modal-footer">
        
                            </div>
                        </div>
                    </div>
                        `}
                </pre>
            </div>

            <div className="mb-20">
                <h3>select</h3>
                <SelectBase />
                <SelectBase disabled={true} />
            </div>

            <div className="mb-20">
                <h3>checkbox</h3>
                <Checkbox color="green" disabled={true} checked />
                <Checkbox color="orange" checked={true} />
                <Checkbox color="green" checked={true} />
            </div>

            <div className="mb-20">
                <h3 className="">inputbox</h3>
                <input type="text" className="textInput" placeholder="내용을 입력하세요" />
                <input type="text" className="textInput" placeholder="내용을 입력하세요" disabled />
                <pre>
                    {`
                            <input type='text' className="textInput" placeholder='내용을 입력하세요' />
                            <input type='text' className="textInput" placeholder='내용을 입력하세요' disabled/>

                        `}
                </pre>
                <div className="searchInput">
                    <input type="text" className="textInput" placeholder="학생 이름을 입력하세요" />
                    <button className="searchInput-btn">
                        <Icon icon={"search"} style={{ color: "#00A37F", fontSize: "20px" }} />
                    </button>
                </div>
                <pre>
                    {`
                        <div className='searchInput'>
                            <input type='text' className="textInput" placeholder='학생 이름을 입력하세요' />
                            <button className='searchInput-btn'>
                            <Icon icon={"search"} style={{color:'#00A37F',fontSize:'20px'}}/>
                            </button>
                        </div>
                        `}
                </pre>
            </div>
            <div className="mb-20">
                <h3>radiobox</h3>
                <RadioBox checked={true} />
                <RadioBox />
                <pre>
                    {`
                            <RadioBox
                                id={}
                                checked={ }
                                name={}
                                onChange={ }
                                label={}
                                className={}
                            />
                        `}
                </pre>
            </div>

            <div className="mb-20">
                <h3 className="">table</h3>
                <table className="table tableA">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름</th>
                            <th>학년</th>
                            <th>캐럿(갯수)</th>
                            <th>미네랄(갯수)</th>
                            <th>포인트(점수)</th>
                            <th>내역</th>
                            <th>누적 포인트</th>
                        </tr>
                    </thead>
                    <tbody className="scroll">
                        <tr>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                            <td>내용</td>
                        </tr>
                    </tbody>
                </table>
                <pre>
                    {`
                <table className='table tableA'>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>   

                    * tr 넓이 calc(100% + 10px)
                    * 스크롤 width: 10px
                    * 스크롤되는 컨텐츠에 scroll 클래스 
                `}
                </pre>
                <table className="table tableB">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이름(아이디)</th>
                            <th>학년</th>
                            <th>학생 화면</th>
                        </tr>
                    </thead>
                    <tbody className="scroll">
                        <tr className="active">
                            <td>1</td>
                            <td>강수학(Kangsh)</td>
                            <td>중2</td>
                            <td>
                                <button className="btn-table">로그인</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>강수학(Kangsh)</td>
                            <td>중2</td>
                            <td>
                                <button className="btn-table">로그인</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>강수학(Kangsh)</td>
                            <td>중2</td>
                            <td>
                                <button className="btn-table">로그인</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pre>
                    {`
            <table className='table tableB'>
                <thead>
                    <tr className='active'>
                        <th>번호</th>
                        <th>이름(아이디)</th>
                        <th>학년</th>
                        <th>학생 화면</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div>1</div></td>
                        <td><div className='name'>강수학(Kangsh)</div></td>
                        <td><div>중2</div></td>
                        <td><div><button className='btn-table'>로그인</button></div></td>
                    </tr>
                </tbody>
            </table>
                `}
                </pre>
            </div>
            <table className="tableC">
                <colgroup>
                    <col width="9.33%" />
                    <col width="9.33%" />
                    <col width="32%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="8%" />
                    <col width="9.33%" />
                </colgroup>
                <thead>
                    <tr>
                        <th rowSpan={2}>학생명 (아이디)</th>
                        <th rowSpan={2}>교재</th>
                        <th rowSpan={2}>단원</th>
                        <th colSpan={5} className="bb">
                            수행 현황
                        </th>
                        <th rowSpan={2} className="b-none">
                            학습 완료
                        </th>
                    </tr>
                    <tr>
                        <th>개념 강의</th>
                        <th>개념 확인</th>
                        <th>개념 설명</th>
                        <th>유형 학습</th>
                        <th>맞춤 클리닉</th>
                    </tr>
                </thead>
            </table>
            <pre>
                {`
            <table className='tableC'>
                    <colgroup>
                        <col width='9.33%'/>
                        <col width='9.33%'/>
                        <col width='32%'/>
                        <col width='8%'/>
                        <col width='8%'/>
                        <col width='8%'/>
                        <col width='8%'/>
                        <col width='8%'/>
                        <col width='9.33%'/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th rowSpan={2}>학생명 (아이디)</th>
                            <th rowSpan={2}>교재</th>
                            <th rowSpan={2}>단원</th>
                            <th colSpan={5} className='bb'>수행 현황</th>
                            <th rowSpan={2} className='b-none'>학습 완료</th>
                        </tr>
                        <tr>
                            <th>개념 강의</th>
                            <th>개념 확인</th>
                            <th>개념 설명</th>
                            <th>유형 학습</th>
                            <th>맞춤 클리닉</th>
                        </tr>
                    </thead>
            </table>
                `}
            </pre>
            <style>
                {`
                    .ui-color{
                        width : 100px;
                        height : 100px;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        margin-right : 10px;
                    }
                `}
            </style>
        </div>
    );
}

export default UiPage;
