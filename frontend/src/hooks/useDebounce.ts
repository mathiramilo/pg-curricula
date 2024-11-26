import { useEffect, useState } from "react";

export function useDebounce<T>(
  initialValue: T,
  time: number,
): [T, T, React.Dispatch<T>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, time]);

  return [debouncedValue, value, setValue];
}
