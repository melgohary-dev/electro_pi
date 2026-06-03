import { useCallback, useRef, useState } from "react";

export function useDebounce<T>(initialValue: T, delay: number) {
  const [value, setValue] = useState<T>(initialValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const debouncedSet = useCallback(
    (newValue: T) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setValue(newValue), delay);
    },
    [delay],
  );

  return [value, debouncedSet, setValue] as const;
}
