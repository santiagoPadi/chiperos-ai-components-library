import { Meta, StoryObj } from '@storybook/react';
import { PaginationLib } from './';

declare const meta: Meta<typeof PaginationLib>;
export default meta;
type Story = StoryObj<typeof PaginationLib>;
export declare const Default: Story;
export declare const MiddlePage: Story;
export declare const LastPage: Story;
export declare const ManyPages: Story;
export declare const FewPages: Story;
