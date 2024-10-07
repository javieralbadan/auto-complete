import { useCallback, useState } from "react";

interface ErrorState {
    hasError: boolean;
    message: string | null;
}  

export function useError() {
    const [errorState, setErrorState] = useState<ErrorState>({
        hasError: false,
        message: null,
    });

    const setError = useCallback((message: string) => {
        setErrorState({ hasError: true, message });
    }, []);

    const clearError = useCallback(() => {
        setErrorState({ hasError: false, message: null });
    }, []);

    return {
        error: errorState,
        setError,
        clearError,
    }
}
