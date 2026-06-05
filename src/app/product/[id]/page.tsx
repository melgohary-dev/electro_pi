import { fetchProduct } from "@/lib/fake-store";
import type { Metadata } from "next";
import { ProductDetailsClient } from "./product-details-client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await fetchProduct(id);

    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.image }],
      },
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  return <ProductDetailsClient id={id} />;
}
