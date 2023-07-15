// index.stories.tsx

import React from 'react';
import { Meta } from '@storybook/react';
import { KakaoMap, KakaoMapProps } from './index';
import MapData from 'utils/MapData.json'; // 추가

export default {
    title: 'Atoms/KakaoMap',
    component: KakaoMap
} as Meta;

export const general = (args: KakaoMapProps) => <KakaoMap {...args} />;
general.args = {
    address: '카카오 본사',
    positions: MapData.positions // 변경
};