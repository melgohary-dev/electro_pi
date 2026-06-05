import { useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  rootMargin = "200px",
}: UseIntersectionObserverOptions) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin },
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.disconnect();
    };
  }, [enabled, onIntersect, rootMargin]);

  return ref;
}
