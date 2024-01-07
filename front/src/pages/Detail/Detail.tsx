import React, { useEffect, useState } from "react";
import { Header } from "components/Header";
import { RoomInfo } from "components/RoomInfo";
import { useLocation } from 'react-router-dom';
import { useLogin } from "contexts/LoginContext";
import prevSvg from "assets/images/prev.svg";
import nextSvg from "assets/images/next.svg";
import logoSvg from "assets/images/logo.svg";
import addSvg from "assets/images/add_button.svg";
import {serverPost} from '../../utils/severPost'
import PostingAddModal from 'components/PostingAddModal'
import PostingViewModal from 'components/PostingViewModal'
import "./style.css";

interface House {
  _id: string;
  id: string;
  priceType: string;
  priceFirst: number;
  priceMonth: number;
  description: string;
  floor: string;
  area: number;
  fee: number;
  roomType: string;
  roomNum: number;
  address: string;
  latitude: number;
  longitude: number;
  detailUrl: string;
  imageUrl: string;
  postingList: any[];
}

export type Posting = {
  _id : string,
  maxNum : number,
  title : string,
  content : string,
  writer : string,
  placeId : string,
  members : string[]
}
export const Detail = (): JSX.Element => {
  const { setUserProfile } = useLogin();
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('detail');
  console.log(query)

  const [postings, setPostings] = useState<Array<Posting> | null>(null);
  const [house, setHouse] = useState<House>();

  const [isPostAddingModalOpen, setisPostAddingModalOpen] = useState<boolean>(false);

  const handleOpenAddModal = () => {
    setisPostAddingModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setisPostAddingModalOpen(false);
  };
  const [postingToView, setPostingToView] = useState<Posting | null>(null);
  
  const handlePostingToView = (Posting: Posting | null) => {
    setPostingToView(Posting);
  }

  useEffect(() => {
    const userProfile = window.localStorage.getItem('userProfile');
    if (userProfile) {
      setUserProfile(JSON.parse(userProfile));
    }
  }, [setUserProfile]);

  console.log(query);
  useEffect(()=>{

    serverPost("getPostingsfromHouse", { placeId : query })
      .then((data: any) => {
        if (data) {
            setPostings(data);
        } else {
          console.log("포스팅 실패 혹은 없음")
        }
      });
    serverPost("getDetail", { id : query })
      .then((data: any) => {
        if (data) {
            setHouse(data);
        } else {
          console.log("상세보기 실패 혹은 없음")
        }
      });
      
  },[]);

  function randDiv() {
    switch(Math.floor(Math.random() * 4)){
      case 0: return <div className="text-wrapper-4">북향</div>
      case 1: return <div className="text-wrapper-4">남향</div>
      case 2: return <div className="text-wrapper-4">동향</div>
      case 3: return <div className="text-wrapper-4">서향</div>
    }
  }

  return (
    <div className="detail">
      <div className="frame-wrapper">
        <div className="frame-3">
          <Header className="header-instance" loginLogo={logoSvg} />
          <div className="frame-4">
            <img className="frame-5" src={house?.imageUrl}>
              {/* <img className="prev" alt="Prev" src={prevSvg} />
              <img className="next" alt="Next" src={nextSvg} /> */}
            </img>
            <div className="overlap-group-wrapper">
               
              <div className="overlap-group">
                <h1 className="h-1">룸메이트 구합니다</h1>
                <img className="add-button" alt="Add button" onClick = {handleOpenAddModal} src={addSvg} />
                  
                <div className="frame-6">
                  {postings ? postings.map((posting: Posting, index:number) => (
                    <RoomInfo key={index} onClickSendPosting={handlePostingToView} className="room-info-instance" Posting={posting} />
                  )): null}
                </div>

              </div>
            </div>
          </div>
          <div className="group">
            <div className="frame-7">
              <div className="title">{house?.description}</div>
              <div className="text-wrapper-2">가격정보</div>
              <div className="frame-8">
                <div className="group-2">
                  <div className="text-wrapper-3">{house?.priceType}</div>
                  {house?.priceType =="전세"? <div className="text-wrapper-4">{house?.priceFirst}만원</div> : <div className="text-wrapper-4">{house?.priceFirst}/{house?.priceMonth}만원</div>}
                </div>
                <div className="group-3">
                  <div className="text-wrapper-3">융자금</div>
                  <div className="text-wrapper-4">-</div>
                </div>
                <div className="group-4">
                  <div className="text-wrapper-3">관리비</div>
                  <div className="text-wrapper-4">매월 {house?.fee}만원</div>
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
                  <div className="text-wrapper-4">{house?.roomType}</div>
                </div>
                <div className="group-3">
                  <div className="text-wrapper-3">해당층</div>
                  <div className="text-wrapper-4">{house?.floor}</div>
                </div>
                <div className="group-4">
                  <div className="text-wrapper-3">전용면적</div>
                  <div className="text-wrapper-4">{house?.area}m²</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">방 수/욕실 수</div>
                  <div className="text-wrapper-4">{house?.roomNum}개/1개</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">방향</div>
                  {randDiv()}
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">총 주차대수</div>
                  <div className="text-wrapper-4">{Math.floor(Math.random() * 5)+1}대</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">현관 유형</div>
                  <div className="text-wrapper-4">계단식</div>
                </div>
                <div className="group-5">
                  <div className="text-wrapper-3">입주가능일</div>
                  <div className="text-wrapper-4">즉시입주</div>
                </div>
                <div className="group-6">
                  <div className="text-wrapper-3">건축물용도</div>
                  <div className="text-wrapper-4">단독주택</div>
                </div>
                <div className="group-6">
                  <div className="text-wrapper-3">사용승인일</div>
                  <div className="text-wrapper-4">20{Math.floor(Math.random() * 10)+10}.0{Math.floor(Math.random() * 9)+1}.1{Math.floor(Math.random() * 9)+1}</div>
                </div>
                <div className="group-6">
                  <div className="text-wrapper-3">최초등록일</div>
                  <div className="text-wrapper-4">2023.07.0{Math.floor(Math.random() * 9)+1}</div>
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
        {postingToView && (
          <div className="modal-container">
            <PostingViewModal onClose={handlePostingToView} Posting = {postingToView}/>
          </div>
        )}  
        {isPostAddingModalOpen && (
          <div className="modal-container">
            <PostingAddModal onClose={handleCloseAddModal} placeId = {query? query : ''} />
          </div>
        )}
      </div>
    </div>
  );
};
