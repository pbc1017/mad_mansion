/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import React from "react";
import "./style.css";

interface Props {
  className: any;
  elementClassName: any;
  text: string;
}

export const MenuBarItem = ({ className, elementClassName, text = "지도" }: Props): JSX.Element => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    switch(text) {
      case '지도':
        navigate('/map');
        break;
      case '관심 목록':
        navigate('/wishlist');
        break;
      case '나의 맨션 관리':
        navigate('/mymansion');
        break;
      case '마이페이지':
        navigate('/mypage');
        break;
      default:
        break;
    }
  }
  return (
    <div className={`menu-bar-item ${className}`}>
      <div className={`element ${elementClassName}`} onClick={handleButtonClick}>{text}</div>
    </div>
  );
};

MenuBarItem.propTypes = {
  text: PropTypes.string,
};
