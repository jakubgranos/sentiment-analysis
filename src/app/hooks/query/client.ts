import { QueryClient } from "@tanstack/react-query";

/**
 * Basic query client configuration
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
