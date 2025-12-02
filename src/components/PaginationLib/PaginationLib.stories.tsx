import type { Meta, StoryObj } from '@storybook/react';
import { PaginationLib } from './';
import { useState } from 'react';

const meta: Meta<typeof PaginationLib> = {
  title: 'Components/PaginationLib',
  component: PaginationLib,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    onPageChange: { action: 'pageChanged' },
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    return (
      <PaginationLib
        {...args}
        currentPage={currentPage}
        onPageChange={(page) => {
          args.onPageChange(page);
          setCurrentPage(page);
        }}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof PaginationLib>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const ManyPages: Story = {
    args: {
      currentPage: 25,
      totalPages: 50,
    },
  };

export const FewPages: Story = {
    args: {
      currentPage: 2,
      totalPages: 3,
    },
};
