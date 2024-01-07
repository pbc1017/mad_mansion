/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import {Posting} from '../../pages/Detail/Detail'
import "./style.css";

interface Props {
  className: any,
  Posting : Posting
  onClickSendPosting : (Posting: Posting) => void;
}

export const RoomInfo = ({ className, Posting,  onClickSendPosting }: Props): JSX.Element => {
  const onClick = () => {
    console.log(11);
    onClickSendPosting(Posting);
  }
  return (
    <div className={`room-info ${className}`} >
      <div className="element-2"onClick = {onClick}>{Posting.title} </div>
      <div className="element-3">{`${Posting.members.length} / ${Posting.maxNum}명` }</div>
      <div className="pbc">{`${Posting.writer}님`}</div>
    </div>
  );
};
