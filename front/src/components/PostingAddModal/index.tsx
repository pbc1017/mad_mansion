import React from 'react';
import {UserProfile} from 'contexts/LoginContext'
type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div>
      <button onClick={onClose}>Close</button>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Modal;