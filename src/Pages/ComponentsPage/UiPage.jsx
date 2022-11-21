import React from 'react';
import SelectBase from '../../components/ui/select/SelectBase';
import Checkbox from '../../components/Checkbox';
import Icon from "../../components/Icon";

function UiPage() {
    return (
        <div>

            <div>
                <h4>button</h4>
                <div>
                    <button className='btn-search btn-green'><Icon icon={"search"} />검색</button>
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

            <div>
                <h4>select</h4>
                <SelectBase/>
                <SelectBase disabled={true}/>
            </div>

            <div>
                <h4>checkbox</h4>
                <Checkbox color='green' disabled={true} checked/>
                <Checkbox color='orange' checked={true}/>
                <Checkbox color='green' checked={true} />
            </div>

            <div>
                <h4 className=''>inputbox</h4>
                <div className='textInput'>
                    <input type='text' className="textInput-default" placeholder='내용을 입력하세요' />
                </div>
                <div className='textInput searchInput'>
                    <input type='text' className="textInput-search" placeholder='학생 이름을 입력하세요' />
                    <button className='searchInput-wrap'>
                        <Icon icon={"search"} color='#00A37F' size='20px'/>
                    </button>
                </div>
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