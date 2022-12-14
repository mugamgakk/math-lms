// yeonju
import React, { useState } from 'react';
import ReceiveMessage from './ReceiveMessage';
import SendMessage from './SendMessage';

function Notification() {
   let [message, setMessage] = useState('보낸 메세지');

   return(
      <div className="notification">
         <button 
         onClick={()=>setMessage('보낸 메세지')}
         className={`choice bar ${message == '보낸 메세지' ? 'active' : ''}`}>보낸 메시지</button>
         <button 
         onClick={()=>setMessage('받은 메세지')}
         className={`choice ${message == '받은 메세지' ? 'btn active' : 'btn'}`}>받은 메시지</button>
            {
               {
                  '보낸 메세지' :  <SendMessage />,
                  '받은 메세지' :  <ReceiveMessage />
               }[message]
            }
      </div>
   )
}
export default Notification;