import { ProductGrid } from "@/components/product/ProductGrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ProductGrid />
    </Suspense>
  );
}
