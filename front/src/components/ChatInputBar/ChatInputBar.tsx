/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, {useState} from "react";
import * as MySocketIO from '../../utils/SocketIO'
import "./style.css";
interface Props {
  className: any;
}

export const ChatInputBar = ({ className }: Props): JSX.Element => {
  const [message, setMessage] = useState('');  // 추가: 메시지 상태 관리

  const handleSend = () => {  // 추가: 메시지 전송 핸들러
    if (message !== '') {
      MySocketIO.sendMessage(message);
      setMessage('');
    }
  }

  return (
    <div className={`chat-input-bar ${className}`}>
      <input className="element"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={event => event.key === 'Enter' ? handleSend() : null}
      />
    </div>
  );
};
