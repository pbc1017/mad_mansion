import React, {useEffect, useState} from "react";
import { Card } from "components/Card";
import { CardGrid } from "components/CardGrid";
import { Header } from "components/Header";
import { SearchBar } from "components/SearchBar";
import { useLogin } from "contexts/LoginContext";
import { useNavigate } from 'react-router-dom';
import {House} from 'pages/Map/Map'
import backgroundPng from "assets/images/background.png";
import backgroundSvg from "assets/images/background.svg";
import "./style.css";
import { serverPost } from "utils/severPost";

export const Home = (): JSX.Element => {

  const { setUserProfile } = useLogin();
  const navigate = useNavigate();
  const [houseList, setHouseList] = useState<Array<House>>([]);
  useEffect(() => {
    const userProfile = window.localStorage.getItem('userProfile');
    if (userProfile) {
      setUserProfile(JSON.parse(userProfile));
    }
  }, [setUserProfile]);

  useEffect(()=> {
    let newHouseList : Array<House> = [];
    serverPost("getRandomThreeHouse", {}).then((data: Array<House>) => {
        // data.id 가 존재하는 경우에만 로그인을 수행
        newHouseList = newHouseList.concat(data);
        serverPost("getRandomThreeHouse", {}).then((data: Array<House>) => {
        // data.id 가 존재하는 경우에만 로그인을 수행
        newHouseList = newHouseList.concat(data);
        setHouseList(newHouseList);
        console.log(newHouseList);
      });
    });
    
  }, [])

  const handleSearchMessage = (data: string) => {
    navigate(`/map?query=${encodeURIComponent(data)}`);
  }

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
              <img className="image" alt="Image" src={backgroundPng} />
              <div className="img" />
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
                    <SearchBar iconSearch="https://generation-sessions.s3.amazonaws.com/0627cb45cfa9c396bc157d60b09da0a5/img/icon-search-1.svg" handleSearchMessage={handleSearchMessage} />
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-8">
              <CardGrid 
                className={"암거나"}
                text=" 추천 매물"
                house1={houseList[0]}
                house2={houseList[1]}
                house3={houseList[2]}
              />
              <CardGrid
                className={"암거나"}
                house1={houseList[3]}
                house2={houseList[4]}
                house3={houseList[5]}
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
