import { Meta, StoryObj } from '@storybook/react';
import { default as HeaderLib } from './index';

declare const meta: Meta<typeof HeaderLib>;
export default meta;
type Story = StoryObj<typeof HeaderLib>;
export declare const Default: Story;
export declare const WithDescription: Story;
export declare const WithGoBack: Story;
export declare const WithSearchAndLanguage: Story;
export declare const WithChildren: Story;
