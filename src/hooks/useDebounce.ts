import { useState, useEffect } from "react";

interface Props {
  value: string;
  delay?: number;
}

export const useDebounce = ({ value, delay = 300 }: Props) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // I needed to confirm this return, to make the clearTimeout properly
    // Since I'm not so familiar with this cleaning functions (before re renders & unmounted)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
