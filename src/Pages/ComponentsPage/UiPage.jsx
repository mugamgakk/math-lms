import React from 'react';
import SelectBase from '../../components/ui/select/SelectBase';
import Checkbox from "../../components/Checkbox";

function UiPage() {
    return ( 
        <div>
            <div>
                <h4>color</h4>
                <div className='d-flex'>
                <div className="ui-color" style={{background : "#00a37f"}}>
                    $green
                    <br/>
                    #00a37f
                </div>
                <div className="ui-color" style={{background : "#CCEDE5"}}>
                    $green-light
                    <br/>
                    #CCEDE5
                </div>
                <div className="ui-color" style={{background : "#EA7851"}}>
                    $orange
                    <br/>
                    #EA7851
                </div>
                <div className="ui-color" style={{background : "#FBE4DC"}}>
                    $orange
                    <br/>
                    #FBE4DC
                </div>
                <div className="ui-color" style={{background : "#664E3D"}}>
                    $brown
                    <br/>
                    #664E3D
                </div>
                <div className="ui-color" style={{background : "#c8c8c8"}}>
                    $border
                    <br/>
                    #c8c8c8
                </div>
                <div className="ui-color" style={{background : "#EEEEEE"}}>
                    $grey
                    <br/>
                    #EEEEEE
                </div>
                </div>
            </div>

            <div>
                <h4>button</h4>
                <div>
                    <button className='btn-green'>btn-green</button>
                    <button className='btn-green-border'>btn-green-light</button>
                    <button className='btn-green-light'>btn-green-light</button>
                </div>
                <div>
                    <button className='btn-orange'>btn-orange</button>
                    <button className='btn-orange-border'>btn-orange-light</button>
                    <button className='btn-orange-light'>btn-orange-light</button>
                </div>
                <div>
                    <button className='btn-brown'>btn-brown</button>
                </div>
            </div>

            <div>
                <h4>checkbox</h4>
                <div className='check-green'>
                    <input type="checkbox" id='a'/>
                    <label htmlFor="a">
                    </label>
                </div>
                <div className='check-orange'>
                    <input type="checkbox" id='b'/>
                    <label htmlFor="b">
                    </label>
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