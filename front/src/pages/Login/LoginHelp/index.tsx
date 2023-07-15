import React from "react";
import { LoginAdditionalMsg } from "./LoginAdditionalMsg";
import "./style.css";

interface Props {
    className: any;

}

export const LoginHelp = ({ className }: Props): JSX.Element => {
    return (
        <div className={`login-help ${className}`}>
            <div className="overlap-group">
                <LoginAdditionalMsg
                    className="login-additional-msg-instance"
                    elementClassName="design-component-instance-node"
                    text="아이디 찾기"
                />
                <LoginAdditionalMsg
                    className="login-additional-msg-2"
                    elementClassName="design-component-instance-node"
                    text="비밀번호 찾기"
                />
                <LoginAdditionalMsg
                    className="login-additional-msg-3"
                    elementClassName="login-additional-msg-4"
                    text="회원가입"
                />
            </div>
        </div>
    );
};
