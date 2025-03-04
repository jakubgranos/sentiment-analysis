import { ButtonHTMLAttributes } from "react";
import "./styles.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    loadingText?: string;
    variant: "primary" | "secondary";
};

export const Button = ({
    children,
    isLoading,
    loadingText = "Loading...",
    className = "",
    variant = "primary",
    ...props
}: ButtonProps) => {
    if (!children) return null;
    return (
        <button className={`button ${className} button--${variant}`} {...props}>
            {isLoading ? loadingText : children}
        </button>
    );
};
