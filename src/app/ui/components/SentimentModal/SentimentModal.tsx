import { FC } from "react";
import { SentimentResult } from "@app/types/sentiment.types";
import { Button } from "@ui/components/Button/Button";
import { sentimentInfoOptions } from "./options/sentimentInfoOptions";
import "./styles.scss";

type SentimentModalProps = {
    result: SentimentResult;
    onClose: () => void;
};

export const SentimentModal: FC<SentimentModalProps> = ({
    result,
    onClose,
}) => {
    if (!result) return null;

    const sentimentInfo = sentimentInfoOptions(result.label);

    const confidence = Math.round(result.score * 100);

    return (
        <div className="sentiment-modal__overlay">
            <div className="sentiment-modal__container">
                <div className="sentiment-modal__content">
                    <div className="sentiment-modal__icon">
                        {sentimentInfo.icon}
                    </div>
                    <h2 className="sentiment-modal__type">
                        {sentimentInfo.type}
                    </h2>
                    <div className="sentiment-modal__confidence">
                        Pewność: {confidence}%
                        <div className="sentiment-modal__confidence-bar">
                            <div
                                className="sentiment-modal__confidence-fill"
                                style={{ width: `${confidence}%` }}
                            ></div>
                        </div>
                    </div>
                    <p className="sentiment-modal__description">
                        {sentimentInfo.description}
                    </p>
                    <div className="sentiment-modal__tip">
                        <h3>Wskazówka:</h3>
                        <p>{sentimentInfo.tip}</p>
                    </div>
                </div>

                <Button
                    variant="primary"
                    className="sentiment-modal__button"
                    onClick={onClose}
                >
                    Zamknij
                </Button>
            </div>
        </div>
    );
};
