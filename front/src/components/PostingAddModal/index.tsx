import React from 'react';
import {UserProfile} from 'contexts/LoginContext'
import './style.css';

type ModalProps = {
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="div">
        <h1 className="text-wrapper">새로운 맨션 만들기</h1>
        <div className="text-wrapper-2">제목</div>
        <div className="text-wrapper-3">내용</div>
        <div className="frame">
          <div className="text-wrapper-4">맨션 만들기</div>
        </div>
        <div className="rectangle" />
        <div className="rectangle-2" />
        <div className="text-wrapper-5" onClick={onClose}>X</div>
      </div>
    </div>
  );
};

export default Modal;