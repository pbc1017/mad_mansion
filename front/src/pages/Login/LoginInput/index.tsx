import React, { useState } from 'react';
import './style.css';
import { serverPost } from 'utils/severPost';

type InputProps = {
  name: string,
  value: string,
  placeholder: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

const InputField: React.FC<InputProps> = ({ name, value, placeholder, onChange }) => (
  <div className="div">
    <div className="ID">{name}</div>
    <input
      name={name}
      className="input-box"
      type={name === '비밀번호' ? 'password' : 'text'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const LoginInput: React.FC<{ className?: string }> = ({ className }) => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [idPlaceholder, setIdPlaceholder] = useState<string>('아이디를 입력해주세요');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState<string>('비밀번호를 입력해주세요');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === '아이디') {
      setId(value);
      setIdPlaceholder('');
    } else {
      setPassword(value);
      setPasswordPlaceholder('');
    }
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
<<<<<<< Updated upstream
    serverPost("login",{ id: id, password: password }).then(
        (data: any) => {
            console.log(data); // JSON data parsed by `data` call
        }
    );
=======
    
    const regExp = new RegExp(`/^[a-z]+[a-z0-9]{5,19}$/g`);
 
	  if(!regExp.test(id)) return; 

>>>>>>> Stashed changes
    setId('');
    setPassword('');
    setIdPlaceholder('아이디를 입력해주세요');
    setPasswordPlaceholder('비밀번호를 입력해주세요');
    
  };

  return (
    <div className={`login-input ${className}`}>
      <div className="IDPW">
        <InputField name="아이디" value={id} placeholder={idPlaceholder} onChange={handleInputChange} />
        <InputField name="비밀번호" value={password} placeholder={passwordPlaceholder} onChange={handleInputChange} />
      </div>
      <button className="login-btn" onClick={handleSubmit}>
        <div className="element">로그인</div>
      </button>
    </div>
  );
}

export default LoginInput;