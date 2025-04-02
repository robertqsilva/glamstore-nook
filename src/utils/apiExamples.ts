import { Product, ProductFilter, ProductFormData } from "@/types/product";

// API base URL (external API URL)
const API_BASE_URL = "http://localhost:3000/api";

// Generic fetch function with error handling
const fetchApi = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// API methods
export const getProducts = async (
  filters?: ProductFilter
): Promise<Product[]> => {
  let query = "";
  if (filters) {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.instock !== undefined)
      params.append("instock", String(filters.instock));
    if (filters.featured !== undefined)
      params.append("featured", String(filters.featured));
    if (filters.onSale !== undefined)
      params.append("onSale", String(filters.onSale));
    query = `?${params.toString()}`;
  }
  return fetchApi(`/products${query}`);
};

export const getProductById = async (id: number): Promise<Product> => {
  return fetchApi(`/products/${id}`);
};

export const createProduct = async (
  product: ProductFormData
): Promise<Product> => {
  return fetchApi("/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });
};

export const updateProduct = async (
  id: number,
  product: ProductFormData
): Promise<Product> => {
  return fetchApi(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteProduct = async (
  id: number
): Promise<{ success: boolean }> => {
  return fetchApi(`/products/${id}`, { method: "DELETE" });
};

export const getCategories = async (): Promise<string[]> => {
  return fetchApi("/categories");
};
