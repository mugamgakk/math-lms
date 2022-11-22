import React, { useState, useEffect} from 'react';
import ContentHeader from "../components/ContentHeader";
import Reference from "./ReferenceNotification/Reference";
import Notification from "./ReferenceNotification/Notification";

function ReferenceNotification() {
    
    let [tab,setTab] = useState('자료실');


    return ( 
            <div className="referenceNotification">
                <ContentHeader title={"자료 및 알림"}/>
                <div className="bg contents pt-10">
                    <div className="contents-head">
                        <ul className='content-tabs'>
                            <li 
                            className={ tab == '자료실' ? 'active' : ''} 
                            onClick={()=>setTab('자료실')}
                            >자료실</li>
                            <li 
                            className={ tab == '학습알림' ? 'active' : ''} 
                            onClick={()=>setTab('학습알림')}
                            >학습 알림</li>
                        </ul>
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