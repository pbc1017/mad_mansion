/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import userSvg from "assets/images/anonymous_user.svg";
import AcceptModal from "components/AcceptModal";
import React, {useState} from "react";
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
  manshion: Manshion
}

export const MansionList = ({ className, manshion}: Props): JSX.Element => {
  console.log(manshion);

  const [isPostAddingModalOpen, setisPostAddingModalOpen] = useState<boolean>(false);

  const handleOpenAddModal = () => {
    setisPostAddingModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setisPostAddingModalOpen(false);
  };

  return (
    <div className={`mansion-list ${className}`} onClick={handleOpenAddModal}>
      <img className="rectangle" src={manshion.imgUrl}/>
      <div className="element-2">{manshion.title}</div>
      <div className="pbc">방장: {manshion.king}</div>
      {manshion.priceType =="전세"? <div className="element-3">{manshion.priceType} {manshion.priceFirst}만원</div> : <div className="element-3">{manshion.priceType} {manshion.priceFirst}/{manshion.priceMonth}만원</div>}
      <div className="element-4">{manshion.address}</div>
      <div className="element-5">{manshion.maxmembers}인실</div>
      <div className="element-6">{manshion.members}명 / {manshion.maxmembers}명</div>
      <img className="anonymous-user" alt="Anonymous user" src={userSvg} />
      {isPostAddingModalOpen && (
        <div className="modal-container">
          <AcceptModal onClose={handleCloseAddModal} placeId ={manshion.id} />
        </div>
      )}
    </div>
  );
};
