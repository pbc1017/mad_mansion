import React, {useState} from 'react';
import {UserProfile} from 'contexts/LoginContext'
import { serverPost } from 'utils/severPost';
import './style.css';

type ModalProps = {
  onClose: () => void,
  placeId: string,
};

const PostingAddModal: React.FC<ModalProps> = ({ onClose, placeId }) => {

  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');

    const handleContentInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
      setContent(value);
    };
    const handleTitleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
      setTitle(value);
    };


  const onClickMakeApply = () => {
    const userProfileString = localStorage.getItem('userProfile');
    console.log(userProfileString);
    if(userProfileString){
        const userProfile : UserProfile = JSON.parse(userProfileString);
        console.log(userProfile);
        serverPost("makePosting", { placeId: placeId, userId: userProfile.id, title : title,content: content }).then((data: any) => {
        // data.id 가 존재하는 경우에만 로그인을 수행
        if (data._id) {
            userProfile.postingList.push(data._id);
            
            window.localStorage.setItem('userProfile', (JSON.stringify(userProfile)));  
            
            onClose();  // 홈페이지로 이동
        } else {
            console.log("로그인 실패");
        }
    });
    }
  };
  return (
    <div className="postingAddModal">
      <div className="div">
        <h1 className="text-wrapper">새로운 맨션 만들기</h1>
        <div className="text-wrapper-2">제목</div>
        <div className="text-wrapper-3">내용</div>
        <div className="frame">
          <div className="text-wrapper-4" onClick={onClickMakeApply}>맨션 만들기</div>
        </div>
        <textarea className="rectangle" placeholder='여기에 제목을 입력하세요' onChange={handleTitleInputChange}/>
        <textarea className="rectangle-2" placeholder='여기에 내용을 입력하세요' onChange={handleContentInputChange}/>
        <div className="text-wrapper-5" onClick={onClose}>X</div>
      </div>
    </div>
  );
};

export default PostingAddModal;