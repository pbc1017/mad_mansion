import React from "react";
import { Header } from "components/Header";
import { ManshionView } from "components/ManshionView";
import logoSvg from "assets/images/logo.svg";
import userSvg from "assets/images/anonymous_user.svg";
import "./style.css";

export const MyMansion = (): JSX.Element => {
  return (
    <div className="detail">
      <div className="div-2">
        <Header className="header-instance" loginLogo={logoSvg} />
        <ManshionView
          className="manshion-view-instance"
          mansionListAnonymousUser={userSvg}
          mansionListAnonymousUser1={userSvg}
          mansionListImg={userSvg}
          text="내가 신청한 맨션 목록"
          text1="승인 완료된 맨션 (0)"
          text2="승인 대기중인 맨션 (0)"
          text3="승인 거절된 맨션 (0)"
        />
        <ManshionView
          className="manshion-view-2"
          mansionListAnonymousUser={userSvg}
          mansionListAnonymousUser1={userSvg}
          mansionListImg={userSvg}
          text="내가 방장인 맨션 목록"
          text1="승인 완료된 맨션 (0)"
          text2="승인 대기중인 맨션 (0)"
          text3="승인 거절된 맨션 (0)"
        />
      </div>
    </div>
  );
};
