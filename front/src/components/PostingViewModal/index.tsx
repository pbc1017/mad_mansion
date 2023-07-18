import React, { useEffect } from 'react';
import {UserProfile} from 'contexts/LoginContext'
import {Posting} from 'pages/Detail/Detail'
type ModalProps = {
  onClose: (Posting : Posting | null) => void;
  children: React.ReactNode;
  Posting: Posting
};

const Modal: React.FC<ModalProps> = ({ onClose, children, Posting } : ModalProps) => {
    const onClosePosting = ()=>{
        onClose(null);
    }
    useEffect(() => {
        console.log("제발..");
    }, []);
  return (
    <div>
      <button onClick={onClosePosting}>Close</button>
        <div>
            <h1>{Posting.title}</h1>
            <div className="author">Written by {Posting.writer}</div>
            <div className="content">
                <p>{Posting.content}</p>
            </div>
        </div>
    </div>
  );
}

export default Modal;