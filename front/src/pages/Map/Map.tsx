import React from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import "./style.css";

export const Map = (): JSX.Element => {
  return (
    <div className="map">
      <div className="div-2">
        <div className="overlap">
          <div className="ellipse" />
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="ellipse-4" />
          <div className="frame-5">
            <div className="text-wrapper-2">3</div>
          </div>
          <div className="frame-6">
            <div className="text-wrapper-2">4</div>
          </div>
          <div className="frame-7">
            <div className="text-wrapper-2">2</div>
          </div>
          <SearchBar
            iconSearch="/img/icon-search.svg"
          />
          <div className="frame-8">
            <Card
              anonymousUser="/img/anonymous-user-6.svg"
              className="card-instance"
              text = ""
              heart="/img/heart-6.svg"
            />
            <Card anonymousUser="/img/anonymous-user-5.svg" className="card-instance" text = "" heart="/img/heart-5.svg" />
            <Card anonymousUser="/img/anonymous-user-4.svg" className="card-instance" text = "" heart="/img/heart-4.svg" />
            <Card anonymousUser="/img/anonymous-user-3.svg" className="card-instance" text = "" heart="/img/heart-3.svg" />
            <Card anonymousUser="/img/anonymous-user-2.svg" className="card-instance" text = "" heart="/img/heart-2.svg" />
            <Card anonymousUser="/img/anonymous-user-1.svg" className="card-instance" text = "" heart="/img/heart-1.svg" />
          </div>
        </div>
        <Header className="header-instance" loginLogo="/img/login-logo.svg" />
      </div>
    </div>
  );
};
