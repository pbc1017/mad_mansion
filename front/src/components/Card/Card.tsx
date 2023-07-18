import PropTypes from "prop-types";
import React from "react";
import userSvg from "assets/images/anonymous_user.svg"
import logoSvg from "assets/images/logo.svg"
import heartSvg from "assets/images/heart.svg"
import "./style.css";

interface House {
  _id: string;
  id: string;
  priceType: string;
  priceFirst: number;
  priceMonth: number;
  description: string;
  floor: string;
  area: number;
  fee: number;
  roomType: string;
  roomNum: number;
  address: string;
  latitude: number;
  longitude: number;
  detailUrl: string;
  imageUrl: string;
  roomList: any[];
}

interface Props {
  className: any;
  house?: House;
}

export const Card = ({
  className,
  house,
}: Props): JSX.Element => {
  return (
    <div className={`card ${className}`}>
      {house ? (
        <div className="overlap-group">
          <div className="frame-3">
            <img className="rectangle" src={house?.imageUrl} />
            <div className="frame-4">
              <div className="element-2">{house?.priceType} {house?.priceFirst} / {house?.priceMonth}</div>
              <div className="element-wrapper">
                <div className="element-m">33m2</div>
              </div>
            </div>
            <div className="element-3">
              풀옵션, 신축, 리모델링, 
            </div>
            <div className="frame-5">
              <img className="anonymous-user" alt="Anonymous user" src={userSvg} />
              <p className="p">{house?.address}</p>
            </div>
          </div>
          <img className="heart" alt="Heart" src={heartSvg} />
        </div>
      ) : (
        <img className="logo" alt="Logo" src={logoSvg} /> // 이곳에 로고의 경로를 넣으세요
      )}
    </div>
  );
};

Card.propTypes = {
  anonymousUser: PropTypes.string,
  heart: PropTypes.string,
  text: PropTypes.string,
};
