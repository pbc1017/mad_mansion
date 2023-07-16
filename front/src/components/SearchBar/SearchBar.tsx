/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  iconSearch: string;
}

export const SearchBar = ({
  iconSearch = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/icon-search-2.svg",
}: Props): JSX.Element => {
  return (
    <div className="search-bar">
      <img className="icon-search" alt="Icon search" src={iconSearch} />
      <p className="element-5">찾으려는 지역, 동, 지하철역을 검색하세요</p>
    </div>
  );
};

SearchBar.propTypes = {
  iconSearch: PropTypes.string,
};
