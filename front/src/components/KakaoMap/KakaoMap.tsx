// index.ts

import React, { useCallback, useEffect, useRef } from 'react';
import * as S from './style';
import type {Info} from '../../pages/Map/Map'

declare const kakao: any; // for using kakao map sdk


// 위치 데이터 type 정의
export interface PositionProps {
    title: string;
    latitude: number;
    longitude: number;
    
}

export interface KakaoMapProps {
    address?: string;
    positions?: Array<PositionProps>;
    height?: string;
    setMapInfo: (data: Info) => void;
}



export function KakaoMap({ address, positions, height = '100%', setMapInfo}: KakaoMapProps): React.ReactElement {
    const kakaoMapRef = useRef<HTMLDivElement>(null);
    const kakaoMapRealRef = useRef<any>(null);
    const optionRef = useRef<any>(null);
    let info : any = null;

    const onMapEvent = useCallback(function() {        
        // 지도 중심좌표를 얻어옵니다 
            info = {swLatLng: {
                lat: kakaoMapRealRef.current.getBounds().getSouthWest().getLat(),
                lng: kakaoMapRealRef.current.getBounds().getSouthWest().getLng(),
              },neLatLng: {
                lat: kakaoMapRealRef.current.getBounds().getNorthEast().getLat(),
                lng: kakaoMapRealRef.current.getBounds().getNorthEast().getLng(),
              },
            };

            optionRef.current = {
            center: new kakao.maps.LatLng(kakaoMapRealRef.current.getCenter().getLat(), kakaoMapRealRef.current.getCenter().getLng()),
            level : kakaoMapRealRef.current.getLevel()
            };

            console.log(optionRef.current);
            setMapInfo(info);
        },[]);
    useEffect(() => {
        const kakaoMapElement = kakaoMapRef.current;
        optionRef.current = optionRef.current ? optionRef.current : {
            center: new kakao.maps.LatLng(37.566826, 160.9786567),
            level: 3
        };
        kakaoMapRealRef.current = kakaoMapRealRef.current? kakaoMapRealRef.current : new kakao.maps.Map(kakaoMapElement, optionRef.current);
        const ps = new kakao.maps.services.Places();

       
        function placesSearchCB(data: any, status: any, pagination: any) {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();

                for (var i = 0; i < data.length; i++) {
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                kakaoMapRealRef.current.setBounds(bounds);
                optionRef.current = {
                center: new kakao.maps.LatLng(kakaoMapRealRef.current.getCenter().getLat(), kakaoMapRealRef.current.getCenter().getLng()),
                level : kakaoMapRealRef.current.getLevel()
                };
                info = {swLatLng: {
                lat: kakaoMapRealRef.current.getBounds().getSouthWest().getLat(),
                lng: kakaoMapRealRef.current.getBounds().getSouthWest().getLng(),
                },
                neLatLng: {
                lat: kakaoMapRealRef.current.getBounds().getNorthEast().getLat(),
                lng: kakaoMapRealRef.current.getBounds().getNorthEast().getLng(),
                },
                };

                console.log(optionRef.current.center);
                setMapInfo(info);
            }
        }

        
        ps.keywordSearch(address, placesSearchCB);
        
        
        kakao.maps.event.addListener(kakaoMapRealRef.current, 'idle', onMapEvent);
    }, [address]);


    useEffect(()=>{
        if (positions) {
            const kakaoMapElement = kakaoMapRef.current;
            
            kakaoMapRealRef.current = kakaoMapRealRef.current ? kakaoMapRealRef.current : new kakao.maps.Map(kakaoMapElement, optionRef.current);
            // 마커 클러스터러를 생성합니다
            
            var clusterer = new kakao.maps.MarkerClusterer({
                map: kakaoMapRealRef.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
                averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                minLevel: 0 // 클러스터 할 최소 지도 레벨
            });

            // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
            var markers = positions.map(function (position: any, i: any) {
                return new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(position.latitude, position.longitude)
                });
            });

            // 클러스터러에 마커들을 추가합니다
            clusterer.addMarkers(markers);
        }
    }, [positions]);

    return <S.Container ref={kakaoMapRef} height={height} />;
}