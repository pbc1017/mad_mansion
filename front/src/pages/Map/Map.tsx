import React from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import {KakaoMap} from "../../components/KakaoMap"; 
import searchSvg from "assets/images/search.svg"
import logoSvg from "assets/images/logo.svg"
import "./style.css";

export const Map = (): JSX.Element => {
  return (
    <div className="map">
      <div className="div-2">
        <Header className="header-instance" loginLogo={logoSvg} />
        <div className="overlap">
          <SearchBar iconSearch={searchSvg}/>
          <KakaoMap/>
          <div className="frame-8">
            <Card anonymousUser="/img/anonymous-user-6.svg" className="card-instance" text = "" heart="/img/heart-6.svg" />
            <Card anonymousUser="/img/anonymous-user-5.svg" className="card-instance" text = "" heart="/img/heart-5.svg" />
            <Card anonymousUser="/img/anonymous-user-4.svg" className="card-instance" text = "" heart="/img/heart-4.svg" />
            <Card anonymousUser="/img/anonymous-user-3.svg" className="card-instance" text = "" heart="/img/heart-3.svg" />
            <Card anonymousUser="/img/anonymous-user-2.svg" className="card-instance" text = "" heart="/img/heart-2.svg" />
            <Card anonymousUser="/img/anonymous-user-1.svg" className="card-instance" text = "" heart="/img/heart-1.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
