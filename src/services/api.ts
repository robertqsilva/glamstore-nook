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

// Categories for the admin
export const getCategories = async (): Promise<string[]> => {
  return fetchApi("/categories");
};

// Initialize mock data if empty
export const initializeMockData = async (): Promise<void> => {
  const products = await getProducts();

  if (products.length === 0) {
    const mockProducts: ProductFormData[] = [
      {
        name: "Vestido Floral Primavera",
        description:
          "Vestido floral com decote V e manga curta, perfeito para ocasiões especiais e eventos diurnos. Confeccionado em tecido leve e confortável.",
        price: 289.9,
        saleprice: 249.9,
        category: "vestidos",
        images: [
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1783&q=80",
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
        ],
        colors: ["#F8C3D3", "#FFFFFF", "#000000"],
        sizes: ["P", "M", "G"],
        instock: true,
        featured: true,
      },
      {
        name: "Blusa de Seda Off-White",
        description:
          "Blusa confeccionada em seda pura com manga longa e acabamento delicado. Versátil, pode ser usada em diversas ocasiões.",
        price: 199.9,
        saleprice: null,
        category: "blusas",
        images: [
          "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        ],
        colors: ["#F5F5DC", "#000000"],
        sizes: ["P", "M", "G", "GG"],
        instock: true,
        featured: true,
      },
      // Add more initial products as needed
    ];

    for (const product of mockProducts) {
      await createProduct(product);
    }
  }
};
