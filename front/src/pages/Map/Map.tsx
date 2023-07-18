import React, {useState, useEffect, useCallback} from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import {KakaoMap} from "../../components/KakaoMap"; 
import { serverPost } from 'utils/severPost';
import { useLogin } from "contexts/LoginContext";
import { useLocation } from 'react-router-dom';

import logoSvg from "assets/images/logo.svg";
import searchSvg from "assets/images/search.svg";
import nextSvg from "assets/images/next.svg";
import prevSvg from "assets/images/prev.svg";
import "./style.css";

export type Info = {
  swLatLng :{
    lat : number
    lng : number
  }
  neLatLng :{
    lat : number
    lng : number
  }
}

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

function getSortedHouses(current_lat: number, current_lng: number, page: number, data: House[]): House[] {
  if (!data || !Array.isArray(data) || !data.length) {
      console.error('Invalid data');
      return [];
  }

  if (typeof current_lat !== 'number' || typeof current_lng !== 'number') {
      console.error('Invalid current_lat or current_lng');
      return [];
  }

  // L1 distance 기준으로 정렬
  const sortedHouses = [...data].sort((a, b) => {
      const distA = Math.abs(a.latitude - current_lat) + Math.abs(a.longitude - current_lng);
      const distB = Math.abs(b.latitude - current_lat) + Math.abs(b.longitude - current_lng);
      return distA - distB;
  });

  // Page에 맞게 데이터를 자르기
  const start = (page - 1) * 6;
  const end = start + 6;
  const houses = sortedHouses.slice(start, end);

  return houses;
}


export interface MapProps {
    addressProp: string
}

export const Map = ({addressProp}: MapProps): JSX.Element => {

  const { setUserProfile } = useLogin();
  const [info, setInfo] = useState<Info>();
  const [positions, setPositions] = useState<any>();
  const [address, setAddresss] = useState<string>(addressProp);
  const [page, setPage] = useState<number>(1);
  const [houses, setHouses] = useState<House[]>([]);
  const [isNext, setNext] = useState<Boolean>(false);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query');
  
  const handleSetInfo = useCallback((data:Info) => {
    setInfo(data);
    setPage(1);  // 페이지를 1로 리셋
  }, []);

  useEffect(() => {
    const userProfile = window.localStorage.getItem('userProfile');
    if (userProfile) {
      setUserProfile(JSON.parse(userProfile));
    }
  }, [setUserProfile]);

  useEffect(()=>{
    console.log(info);
    if(info) {
      serverPost("map", info).then((data: any) => {
        // data가 정의되어 있는지 확인
        if(data) {
          setPositions(data.map((item: { address: any; latitude: any; longitude: any; }) => ({
            title: item.address,
            latitude: item.latitude,
            longitude: item.longitude,
          }))); 
          setHouses(getSortedHouses((info.swLatLng.lat+info.neLatLng.lat)/2, (info.swLatLng.lng+info.neLatLng.lng)/2, page, data));
          if (getSortedHouses((info.swLatLng.lat+info.neLatLng.lat)/2, (info.swLatLng.lng+info.neLatLng.lng)/2, page + 1, data).length > 0) {
            setNext(true);
          }
          else {
            setNext(false);
          }
          // console.log(houses);
        }
      });
    }
  }, [info, page]);

  useEffect(() => {
    setPage(1); // info가 변경되었을 때 page를 1로 설정
  }, [info]);

  const handleSetAddress = useCallback((data : string) => {
    setAddresss(data);
  }, []);

  const handleNext = () => {
    if (isNext) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="map">
      <div className="div-2">
        <div className="overlap">
          <KakaoMap address = {address? address : "카이스트 IT융합빌딩"} positions = {positions ? positions : ''} setMapInfo = {handleSetInfo}/>
          <SearchBar iconSearch={searchSvg} handleSearchMessage={handleSetAddress} searchAddress={query ? decodeURIComponent(query) : ''} />
          <div className="frame-8">
            <div className="frame-cards">
            {houses.map((house:House, i: number) => (
              <Card key={i} className="card-instance" house={house} />
            ))}
            {houses && houses.length < 6 && Array(6 - houses.length).fill(0).map((_, i) => (
              <Card key={i + houses.length} className="card-instance" />
            ))}
            </div>
            <div className="next-wrapper" onClick={handleNext}>
              <img className="next" alt="next" src={nextSvg}/>
            </div>
            <div className="prev-wrapper" onClick={handlePrev}>
              <img className="prev" alt="prev" src={prevSvg}/>
            </div>
          </div>
        </div>
        <Header className="header-instance" loginLogo={logoSvg} />
      </div>
    </div>
  );
};