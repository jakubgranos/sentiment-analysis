/**
 * All api links are stored in environment variables to make it easier manage them
 */
const baseUrl = import.meta.env.VITE_API_BASE_API_URL;

export const apiLinks = {
    API_SENTIMENT: `${baseUrl}/models/distilbert-base-uncased-finetuned-sst-2-english`,
};
