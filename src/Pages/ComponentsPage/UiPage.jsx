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