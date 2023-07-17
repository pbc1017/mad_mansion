/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { ChatFooter } from "../ChatFooter";
import { ChatHeader } from "../ChatHeader";
import { Messages } from "../Messages";
import "./style.css";

interface Props {
  className: any;
}

export const ChatRoom = ({ className }: Props): JSX.Element => {
  return (
    <div className={`chat-room ${className}`}>
      <ChatHeader className="design-component-instance-node" overlapGroupClassName="design-component-instance-node-2" />
      <Messages className="design-component-instance-node" />
      <ChatFooter className="chat-footer-instance" overlapGroupClassName="design-component-instance-node-2" />
    </div>
  );
};
