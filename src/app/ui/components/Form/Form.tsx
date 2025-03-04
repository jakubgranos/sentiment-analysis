import { ChangeEvent, FC, FormEvent } from "react";
import { TextArea } from "@ui/components/TextArea/TextArea";
import { Button } from "@ui/components/Button/Button";
import "./styles.scss";

type FormProps = {
    text: string;
    isLoading: boolean;
    onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: FormEvent) => void;
    buttonText: string;
    maxLength: number;
};

export const Form: FC<FormProps> = ({
    text,
    isLoading,
    onTextChange,
    onSubmit,
    buttonText,
    maxLength,
}) => (
    <form onSubmit={onSubmit} className="sentiment-form">
        <TextArea
            value={text}
            onChange={onTextChange}
            placeholder="Wprowadź tekst do analizy..."
            maxLength={maxLength}
        />

        <Button
            variant="primary"
            type="submit"
            className="sentiment-form__button"
            disabled={isLoading}
            isLoading={isLoading}
            loadingText="Analizowanie..."
        >
            {buttonText}
        </Button>
    </form>
);
