"use client";

import { useEffect, useRef } from "react";
import { Spin } from "antd";

interface InfiniteScrollObserverProps {
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export function InfiniteScrollObserver({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: InfiniteScrollObserverProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div ref={loaderRef} className="flex justify-center py-8">
      {isFetchingNextPage && <Spin size="large" />}
    </div>
  );
}
