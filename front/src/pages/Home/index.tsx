import React, {useEffect} from "react";
import { Card } from "components/Card";
import { CardGrid } from "components/CardGrid";
import { Header } from "components/Header";
import { SearchBar } from "components/SearchBar";
import { useLogin } from "contexts/LoginContext";
import "./style.css";

export const Home = (): JSX.Element => {

  const { setUserId } = useLogin();

  useEffect(() => {
    const userId = window.localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
    }
  }, [setUserId]);

  return (
    <div className="home">
      <div className="frame-wrapper">
        <div className="div-wrapper">
          <div className="frame-7">
            <Header
              className="header-instance"
              loginLogo="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/login-logo.svg"
            />
            <div className="search-tab">
              <div className="overlap-2">
                <div className="frame-10">
                  <div className="flex-container-2">
                    <div className="text-2">
                      <span className="text-wrapper-6">어떤 </span>
                      <span className="text-wrapper-7">룸메이트</span>
                      <span className="text-wrapper-6">
                        와<br />
                      </span>
                    </div>
                    <div className="span-wrapper">
                      <span className="text-wrapper-6">어디에서 살고 싶으신가요?</span>
                    </div>
                  </div>
                  <div className="search-bar-wrapper">
                    <SearchBar iconSearch="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/icon-search-1.svg" handleSearchMessage = {(data:string) => {}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-8">
            <CardGrid
                cardAnonymousUser="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user-2.svg"
                cardAnonymousUser1="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user-1.svg"
                cardAnonymousUser2="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user.svg"
                cardHeart="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart-2.svg"
                cardHeart1="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart.svg"
                cardImg="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart-1.svg"
                cardText="현재 3명이 룸메 구하는 중"
                cardText1="현재 3명이 룸메 구하는 중"
                cardText2="현재 3명이 룸메 구하는 중"
                className="card-grid-3"
                text=" 추천 매물"
              />
              <CardGrid
                cardAnonymousUser="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user-2.svg"
                cardAnonymousUser1="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user-1.svg"
                cardAnonymousUser2="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/anonymous-user.svg"
                cardHeart="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart-2.svg"
                cardHeart1="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart.svg"
                cardImg="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/heart-1.svg"
                cardText="현재 1명 추가로 구하는 중"
                cardText1="현재 1명 추가로 구하는 중"
                cardText2="현재 1명 추가로 구하는 중"
                className="card-grid-3"
                text=" 모집이 얼마 남지 않은 방"
              />
            </div>
            <div className="advertise" />
            <footer className="footer">
              <div className="flex-container">
                <div className="text">
                  <span className="text-wrapper-5">
                    (주)매드맨션
                    <br />
                  </span>
                </div>
                <div className="text">
                  <span className="text-wrapper-5">
                    대표 : 박병찬, 윤현우
                    <br />
                  </span>
                </div>
                <div className="text">
                  <span className="text-wrapper-5">
                    사업자 번호: 012-34-56789 통신판매업신고번호 : 제2023-대전 유성-00000호
                    <br />
                  </span>
                </div>
                <div className="text">
                  <span className="text-wrapper-5">
                    주소 : 대전시 유성구 대학로 291 카이스트 IT융합빌딩 1층 (주)매드맨션
                    <br />
                  </span>
                </div>
                <div className="text">
                  <span className="text-wrapper-5">
                    <br />
                  </span>
                </div>
                <div className="text">
                  <span className="text-wrapper-5">
                    고객센터 : 02-1234-5678 | 평일 10:00 ~ 18:30, 점심시간 : 12:00 ~ 13:00 (토·일요일, 공휴일 휴무)
                    <br />
                  </span>
                </div>
                <div className="text">
                  <span className="text-wrapper-5">
                    팩스 : 02-1234-5678 프로모션/사업 제휴문의 : pbc1017@kaist.ac.kr
                    <br />
                  </span>
                </div>
                <div className="text">
                  <span className="text-wrapper-5">
                    <br />
                  </span>
                </div>
                <div className="text">
                  <span className="text-wrapper-5">MadMansion, Inc. All rights reserved.</span>
                </div>
              </div>
            </footer>
            
          </div>
        </div>
      </div>
    </div>
  );
};
