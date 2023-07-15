import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Find } from './index';

export default {
    title: 'Page/Find'
} as Meta;

const Template: Story = (args) => <Find {...args} />;

export const general = Template.bind({});
