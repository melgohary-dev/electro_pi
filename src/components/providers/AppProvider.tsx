"use client";

import { ReduxProvider } from "./ReduxProvider";
import { QueryProvider } from "./QueryProvider";
import { AntdConfigProvider } from "./AntdConfigProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AntdConfigProvider>{children}</AntdConfigProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
