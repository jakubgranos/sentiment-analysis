import { useEffect, FC, FormEvent } from "react";
import { SentimentModal } from "@ui/components/SentimentModal/SentimentModal";
import { Form } from "@ui/components/Form/Form";
import { Header } from "@ui/components/Header/Heaader";
import { Error } from "@ui/components/Error/Error";
import { useGetSentiment } from "@hooks/query/sentiment.query";
import { SentimentResult } from "@app/types/sentiment.types";
import { useState } from "react";
import { useForm } from "@hooks/form/useForm";
import "./styles.scss";

/**
 * Main content component for sentiment analysis application
 */
export const AppContent: FC = () => {
    const maxTextAreaLength = 500;

    const [showModal, setShowModal] = useState(false);
    const [sentimentResult, setSentimentResult] =
        useState<SentimentResult | null>(null);

    const {
        text,
        error: formError,
        handleTextChange,
        validateForm,
    } = useForm({
        maxLength: maxTextAreaLength,
        errorIfEmpty: "Proszę wprowadzić tekst do analizy.",
        errorIfTooLong: `Tekst nie może przekraczać ${maxTextAreaLength} znaków.`,
    });

    const sentimentMutation = useGetSentiment();

    /**
     * Handle successful API response
     * Show modal with results when analysis is complete
     */
    useEffect(() => {
        if (sentimentMutation.isSuccess && sentimentMutation.data) {
            setSentimentResult(sentimentMutation.data);
            setShowModal(true);
        }
    }, [sentimentMutation.isSuccess, sentimentMutation.data]);

    /**
     * Handle form submission
     * Validate input and trigger sentiment analysis
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            sentimentMutation.mutate(text);
        }
    };

    /**
     * Get appropriate error message to display
     * Prioritize form validation errors over API errors
     */
    const getErrorMessage = () => {
        if (formError) return formError;
        if (sentimentMutation.isError) {
            return "Wystąpił błąd podczas analizy tekstu. Spróbuj ponownie później.";
        }
        return null;
    };

    const errorMessage = getErrorMessage();

    return (
        <div className="sentiment">
            <div className="sentiment-container">
                <Header
                    title="Analiza Sentymentu Tekstu by Hugging Face 🤗"
                    description="Wprowadź tekst aby przeanalizować jego sentyment."
                />

                {errorMessage && <Error message={errorMessage} />}

                <Form
                    text={text}
                    isLoading={sentimentMutation.isPending}
                    onTextChange={handleTextChange}
                    onSubmit={handleSubmit}
                    buttonText="Analizuj"
                    maxLength={maxTextAreaLength}
                />
            </div>

            {showModal && sentimentResult && (
                <SentimentModal
                    result={sentimentResult}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};
