// SearchBar.tsx
import PropTypes from "prop-types";
import React, {useState, useRef, useEffect} from "react";
import "./style.css";

interface Props {
  iconSearch: string;
  handleSearchMessage: (data: string) => void;
  searchAddress?: string;
}

export const SearchBar = ({
  iconSearch = "https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/icon-search-2.svg",
  handleSearchMessage, 
  searchAddress}: Props): JSX.Element => {

  const [text, setText] = useState<string>(searchAddress || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchMessage(text);
    }
  };

  useEffect(() => {
    setText(searchAddress || '');
  }, [searchAddress]);

  return (
    <div className="search-bar">
      <img className="icon-search" alt="Icon search" src={iconSearch} />
      <input 
        className="element-5"  
        placeholder="찾으려는 지역, 동, 지하철역을 검색하세요"
        value={text}
        onChange={onChange}
        onKeyDownCapture={handleKeyPress}
      />
    </div>
  );
};

SearchBar.propTypes = {
  iconSearch: PropTypes.string,
};
