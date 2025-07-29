import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface CommonButtonProps extends ButtonProps {
    label: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({ label, ...props }) => {
    return (
        <Button {...props}>
            {label}
        </Button>
    );
};

export default CommonButton;