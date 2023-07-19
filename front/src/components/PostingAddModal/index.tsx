import React from 'react';
import {UserProfile} from 'contexts/LoginContext'
import './style.css';

type ModalProps = {
  onClose: () => void;
};

const postingAddModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="postingAddModal">
      <div className="div">
        <h1 className="text-wrapper">새로운 맨션 만들기</h1>
        <div className="text-wrapper-2">제목</div>
        <div className="text-wrapper-3">내용</div>
        <div className="frame">
          <div className="text-wrapper-4">맨션 만들기</div>
        </div>
        <textarea className="rectangle" placeholder='여기에 제목을 입력하세요'/>
        <textarea className="rectangle-2" placeholder='여기에 내용을 입력하세요'/>
        <div className="text-wrapper-5" onClick={onClose}>X</div>
      </div>
    </div>
  );
};

export default postingAddModal;