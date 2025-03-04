export type SentimentLabel = "NEGATIVE" | "POSITIVE" | "NEUTRAL";

export type SentimentResult = {
    label: SentimentLabel;
    score: number;
};
