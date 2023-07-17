import React, { createContext, useState, useContext, useCallback } from 'react';
import { serverPost } from 'utils/severPost';
import { PositionProps } from 'components/KakaoMap/KakaoMap';
import { Info } from '../pages/Map/Map';

interface MapContextProps {
  info: Info | undefined;
  setInfo: React.Dispatch<React.SetStateAction<Info | undefined>>;
  positions: PositionProps[] | undefined;
  setPositions: React.Dispatch<React.SetStateAction<PositionProps[] | undefined>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  handleSetInfo: (data: Info) => void;
  handleSetAddress: (data: string) => void;
}
interface IProps {
  children: React.ReactNode;
}
const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider = ({ children }:IProps) => {
  const [info, setInfo] = useState<Info>();
  const [positions, setPositions] = useState<any>();
  const [address, setAddress] = useState<string>('');

  const handleSetInfo = useCallback((data: Info) => {
    setInfo(data);
    if (data) {
      serverPost("map", data).then((res: any) => {
        console.log(res);
      });
    }
    // You can fetch positions from server here and set it
    setPositions([
      //...
    ]);
  }, []);

  const handleSetAddress = useCallback((data: string) => {
    setAddress(data);
  }, []);

  return (
    <MapContext.Provider value={{ info, setInfo, positions, setPositions, address, setAddress, handleSetInfo, handleSetAddress }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};
