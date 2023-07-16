/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Card } from "../Card";
import "./style.css";

interface Props {
  className: any;
  text: string;
  cardText: string;
  cardAnonymousUser: string;
  cardHeart: string;
  cardImg: string;
  cardText1: string;
  cardAnonymousUser1: string;
  cardHeart1: string;
  cardText2: string;
  cardAnonymousUser2: string;
}

export const CardGrid = ({
  className,
  text = " 추천 매물",
  cardText = "현재 5명이 룸메 구하는 중",
  cardAnonymousUser = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user-9.svg",
  cardHeart = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart-9.svg",
  cardImg = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart-8.svg",
  cardText1 = "현재 5명이 룸메 구하는 중",
  cardAnonymousUser1 = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user-8.svg",
  cardHeart1 = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart-7.svg",
  cardText2 = "현재 5명이 룸메 구하는 중",
  cardAnonymousUser2 = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user-7.svg",
}: Props): JSX.Element => {
  return (
    <div className={`card-grid ${className}`}>
      <div className="element-4">
        <span className="span">어은동</span>
        <span className="text-wrapper-2">{text}</span>
      </div>
      <div className="frame-6">
        <Card anonymousUser={cardAnonymousUser} className="card-instance" heart={cardHeart} text={cardText} />
        <Card anonymousUser={cardAnonymousUser1} className="card-instance" heart={cardImg} text={cardText1} />
        <Card anonymousUser={cardAnonymousUser2} className="card-instance" heart={cardHeart1} text={cardText2} />
      </div>
    </div>
  );
};

CardGrid.propTypes = {
  text: PropTypes.string,
  cardText: PropTypes.string,
  cardAnonymousUser: PropTypes.string,
  cardHeart: PropTypes.string,
  cardImg: PropTypes.string,
  cardText1: PropTypes.string,
  cardAnonymousUser1: PropTypes.string,
  cardHeart1: PropTypes.string,
  cardText2: PropTypes.string,
  cardAnonymousUser2: PropTypes.string,
};
