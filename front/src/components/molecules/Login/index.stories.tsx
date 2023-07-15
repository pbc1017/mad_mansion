import React from 'react';
import { Meta } from '@storybook/react';
import { Login } from './index';

export default {
    title: 'Molecules/LoginComponent'
} as Meta;

export const general = () => <Login className="login"/>;