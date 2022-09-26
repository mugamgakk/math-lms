import React, { useState, useEffect} from 'react';
import ContentHeader from "../components/ContentHeader";
import Reference from "./ReferenceNotification/Reference";
import Notification from "./ReferenceNotification/Notification";

function ReferenceNotification() {
    
    let [tab,setTab] = useState('자료실');


    return ( 
            <div className="container referenceNotification">
                <ContentHeader title={"자료 및 알림"}/>
                <div className="contents pt-10">
                    <div className="contents-head">
                        <div className="btn-group">
                            <button 
                            className={ tab == '자료실' ? 'btn active' : 'btn'} 
                            onClick={()=>setTab('자료실')}>자료실</button>
                            <button className={ tab == '학습알림' ? 'btn active' : 'btn'} 
                            onClick={()=>setTab('학습알림')}>학습 알림</button>
                        </div>
                    </div>
                    {
                        {
                            자료실 : <Reference />,    
                            학습알림 : <Notification />,    
                        }[tab]
                    }
                </div>
            </div>
     );
}

export default ReferenceNotification;