import React from 'react';
import { Meta } from '@storybook/react';

import { LoginModal, RegisterModal, TermModal, ModalProps } from './index';

export default {
    title: 'Organisms/Modal'
} as Meta;

export const Login = () => <LoginModal />;

export const Register = () => <RegisterModal />;

export const Term = () => <TermModal />;
