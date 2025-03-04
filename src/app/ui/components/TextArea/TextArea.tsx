import { ChangeEvent, FC } from "react";
import "./styles.scss";

type TextAreaProps = {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    maxLength?: number;
    className?: string;
};

export const TextArea: FC<TextAreaProps> = ({
    value,
    onChange,
    placeholder = "",
    maxLength = 500,
    className = "",
}) => {
    return (
        <div className="textarea">
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`textarea__field ${className}`}
                maxLength={maxLength}
            />
            {maxLength > 0 && (
                <div className="textarea__char-count">
                    {value.length}/{maxLength} znaków
                </div>
            )}
        </div>
    );
};
