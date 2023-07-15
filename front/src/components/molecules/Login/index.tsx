import React from "react";
import "./style.css";

interface Props {
    className: string;
}

export const Login = ({ className }: Props): JSX.Element => {
    return (
        <div className={`login ${className}`}>
            <div className="frame">
              <div className="div">
                    <div className="ID">아이디</div>
                    <input className="input-box" />
                </div>
                <div className="div">
                    <div className="ID">비밀번호</div>
                    <input className="input-box" />
                </div>
            </div>
            <button className="btn">
                <div className="element">로그인</div>
            </button>
        </div>
    );
};
