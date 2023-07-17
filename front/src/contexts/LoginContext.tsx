import React, { createContext, useState, useContext } from "react";

// 유저 ID를 저장하는 타입 정의
interface IUserContext {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

// 컨텍스트 생성
const LoginContext = createContext<IUserContext | undefined>(undefined);

interface IProps {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: IProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <LoginContext.Provider value={{ userId, setUserId }}>
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