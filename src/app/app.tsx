import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@hooks/query/client";
import { AppContent } from "@ui/modules/AppContent/AppContent";

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent />
        </QueryClientProvider>
    );
}

export default App;
