import { ChangeEvent, useState } from "react";

type UseFormProps = {
    maxLength?: number;
    errorIfEmpty?: string;
    errorIfTooLong?: string;
};

/**
 * Custom hook for form handling with text validation
 */
export const useForm = ({
    maxLength = 500,
    errorIfEmpty = "Proszę wprowadzić tekst do analizy.",
    errorIfTooLong = "Tekst nie może przekraczać 500 znaków.",
}: UseFormProps) => {
    const [text, setText] = useState("");
    const [error, setError] = useState<string | null>(null);

    /**
     * Handles text input changes and clears errors
     */
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        if (error) setError(null);
    };

    /**
     * Validates form input
     */
    const validateForm = (): boolean => {
        // if text is empty, set error and return false
        if (!text.trim()) {
            setError(errorIfEmpty);
            return false;
        }

        /**
         * The max length is secure to prevent in field to add more text, but in case check
         * if text is longer than maxLength, set error and return false
         */
        if (text.length > maxLength) {
            setError(errorIfTooLong);
            return false;
        }

        return true;
    };

    return {
        text,
        error,
        handleTextChange,
        validateForm,
        setError,
    };
};
