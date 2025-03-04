import { useMutation } from "@tanstack/react-query";
import { sentimentServiceAPI } from "@services/sentiment.service";
import { SentimentResult } from "@app/types/sentiment.types";

/**
 * Hook react query allows to give us clear states of the query, like loading, error, data
 * Also if needed inside the mutation we can handle the error and success states
 */
export const useGetSentiment = () => {
    return useMutation<SentimentResult, Error, string>({
        mutationFn: sentimentServiceAPI,
    });
};
