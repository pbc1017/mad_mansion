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
  heart: string;
  text: string;
}

export const Card = ({
  className,
  anonymousUser = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user-6.svg",
  heart = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart-6.svg",
  text = "현재 5명이 룸메 구하는 중",
}: Props): JSX.Element => {
  return (
    <div className={`card ${className}`}>
      <div className="overlap-group">
        <div className="frame-3">
          <div className="rectangle" />
          <div className="frame-4">
            <div className="element-2">월세 000 / 00</div>
            <div className="element-wrapper">
              <div className="element-m">33m2</div>
            </div>
          </div>
          <div className="element-3">
            풀옵션, 신축, 리모델링, <br />
            주방분리
          </div>
          <div className="frame-5">
            <img className="anonymous-user" alt="Anonymous user" src={anonymousUser} />
            <p className="p">{text}</p>
          </div>
        </div>
        <img className="heart" alt="Heart" src={heart} />
      </div>
    </div>
  );
};

Card.propTypes = {
  anonymousUser: PropTypes.string,
  heart: PropTypes.string,
  text: PropTypes.string,
};
