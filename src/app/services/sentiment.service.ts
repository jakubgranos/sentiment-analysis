import { apiLinks } from "@const/apiLinks";
import { SentimentResult } from "@app/types/sentiment.types";

// API token from environment variables for authentication
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

/**
 * Analyzes text sentiment using API
 * This service sends text to a pre-trained model and returns sentiment analysis results
 */
export const sentimentServiceAPI = async (
    text: string
): Promise<SentimentResult> => {
    try {
        // Make API request with proper headers and body
        const response = await fetch(apiLinks.API_SENTIMENT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: text }),
        });

        // Handle unsuccessful responses
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error("API Error Details:", errorData);
            throw new Error(
                `API request failed with status: ${response.status}${
                    errorData?.error ? ` - ${errorData.error}` : ""
                }`
            );
        }

        /**
         * API returns array of arrays with sentiment predictions at this point
         */
        const data = (await response.json()) as [SentimentResult[]];

        /**
         * API returns array of arrays with sentiment predictions
         * We need to find the prediction with highest confidence
         */
        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
            // Sort predictions by score to get the most confident one
            const sortedResults = [...data[0]].sort(
                (a, b) => b.score - a.score
            );
            return sortedResults[0];
        }

        throw new Error("Invalid API response format");
    } catch (error) {
        // Log error for debugging but throw a user-friendly message
        console.error("Sentiment Analysis Error:", error);
        throw new Error("Failed to analyze text sentiment");
    }
};
