import React, { useEffect } from 'react';
import {UserProfile} from 'contexts/LoginContext'
import {Posting} from 'pages/Detail/Detail'
import './style.css'
type ModalProps = {
  onClose: (Posting : Posting | null) => void;
  Posting: Posting
};

const Modal: React.FC<ModalProps> = ({ onClose, Posting } : ModalProps) => {
    const onClosePosting = ()=>{
        onClose(null);
    }
    useEffect(() => {
        console.log("제발..");
    }, []);
  return (
    <div className="modal">
      <div className="div">
        <h1 className="text-wrapper">맨션 가입 신청하기</h1>
        <div className="text-wrapper-2">제목</div>
        <div className="pbc">
          <span className="text-wrapper-3">{Posting.writer} 님이 만든 맨션</span>
        </div>
        <div className="text-wrapper-4">내용</div>
        <div className="frame">
          <div className="text-wrapper-5">가입 신청하기</div>
        </div>
        <div className="rectangle">{Posting.title}</div>
        <div className="rectangle-2">{Posting.content}</div>
        <div className="text-wrapper-6">간단한 자기소개</div>
        <textarea className="rectangle-3" placeholder='여기에 소개를 입력하세요'/>
        <div className="text-wrapper-7" onClick={onClosePosting}>X</div>
      </div>
    </div>
  );
}

export default Modal;