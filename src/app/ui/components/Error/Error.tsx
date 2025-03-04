import { FC } from "react";
import "./styles.scss";

type ErrorProps = {
    message: string;
};

export const Error: FC<ErrorProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="error">
            <div className="error__content">
                <p className="error__message">{message}</p>
            </div>
        </div>
    );
};
