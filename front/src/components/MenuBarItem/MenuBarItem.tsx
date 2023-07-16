/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  className: any;
  elementClassName: any;
  text: string;
}

export const MenuBarItem = ({ className, elementClassName, text = "지도" }: Props): JSX.Element => {
  return (
    <div className={`menu-bar-item ${className}`}>
      <div className={`element ${elementClassName}`}>{text}</div>
    </div>
  );
};

MenuBarItem.propTypes = {
  text: PropTypes.string,
};
