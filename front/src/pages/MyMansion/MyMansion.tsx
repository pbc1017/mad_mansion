import React, { useEffect ,useState } from "react";
import { Header } from "components/Header";
import { ManshionView } from "components/ManshionView";
import logoSvg from "assets/images/logo.svg";
import { useLogin } from "contexts/LoginContext";
import "./style.css";
import { serverPost } from "utils/severPost";

export type Manshion = {
  state: string,
  title: string, 
  king: string, 
  members: string, 
  priceType: string, 
  priceFirst: string, 
  priceMonth: string, 
  maxmembers: string, 
  address: string,
  imgUrl:string,
  id:string
}

export const MyMansion = (): JSX.Element => {

  const { setUserProfile } = useLogin();
  const [manshionSend, setManshionSend] = useState<Array<Array<Manshion>>|null>(null);
  const [manshionRecieve, setManshionRecieve] = useState<Array<Array<Manshion>>|null>(null);

  useEffect(() => {
    const userProfile = window.localStorage.getItem('userProfile');
    if (userProfile) {
      const user = JSON.parse(userProfile)
      setUserProfile(user);
      serverPost("getMyMansion", {userId:user.id})
      .then((data: any) => {
          console.log(data);
          setManshionSend(data.sent);
          setManshionRecieve(data.recieve);
        }
      );
    }
  }, [setUserProfile]);
  
  return (
    <div className="detail">
      <div className="div-2">
        <Header className="header-instance" loginLogo={logoSvg} />
        <ManshionView
          className="manshion-view-instance"
          text="내가 신청한 맨션 목록"
          text1="승인 완료된 요청"
          text2="승인 대기중인 요청"
          text3="승인 거절된 요청"
          Manshions={manshionSend}
        />
        <ManshionView
          className="manshion-view-2"
          text="내가 방장인 맨션 목록"
          text1="승인 완료된 맨션"
          text2="승인 대기중인 맨션"
          text3="승인 거절된 맨션"
          Manshions={manshionRecieve}
        />
      </div>
    </div>
  );
};
