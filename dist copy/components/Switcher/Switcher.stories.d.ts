import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').SwitcherProps & import('react').RefAttributes<HTMLButtonElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        status: {
            control: "boolean";
            description: string;
        };
        disabled: {
            control: "boolean";
            description: string;
        };
        onChange: {
            action: string;
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Off: Story;
export declare const On: Story;
export declare const DisabledOff: Story;
export declare const DisabledOn: Story;
export declare const AllStates: Story;
export declare const Controlled: Story;
export declare const WithLabels: Story;
export declare const InSettingsForm: Story;
export declare const InPermissionsTable: Story;
export declare const WithDetailedCallback: Story;
export declare const MultipleSwitches: Story;
export declare const InConfigCard: Story;
