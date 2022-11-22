import React from 'react';
import SelectBase from '../../components/ui/select/SelectBase';
import Checkbox from '../../components/Checkbox';
import Icon from "../../components/Icon";

function UiPage() {
    return (
        <div style={{ padding: '10px 20px' }}>

            <div className='mb-20'>
                <h3>button</h3>
                <div>
                    <button className='btn-search btn-green'><Icon icon={"search"} />검색</button>
                    <pre>
                    {
                        `
                        <button className='btn-search btn-green'><Icon icon={"search"} />검색</button>
                        `
                    }
                    </pre>
                    <button className='btn-reload btn-grey'><Icon icon={"reload"}/>새로고침</button>
                    <pre>
                    {
                        `
                        <button className='btn-reload btn-grey'><Icon icon={"reload"}/>새로고침</button>
                        `
                    }
                    </pre>
                    <button className='btn-green'>btn-green</button>
                    <button className='btn-green' disabled>btn-green</button>
                    <button className='btn-green-border'>btn-green-light</button>
                    <button className='btn-green-border' disabled>btn-green-light</button>
                    <button className='btn-green-light'>btn-green-light</button>
                    <button className='btn-green-light' disabled>btn-green-light</button>
                </div>
                <div>
                    <button className='btn-orange'>btn-orange</button>
                    <button className='btn-orange' disabled>btn-orange</button>
                    <button className='btn-orange-border'>btn-orange-light</button>
                    <button className='btn-orange-border' disabled>btn-orange-light</button>
                    <button className='btn-orange-light'>btn-orange-light</button>
                    <button className='btn-orange-light' disabled>btn-orange-light</button>
                </div>
                <div>
                    <button className='btn-brown'>btn-brown</button>
                    <button className='btn-brown' disabled>btn-brown</button>
                </div>
                <div>
                    <button className='btn-table'>btn-table</button>
                </div>
                <div>
                    <button className='btn-grey'>btn-grey</button>
                    <button className='btn-grey' disabled>btn-grey</button>
                    <button className='btn-grey-border'>btn-grey-border</button>
                    <button className='btn-grey-border' disabled>btn-grey-border</button>
                </div>
            </div>

            <div className='mb-20'>
                <h3>select</h3>
                <SelectBase/>
                <SelectBase disabled={true}/>
            </div>

            <div className='mb-20'>
                <h3>checkbox</h3>
                <Checkbox color='green' disabled={true} checked/>
                <Checkbox color='orange' checked={true}/>
                <Checkbox color='green' checked={true} />
            </div>

            <div className='mb-20'>
                <h3 className=''>inputbox</h3>
                <input type='text' className="textInput" placeholder='내용을 입력하세요' />
                <pre>
                    {
                        `
                            <input type='text' className="textInput" placeholder='내용을 입력하세요' />
                        `
                    }
                </pre>
                <div className='searchInput'>
                    <input type='text' className="textInput" placeholder='학생 이름을 입력하세요' />
                    <button className='searchInput-btn'>
                        <Icon icon={"search"} style={{color:'#00A37F',fontSize:'20px'}}/>
                    </button>
                </div>
                <pre>
                    {
                        `
                        <div className='searchInput'>
                            <input type='text' className="textInput" placeholder='학생 이름을 입력하세요' />
                            <button className='searchInput-btn'>
                            <Icon icon={"search"} style={{color:'#00A37F',fontSize:'20px'}}/>
                            </button>
                        </div>
                        `
                    }
                </pre>
            </div>
            <div className='mb-20'>
                <h3 className=''>table</h3>
                <table className='table tableA'>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
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
            {
                `
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

                    ① table 넓이 고정값 주기
                    ② 가상 th 하나 추가
                    ③ 스크롤 width: 8px
                    ④ th, td 넓이단위 %
                `
                }
            </pre>
             <table className='table tableB'>
                    <thead>
                        <tr>
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
                        <tr>
                            <td>
                                <div>1</div>
                            </td>
                            <td><div className='name'>강수학(Kangsh)</div></td>
                            <td><div>중2</div></td>
                            <td><div><button className='btn-table'>로그인</button></div></td>
                        </tr>
                        <tr>
                            <td>
                                <div>1</div>
                            </td>
                            <td><div className='name'>강수학(Kangsh)</div></td>
                            <td><div>중2</div></td>
                            <td><div><button className='btn-table'>로그인</button></div></td>
                        </tr>
                  
                      
                    </tbody>
                </table>
                <pre>
            {
                `
            <table className='table tableB'>
                <thead>
                    <tr>
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
                `
                }
            </pre>
            </div>
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