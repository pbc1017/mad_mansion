import React, { createContext, useState, useContext } from "react";


export type UserProfile = {
  id: string,
  wishList: string[],
  roomList: string[]
}  

// 유저 ID를 저장하는 타입 정의
interface IUserContext {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

// 컨텍스트 생성
const LoginContext = createContext<IUserContext | undefined>(undefined);

interface IProps {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: IProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <LoginContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </LoginContext.Provider>
  );
};

// 커스텀 훅: 컨텍스트 사용을 간소화
const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

export { LoginProvider, useLogin };