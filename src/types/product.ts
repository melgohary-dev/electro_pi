/** Product from the Fake Store API. */
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/** Product category with optional localized name. */
export interface Category {
  slug: string;
  name: string;
  nameAr?: string;
}
