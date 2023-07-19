import PropTypes from "prop-types";
import React, {useState, useEffect} from "react";
import { MansionList } from "../MansionList";
import "./style.css";

export type Manshion = {
  state: string,
  title: string, 
  king: string, 
  members: string, 
  priceType: string, 
  priceFirst: string, 
  priceMonth: string, 
  maxmembers: string, 
  address: string,
  imgUrl:string,
  id:string
}

interface Props {
  className: any;
  text: string;
  text1: string;
  text2: string;
  text3: string;
  Manshions : Array<Array<Manshion>>|null;
}

export const ManshionView = ({
  className,
  text = "내가 신청한 맨션 목록",
  text1 = "가입 완료된 맨션",
  text2 = "가입 대기중인 맨션",
  text3 = "가입 거절된 맨션",
  Manshions =[]
}: Props): JSX.Element => {
  
  const [accepted, setAccepted] = useState<Array<Manshion>>([]);
  const [waiting, setWaiting] = useState<Array<Manshion>>([]);
  const [denied, setDenied] = useState<Array<Manshion>>([]);

  useEffect(() => {
    if(Manshions) {
      setAccepted(Manshions[0]);
      setWaiting(Manshions[1]);
      setDenied(Manshions[2]);
    }
  }, [Manshions]);

  // Helper function to render a group of MansionList items
  const renderMansionList = (items: Array<Manshion>) => 
    items.map((item, index) => <MansionList key={index} className="mansion-list-instance" manshion={item}/>);
  
  return (
    <div className={`manshion-view ${className}`}>
      <div className="rectangle-2" />
      <div className="frame-3">
        <div className="element-7">{text}</div>
        <div className="element-8">{text1} ({accepted.length})</div>
        {renderMansionList(accepted)}
        <div className="element-8">{text2} ({waiting.length})</div>
        {renderMansionList(waiting)}
        <div className="element-8">{text3} ({denied.length})</div>
        {renderMansionList(denied)}
      </div>
    </div>
  );
};
