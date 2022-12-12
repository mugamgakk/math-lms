// yeonju
import React, { useState } from 'react';
import ReceiveMessage from './ReceiveMessage';
import SendMessage from './SendMessage';

function Notification() {
   let [message, setMessage] = useState('보낸 메세지');

   return(
      <div className="contents-body notification">
         <div className="contents-body__top pt-10">
            <div className="btn-wrap">
               <button 
               onClick={()=>setMessage('보낸 메세지')}
               className={message == '보낸 메세지' ? 'btn active' : 'btn'}>보낸 메시지</button>
               <button 
               onClick={()=>setMessage('받은 메세지')}
               className={message == '받은 메세지' ? 'btn active' : 'btn'}>받은 메시지</button>
            </div>
            {
               {
                  '보낸 메세지' :  <SendMessage />,
                  '받은 메세지' :  <ReceiveMessage />
               }[message]
            }
         </div>
      </div>
   )
}
export default Notification;