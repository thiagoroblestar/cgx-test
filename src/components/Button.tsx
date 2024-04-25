import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
    additionalClasses?: string;
    variant?: "contained" | "outlined";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ type, children, variant = 'contained', additionalClasses = "", onClick }) => {

    const baseClasses = 'py-2 px-5 rounded focus:outline-none focus:shadow-outline';
    const variantClasses = variant === 'outlined'
        ? 'bg-transparent border border-gray-500 hover:border-gray-700'
        : 'bg-blue-500 hover:bg-blue-700 text-white';

    const classes = twMerge(baseClasses, variantClasses, additionalClasses);

    return (
        <button
            className={classes}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
