import PropTypes from "prop-types";
import React from "react";
import userSvg from "assets/images/anonymous_user.svg"
import heartSvg from "assets/images/heart.svg"
import "./style.css";

interface Props {
  className: any;
  text: string;
}

export const Card = ({
  className,
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
            풀옵션, 신축, 리모델링, 
          </div>
          <div className="frame-5">
            <img className="anonymous-user" alt="Anonymous user" src={userSvg} />
            <p className="p">{text}</p>
          </div>
        </div>
        <img className="heart" alt="Heart" src={heartSvg} />
      </div>
    </div>
  );
};

Card.propTypes = {
  anonymousUser: PropTypes.string,
  heart: PropTypes.string,
  text: PropTypes.string,
};
