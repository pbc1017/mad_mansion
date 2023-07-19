/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, {useState, useEffect} from "react";
import {HorizontalCard} from "components/HorizontalCard"
import "./style.css";
import {useLogin} from  "contexts/LoginContext"
import {House} from "../Map/Map";
import { serverPost } from "utils/severPost";
interface Props {
  className: any;
}

export const WishList = (): JSX.Element => {

  const { setUserProfile } = useLogin();
  const userProfileString = window.localStorage.getItem('userProfile');
  const [wishList, setWishList] = useState<Array<House> | null>([]);
  useEffect(() => {
    const userProfile = window.localStorage.getItem('userProfile');
    if (userProfile) {
      setUserProfile(JSON.parse(userProfile));
    }
  }, [setUserProfile]);

  useEffect(()=> {
    if(userProfileString){
      const userProfile = JSON.parse(userProfileString);
      serverPost("getWishList", { id: userProfile.id}).then((data: Array<House>) => {
        // data.id 가 존재하는 경우에만 로그인을 수행
        setWishList(data);
    });
    }

  }, []);
  return (
    <div className={`wish-list`}>
      <div className="overlap-group">
        <div className="rectangle" />
        <div className="element">관심목록</div>
        <div>
          {wishList?.map(house => <HorizontalCard  house={house}/>)}        
          {(wishList?.length == 0) ? <h1> 목록에 아무것도 없어요</h1> : null}
        </div>
      </div>
    </div>
  );
};
