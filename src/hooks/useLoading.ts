import { useCallback, useState } from "react";

export function useLoading() {
  const [isLoading, setLoadingState] = useState(true);

  const setLoading = useCallback(() => {
    setLoadingState(true);
  }, []);

  const clearLoading = useCallback(() => {
    setLoadingState(false);
  }, []);

  return {
    isLoading,
    setLoading,
    clearLoading,
  };
}
