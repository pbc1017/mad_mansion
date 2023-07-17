/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLogin } from 'contexts/LoginContext';
import "./style.css";

interface Props {
  className: any;
  frameClassName: any;
  elementClassName: any;
  text: string;
}

export const LoginButton = ({ className, frameClassName, elementClassName, text = "로그인" }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { setUserId } = useLogin();

  const handleButtonClick = () => {
    switch(text) {
      case '로그인':
        navigate('/login');
        break;
      case '회원가입':
        navigate('/signup');
        break;
      case '로그아웃':
        localStorage.removeItem('userId');
        setUserId(null);
        navigate('/');
        break;
      default:
        break;
    }
  }
  
  return (
    <div className={`login-button ${className}`} >
      <div className={`frame ${frameClassName}`}>
        <div className={`text-wrapper ${elementClassName}`} onClick={handleButtonClick}>{text}</div>
      </div>
    </div>
  );
};

LoginButton.propTypes = {
  text: PropTypes.string,
};
