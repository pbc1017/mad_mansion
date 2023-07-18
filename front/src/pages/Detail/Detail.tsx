import React from "react";
import { Header } from "components/Header";
import { RoomInfo } from "components/RoomInfo";
import prevSvg from "assets/images/prev.svg";
import nextSvg from "assets/images/next.svg";
import logoSvg from "assets/images/logo.svg";
import addSvg from "assets/images/add_button.svg";
import "./style.css";

export const Detail = (): JSX.Element => {
  return (
    <div className="detail">
      <div className="frame-wrapper">
        <div className="frame-3">
          <Header className="header-instance" loginLogo={logoSvg} />
          <div className="frame-4">
            <div className="frame-5">
              <img className="prev" alt="Prev" src={prevSvg} />
              <img className="next" alt="Next" src={nextSvg} />
            </div>
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <h1 className="h-1">룸메이트 구합니다</h1>
                <img className="add-button" alt="Add button" src={addSvg} />
                <div className="frame-6">
                  <RoomInfo className="room-info-instance" />
                  <RoomInfo className="room-info-instance" />
                  <RoomInfo className="room-info-instance" />
                  <RoomInfo className="room-info-instance" />
                  
                </div>
              </div>
            </div>
          </div>
          <div className="group">
            <div className="frame-7">
              <div className="text-wrapper-2">가격정보</div>
              <div className="frame-8">
                <div className="group-2">
                  <div className="text-wrapper-3">월세</div>
                  <div className="text-wrapper-4">9500</div>
                </div>
                <div className="group-3">
                  <div className="text-wrapper-3">융자금</div>
                  <div className="text-wrapper-4">-</div>
                </div>
                <div className="group-4">
                  <div className="text-wrapper-3">관리비</div>
                  <div className="text-wrapper-4">매월 3만원</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">주차가능여부</div>
                  <div className="text-wrapper-4">가능</div>
                </div>
              </div>
              <img className="line" alt="Line" src="/img/line-1.svg" />
              <div className="text-wrapper-5">상세정보</div>
              <div className="frame-9">
                <div className="group-2">
                  <div className="text-wrapper-3">방종류</div>
                  <div className="text-wrapper-4">9500</div>
                </div>
                <div className="group-3">
                  <div className="text-wrapper-3">해당층/건물층</div>
                  <div className="text-wrapper-4">-</div>
                </div>
                <div className="group-4">
                  <div className="text-wrapper-3">전용/공급면적</div>
                  <div className="text-wrapper-4">매월 3만원</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">방 수/욕실 수</div>
                  <div className="text-wrapper-4">가능</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">방향</div>
                  <div className="text-wrapper-4">가능</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">총 주차대수</div>
                  <div className="text-wrapper-4">가능</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">현관 유형</div>
                  <div className="text-wrapper-4">가능</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">입주가능일</div>
                  <div className="text-wrapper-4">가능</div>
                </div>
                <div className="group-6">
                  <div className="text-wrapper-3">건축물용도</div>
                  <div className="text-wrapper-4">계단식</div>
                </div>
                <div className="group-6">
                  <div className="text-wrapper-3">사용승인일</div>
                  <div className="text-wrapper-4">계단식</div>
                </div>
                <div className="group-6">
                  <div className="text-wrapper-3">최초등록일</div>
                  <div className="text-wrapper-4">계단식</div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="flex-container">
              <div className="text">
                <span className="span">
                  (주)매드맨션
                  <br />
                </span>
              </div>
              <div className="text">
                <span className="span">
                  대표 : 박병찬, 윤현우
                  <br />
                </span>
              </div>
              <div className="text">
                <span className="span">
                  사업자 번호: 012-34-56789 통신판매업신고번호 : 제2023-대전 유성-00000호
                  <br />
                </span>
              </div>
              <div className="text">
                <span className="span">
                  주소 : 대전시 유성구 대학로 291 카이스트 IT융합빌딩 1층 (주)매드맨션
                  <br />
                </span>
              </div>
              <div className="text">
                <span className="span">
                  <br />
                </span>
              </div>
              <div className="text">
                <span className="span">
                  고객센터 : 02-1234-5678 | 평일 10:00 ~ 18:30, 점심시간 : 12:00 ~ 13:00 (토·일요일, 공휴일 휴무)
                  <br />
                </span>
              </div>
              <div className="text">
                <span className="span">
                  팩스 : 02-1234-5678 프로모션/사업 제휴문의 : pbc1017@kaist.ac.kr
                  <br />
                </span>
              </div>
              <div className="text">
                <span className="span">
                  <br />
                </span>
              </div>
              <div className="text">
                <span className="span">MadMansion, Inc. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
