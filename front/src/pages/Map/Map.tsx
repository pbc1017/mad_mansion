import React, {useState, useEffect, useCallback} from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import {KakaoMap} from "../../components/KakaoMap"; 
import {PositionProps} from "../../components/KakaoMap/KakaoMap"
import "./style.css";
import logoSvg from "assets/images/logo.svg"
import searchSvg from "assets/images/search.svg"
import { useLogin } from "contexts/LoginContext";

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

export interface MapProps {
    addressProp: string
}

export const Map = ({addressProp}: MapProps): JSX.Element => {

  const { setUserId } = useLogin();

  useEffect(() => {
    const userId = window.localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
    }
  }, [setUserId]);

  const [info, setInfo] = useState<Info>();
  const [positions, setPositions] = useState<any>();
  const [address, setAddresss] = useState<string>(addressProp);
  
  const handleSetInfo = useCallback((data:Info) => {
    setInfo(data);
    //setInfo까지.then()안에 다 넣으면 됨!
  }, []);

  useEffect(()=>{
    
    setPositions([
      {
          "title": "카카오",
          "latitude": 33.450705,
          "longitude": 126.570677
      },
      {
          "title": "생태연못",
          "latitude": 33.450936,
          "longitude": 126.569477
      },
      {
          "title": "텃밭",
          "latitude": 33.450879,
          "longitude": 126.56994
      },
      {
          "title": "근린공원",
          "latitude": 33.451393,
          "longitude": 126.570738
      }
    ]);

  }, [info]);

  const handleSetAddress = useCallback((data : string) => {
      setAddresss(data)
  }, []);

  return (
    <div className="map">
      <div className="div-2">
        <div className="overlap">
          <KakaoMap address = {address? address : "제주도"} positions = {positions ? positions : ''} setMapInfo = {handleSetInfo}/>
          <SearchBar
            iconSearch={searchSvg}
            handleSearchMessage={handleSetAddress}
          />
          <div className="frame-8">
            <Card className="card-instance"text = ""/>
            <Card className="card-instance" text = "" />
            <Card className="card-instance" text = "" />
            <Card className="card-instance" text = "" />
            <Card className="card-instance" text = "" />
            <Card className="card-instance" text = "" />
          </div>
        </div>
        <Header className="header-instance" loginLogo={logoSvg} />
      </div>
    </div>
  );
};