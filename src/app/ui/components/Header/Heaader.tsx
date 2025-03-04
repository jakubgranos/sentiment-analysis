import { FC } from "react";
import "./styles.scss";

type HeaderProps = {
    title: string;
    description: string;
};

export const Header: FC<HeaderProps> = ({ title, description }) => {
    if (!title || !description) {
        return null;
    }

    return (
        <div className="header">
            <h1 className="header__title">{title}</h1>
            <p className="header__description">{description}</p>
        </div>
    );
};
