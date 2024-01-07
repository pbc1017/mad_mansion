import React from "react";
import "./style.css";

type ModalProps = {
  onClose: () => void,
  placeId: string,
};

const AcceptModal: React.FC<ModalProps> = ({ onClose, placeId }) => {
    return (
        <div className="modal">
            <div className="div">
                <h1 className="text-wrapper">맨션 가입 승인하기</h1>
                <div className="text-wrapper-2">yhw 님이 보낸 요청</div>
                <div className="frame">
                    <div className="text-wrapper-3">가입 승인하기</div>
                </div>
                <div className="text-wrapper-4">간단한 자기소개</div>
                <div className="text-wrapper-10">안녕하세요</div>
                <div className="text-wrapper-5" onClick={onClose}>X</div>
            </div>
        </div>
    );
};

export default AcceptModal;