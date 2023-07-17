/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { LoginButton } from "../LoginButton";
import { MenuBarItem } from "../MenuBarItem";
import { useLogin } from "contexts/LoginContext";
import { useNavigate } from 'react-router-dom';
import "./style.css";

interface Props {
  className: any;
  loginLogo: string;
}

export const Header = ({
  className,
  loginLogo = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/login-logo-1.svg",
}: Props): JSX.Element => {
  const { userId } = useLogin();
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  }
  return (
    <div className={`header ${className}`}>
      <img className="login-logo" alt="Login logo" src={loginLogo} onClick={handleHomeClick} />
      <div className="div">
        <MenuBarItem elementClassName=""className="menu-bar-item-instance" text="지도" />
        <MenuBarItem
          className="menu-bar-item-instance"
          elementClassName="design-component-instance-node"
          text="관심 목록"
        />
        <MenuBarItem className="menu-bar-item-instance" elementClassName="menu-bar-item-2" text="내가 신청한 방" />
        <MenuBarItem className="menu-bar-item-instance" elementClassName="menu-bar-item-3" text="마이 페이지" />
      </div>
      <div className="frame-2">
        <LoginButton elementClassName=""className="login-button-instance" frameClassName="login-button-2" text={userId ? userId + "님" : "로그인"}/>
        <LoginButton
          className="login-button-instance"
          elementClassName="login-button-3"
          frameClassName="login-button-2"
          text={userId ? "로그아웃" : "회원가입"}
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  loginLogo: PropTypes.string,
};
