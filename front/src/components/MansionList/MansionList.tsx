/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  anonymousUser: string;
}

export const MansionList = ({ className, anonymousUser = "/img/anonymous-user-7.svg" }: Props): JSX.Element => {
  return (
    <div className={`mansion-list ${className}`}>
      <div className="rectangle" />
      <div className="element-2">조용한 남자 룸메 구합니다!</div>
      <div className="pbc">방장: pbc</div>
      <div className="element-3">월세 500/30</div>
      <div className="element-4">대전광역시 유성구 대학로 21</div>
      <div className="element-5">3인실</div>
      <div className="element-6">2명 / 3명</div>
      <img className="anonymous-user" alt="Anonymous user" src={anonymousUser} />
    </div>
  );
};

MansionList.propTypes = {
  anonymousUser: PropTypes.string,
};
