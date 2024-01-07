/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
  overlapGroupClassName: any;
}

export const ChatHeader = ({ className, overlapGroupClassName }: Props): JSX.Element => {
  return (
    <div className={`chat-header ${className}`}>
        <div className="frame">
          <div className="chat-list">Chat List</div>
        </div>
        <div className="ellipse" />
    </div>
  );
};
