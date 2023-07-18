/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
}

export const RoomInfo = ({ className }: Props): JSX.Element => {
  return (
    <div className={`room-info ${className}`}>
      <div className="element-2">조용한 남자 룸메 구합니다!</div>
      <div className="element-3">2 / 3명</div>
      <div className="pbc">pbc님</div>
    </div>
  );
};
