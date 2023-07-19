import React, { useEffect, useState } from 'react';
import {UserProfile} from 'contexts/LoginContext'
import {Posting} from 'pages/Detail/Detail'
import { serverPost } from 'utils/severPost';
import './style.css'
type ModalProps = {
  onClose: (Posting : Posting | null) => void;
  Posting: Posting
};

const PostingViewModal: React.FC<ModalProps> = ({ onClose, Posting } : ModalProps) => {
    const onClosePosting = ()=>{
        onClose(null);
    }
    const [text, setText] = useState<string>('');
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
      setText(value);
  };

  const onClickMakeApply = () => {
    
    const userProfileString = localStorage.getItem('getUserProfile');
    if(userProfileString){
        const userProfile : UserProfile = JSON.parse(userProfileString);
        serverPost("login", { sender: userProfile.id, postingId: Posting._id, content: text }).then((data: any) => {
        // data.id 가 존재하는 경우에만 로그인을 수행
        if (data.id) {
            userProfile.applyList.push(data._id);
            
            window.localStorage.setItem('userProfile', (JSON.stringify(userProfile)));  
            
            onClosePosting();  // 홈페이지로 이동
        } else {
            console.log("로그인 실패");
        }
    });
    }
  };

  return (
    <div className="postingViewModal">
      <div className="div">
        <h1 className="text-wrapper">맨션 가입 신청하기</h1>
        <div className="text-wrapper-2">제목</div>
        <div className="pbc">
          <span className="text-wrapper-3">{Posting.writer} 님이 만든 맨션</span>
        </div>
        <div className="text-wrapper-4">내용</div>
        <div className="frame">
          <div className="text-wrapper-5" onClick= {onClickMakeApply}>가입 신청하기</div>
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

export default PostingViewModal;