import React from "react";
import { LoginHelp } from "./LoginHelp";
import LoginInput from "./LoginInput";
import logoSvg from "assets/images/logo.svg";
import "./style.css";

export const Login = (): JSX.Element => {
    return (
        <div className="login">
            <div className="div-2">
                <LoginInput className="login-input-instance" />
                <img className="login-logo" alt="Login logo" src={logoSvg} />
                <LoginHelp className="login-help-instance" />
            </div>
        </div>
    );
};
