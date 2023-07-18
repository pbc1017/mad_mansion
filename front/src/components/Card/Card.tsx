import PropTypes from "prop-types";
import React, { useEffect , useState} from "react";
import { UserProfile } from "contexts/LoginContext";
import userSvg from "assets/images/anonymous_user.svg"
import heartSvg from "assets/images/heart.svg"
import logoSvg from "assets/images/logo.svg"
import emptyHearSvg from "assets/images/emptyHeart.svg"
import { serverPost } from 'utils/severPost';
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
  roomList: any[];
}

interface Props {
  className: any;
  house?: House;
}

export const Card = ({
  className,
  house,
}: Props): JSX.Element => {
    const [isHouseInWishlist, setIsHouseInWishlist] = useState<boolean>(false);
    let userProfileString = window.localStorage.getItem('userProfile');
    console.log(userProfileString);
    useEffect(() => {
      if (userProfileString) {
        console.log(userProfileString);
        const userProfile = JSON.parse(userProfileString) as UserProfile;
        console.log(userProfile.wishList);
        if (house && userProfile?.wishList.includes(house?.id)) {
          setIsHouseInWishlist(true);
        }
        else setIsHouseInWishlist(false);
      }
    }, [house]);
    
    const handleClick = async () => {

    if (house) {
      if(userProfileString) {
        const userProfile = JSON.parse(userProfileString) as UserProfile;
        console.log(userProfile.id);
          serverPost("clickHeart", { userId : userProfile.id, houseId: house.id, isHouseInWishlist : isHouseInWishlist })
          .then((data: any) => {
          // data.id 가 존재하는 경우에만 로그인을 수행
            console.log(data)
            if (data) {
                
                userProfileString = JSON.stringify(data);  // 컨텍스트의 상태 변경
                console.log("저장 잘 됨?");
                
                
                setIsHouseInWishlist(!isHouseInWishlist);
                window.localStorage.setItem('userProfile',userProfileString);
                  // 홈페이지로 이동
            } else {
            }
          });
        }
      }
    };
  return (
    <div className={`card ${className}`}>
      {house ? (
        <div className="overlap-group">
          <div className="frame-3">
            <img className="rectangle" src={house?.imageUrl} />
            <div className="frame-4">
              <div className="element-2">{house?.priceType} {house?.priceFirst} / {house?.priceMonth}</div>
              <div className="element-wrapper">
                <div className="element-m">33m2</div>
              </div>
            </div>
            <div className="element-3">
              풀옵션, 신축, 리모델링, 
            </div>
            <div className="frame-5">
              <img className="anonymous-user" alt="Anonymous user" src={userSvg} />
              <p className="p">{house?.address}</p>
            </div>
          </div>
          <img className="heart" alt="Heart" onClick={handleClick} src={isHouseInWishlist ? heartSvg : emptyHearSvg}

 />
        </div>
      ) : (
        <img className="logo" alt="Logo" src={logoSvg} /> // 이곳에 로고의 경로를 넣으세요
      )}
    </div>
  );
};

Card.propTypes = {
  anonymousUser: PropTypes.string,
  heart: PropTypes.string,
  text: PropTypes.string,
};
