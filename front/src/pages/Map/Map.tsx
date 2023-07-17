import React, {useState, useEffect, useCallback} from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import {KakaoMap} from "../../components/KakaoMap"; 
import { serverPost } from 'utils/severPost';
import {PositionProps} from "../../components/KakaoMap/KakaoMap"
import "./style.css";
import logoSvg from "assets/images/logo.svg"
import searchSvg from "assets/images/search.svg"
import { useLogin } from "contexts/LoginContext";
import { useLocation } from 'react-router-dom';

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
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query');
  
  const handleSetInfo = useCallback((data:Info) => {
    setInfo(data);
    //setInfo까지.then()안에 다 넣으면 됨!
  }, []);

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
        }
      });
    }
}, [info]);


  const handleSetAddress = useCallback((data : string) => {
    setAddresss(data)
  }, []);

  useEffect(() => {
    if (query) {
      handleSetAddress(decodeURIComponent(query));
    }
  }, [query, handleSetAddress]);

  return (
    <div className="map">
      <div className="div-2">
        <div className="overlap">
          <KakaoMap address = {address? address : "카이스트 IT융합빌딩"} positions = {positions ? positions : ''} setMapInfo = {handleSetInfo}/>
          <SearchBar iconSearch={searchSvg} handleSearchMessage={handleSetAddress} searchAddress={query ? decodeURIComponent(query) : ''} />
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