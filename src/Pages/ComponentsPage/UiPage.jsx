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
                        ??????
                    </button>
                    <pre>
                        {`
                        <button className='btn-search btn-green'><Icon icon={"search"} />??????</button>
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
                                    ?????????
                                </strong>
                                <ul className="list">
                                    <li>???2-1</li>
                                    <li>I. ?????? ?????? ??????</li>
                                    <li>??????, ??????</li>
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
                <input type="text" className="textInput" placeholder="????????? ???????????????" />
                <input type="text" className="textInput" placeholder="????????? ???????????????" disabled />
                <pre>
                    {`
                            <input type='text' className="textInput" placeholder='????????? ???????????????' />
                            <input type='text' className="textInput" placeholder='????????? ???????????????' disabled/>

                        `}
                </pre>
                <div className="searchInput">
                    <input type="text" className="textInput" placeholder="?????? ????????? ???????????????" />
                    <button className="searchInput-btn">
                        <Icon icon={"search"} style={{ color: "#00A37F", fontSize: "20px" }} />
                    </button>
                </div>
                <pre>
                    {`
                        <div className='searchInput'>
                            <input type='text' className="textInput" placeholder='?????? ????????? ???????????????' />
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
                            <th>??????</th>
                            <th>??????</th>
                            <th>??????</th>
                            <th>??????(??????)</th>
                            <th>?????????(??????)</th>
                            <th>?????????(??????)</th>
                            <th>??????</th>
                            <th>?????? ?????????</th>
                        </tr>
                    </thead>
                    <tbody className="scroll">
                        <tr>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                        </tr>
                        <tr>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                        </tr>
                        <tr>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                        </tr>
                        <tr>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
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

                    * tr ?????? calc(100% + 10px)
                    * ????????? width: 10px
                    * ??????????????? ???????????? scroll ????????? 
                `}
                </pre>
                <table className="table tableB">
                    <thead>
                        <tr>
                            <th>??????</th>
                            <th>??????(?????????)</th>
                            <th>??????</th>
                            <th>?????? ??????</th>
                        </tr>
                    </thead>
                    <tbody className="scroll">
                        <tr className="active">
                            <td>1</td>
                            <td>?????????(Kangsh)</td>
                            <td>???2</td>
                            <td>
                                <button className="btn-table">?????????</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>?????????(Kangsh)</td>
                            <td>???2</td>
                            <td>
                                <button className="btn-table">?????????</button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>?????????(Kangsh)</td>
                            <td>???2</td>
                            <td>
                                <button className="btn-table">?????????</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pre>
                    {`
            <table className='table tableB'>
                <thead>
                    <tr className='active'>
                        <th>??????</th>
                        <th>??????(?????????)</th>
                        <th>??????</th>
                        <th>?????? ??????</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div>1</div></td>
                        <td><div className='name'>?????????(Kangsh)</div></td>
                        <td><div>???2</div></td>
                        <td><div><button className='btn-table'>?????????</button></div></td>
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
                        <th rowSpan={2}>????????? (?????????)</th>
                        <th rowSpan={2}>??????</th>
                        <th rowSpan={2}>??????</th>
                        <th colSpan={5} className="bb">
                            ?????? ??????
                        </th>
                        <th rowSpan={2} className="b-none">
                            ?????? ??????
                        </th>
                    </tr>
                    <tr>
                        <th>?????? ??????</th>
                        <th>?????? ??????</th>
                        <th>?????? ??????</th>
                        <th>?????? ??????</th>
                        <th>?????? ?????????</th>
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
                            <th rowSpan={2}>????????? (?????????)</th>
                            <th rowSpan={2}>??????</th>
                            <th rowSpan={2}>??????</th>
                            <th colSpan={5} className='bb'>?????? ??????</th>
                            <th rowSpan={2} className='b-none'>?????? ??????</th>
                        </tr>
                        <tr>
                            <th>?????? ??????</th>
                            <th>?????? ??????</th>
                            <th>?????? ??????</th>
                            <th>?????? ??????</th>
                            <th>?????? ?????????</th>
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
