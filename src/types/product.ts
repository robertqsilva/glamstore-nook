
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  category: string;
  images: string[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
  featured: boolean;
}
