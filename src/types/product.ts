
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  saleprice: number | null;
  category: string;
  images: string[];
  colors: string[];
  sizes: string[];
  instock: boolean;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export type ProductFilter = {
  search?: string;
  category?: string;
  instock?: boolean;
  featured?: boolean;
  onSale?: boolean;
};
