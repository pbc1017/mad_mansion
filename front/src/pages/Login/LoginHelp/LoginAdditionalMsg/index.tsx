import React from "react";
import "./style.css";

interface Props {
    className: any;
    elementClassName: any;
    text: any;
}

export const LoginAdditionalMsg = ({ className, text }: Props): JSX.Element => {
    return (
        <div className={`login-additional-msg ${className}`}>
            <div className="element">{text}</div>
        </div>
    );
};
