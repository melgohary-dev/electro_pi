"use client";

import { Result, Button } from "antd";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="global-error-body">
        <Result
          status="error"
          title="Something went wrong"
          subTitle={error.message || "An unexpected error occurred"}
          extra={
            <Button type="primary" onClick={reset}>
              Try again
            </Button>
          }
        />
      </body>
    </html>
  );
}
