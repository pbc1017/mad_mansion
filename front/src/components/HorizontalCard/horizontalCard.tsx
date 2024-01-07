import React from "react";
import "./style.css";
import {House} from "pages/Map/Map"
import userSvg from "assets/images/anonymous_user.svg"
import heartSvg from "assets/images/heart.svg"
import logoSvg from "assets/images/logo.svg"
import emptyHearSvg from "assets/images/emptyHeart.svg"

type Props = {
  house : House
}
export const HorizontalCard = ( {house}:Props): JSX.Element => {
  return (
    <div className="box">
      <div className="item-info-wrapper">
        <div className="item-info">
          <div className="rectangle" />
          <div className="frame">
            <div className="text-wrapper">{house?.priceType =="전세"? <div className="text-wrapper-4">{house?.priceFirst}</div> : <div className="text-wrapper-4">{house?.priceFirst}/{house?.priceMonth}</div>}</div>
            <div className="div">관리비 매월 7개월</div>
            <div className="text-wrapper-2">{house?.roomNum}인실</div>
            <div className="frame-2">
              <img className="anonymous-user" alt="Anonymous user" src="userSvg" />
              <div className="text-wrapper-3">현재 {house?.postingList.length}명이 방 구하는 중</div>
            </div>
          </div>
          <img className="heart" alt="Heart" src= "heartSvg"/>
        </div>
      </div>
    </div>
  );
};
