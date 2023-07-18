import React from 'react';
import {UserProfile} from 'contexts/LoginContext'
type ModalProps = {
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div>
      <button onClick={onClose}>Close</button>
      <div>
      </div>
    </div>
  );
};

export default Modal;