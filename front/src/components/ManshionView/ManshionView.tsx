/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { MansionList } from "../MansionList";
import "./style.css";

interface Props {
  className: any;
  mansionListAnonymousUser: string;
  mansionListImg: string;
  mansionListAnonymousUser1: string;
  text: string;
  text1: string;
  text2: string;
  text3: string;
}

export const ManshionView = ({
  className,
  mansionListAnonymousUser = "/img/anonymous-user.svg",
  mansionListImg = "/img/anonymous-user-9.svg",
  mansionListAnonymousUser1 = "/img/anonymous-user-8.svg",
  text = "내가 신청한 맨션 목록",
  text1 = "가입 완료된 맨션 (0)",
  text2 = "가입 대기중인 맨션 (0)",
  text3 = "가입 거절된 맨션 (0)",
}: Props): JSX.Element => {
  return (
    <div className={`manshion-view ${className}`}>
      <div className="rectangle-2" />
      <div className="frame-3">
        <div className="element-7">{text}</div>
        <div className="element-8">{text1}</div>
        <MansionList anonymousUser={mansionListAnonymousUser} className="mansion-list-instance" />
        <div className="element-8">{text2}</div>
        <MansionList anonymousUser={mansionListImg} className="mansion-list-instance" />
        <div className="element-8">{text3}</div>
        <MansionList anonymousUser={mansionListAnonymousUser1} className="mansion-list-instance" />
      </div>
    </div>
  );
};

ManshionView.propTypes = {
  mansionListAnonymousUser: PropTypes.string,
  mansionListImg: PropTypes.string,
  mansionListAnonymousUser1: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
};
