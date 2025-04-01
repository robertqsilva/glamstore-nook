
import { Product, ProductFilter, ProductFormData } from '@/types/product';

// API base URL (would be an actual URL in production)
const API_BASE_URL = '/api';

// Simulate fetch delay
const simulateDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Generic fetch function with error handling
const fetchApi = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  await simulateDelay();
  
  // In a real app, this would be a fetch to an actual API
  // For now, we'll simulate responses based on the endpoint and method
  console.log(`API Request: ${options.method || 'GET'} ${endpoint}`);
  
  // Simulate localStorage as our "database"
  if (!localStorage.getItem('mockProducts')) {
    localStorage.setItem('mockProducts', JSON.stringify([]));
  }
  
  const mockProducts: Product[] = JSON.parse(localStorage.getItem('mockProducts') || '[]');
  
  // Handle different endpoints and methods
  if (endpoint === '/products' && options.method === 'GET') {
    return mockProducts;
  } 
  else if (endpoint.match(/\/products\/\d+$/) && options.method === 'GET') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } 
  else if (endpoint === '/products' && options.method === 'POST') {
    const newProduct = JSON.parse(options.body as string) as ProductFormData;
    const id = mockProducts.length > 0 ? Math.max(...mockProducts.map(p => p.id)) + 1 : 1;
    const createdProduct: Product = {
      ...newProduct,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockProducts.push(createdProduct);
    localStorage.setItem('mockProducts', JSON.stringify(mockProducts));
    return createdProduct;
  } 
  else if (endpoint.match(/\/products\/\d+$/) && options.method === 'PUT') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    const productIndex = mockProducts.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    const updatedProduct: Product = {
      ...JSON.parse(options.body as string),
      id,
      updatedAt: new Date().toISOString(),
      createdAt: mockProducts[productIndex].createdAt
    };
    
    mockProducts[productIndex] = updatedProduct;
    localStorage.setItem('mockProducts', JSON.stringify(mockProducts));
    return updatedProduct;
  } 
  else if (endpoint.match(/\/products\/\d+$/) && options.method === 'DELETE') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    const productIndex = mockProducts.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    mockProducts.splice(productIndex, 1);
    localStorage.setItem('mockProducts', JSON.stringify(mockProducts));
    return { success: true };
  }
  
  throw new Error('Endpoint not found');
};

// API methods
export const getProducts = async (filters?: ProductFilter): Promise<Product[]> => {
  let products = await fetchApi('/products');
  
  // Apply filters if provided
  if (filters) {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters.inStock !== undefined) {
      products = products.filter(p => p.inStock === filters.inStock);
    }
    
    if (filters.featured !== undefined) {
      products = products.filter(p => p.featured === filters.featured);
    }
    
    if (filters.onSale !== undefined) {
      products = products.filter(p => filters.onSale ? p.salePrice !== null : p.salePrice === null);
    }
  }
  
  return products;
};

export const getProductById = async (id: number): Promise<Product> => {
  return fetchApi(`/products/${id}`);
};

export const createProduct = async (product: ProductFormData): Promise<Product> => {
  return fetchApi('/products', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const updateProduct = async (id: number, product: ProductFormData): Promise<Product> => {
  return fetchApi(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const deleteProduct = async (id: number): Promise<{ success: boolean }> => {
  return fetchApi(`/products/${id}`, {
    method: 'DELETE'
  });
};

// Categories for the admin 
export const getCategories = async (): Promise<string[]> => {
  await simulateDelay(300);
  return ['vestidos', 'blusas', 'saias', 'calcas', 'acessorios'];
};

// Initialize mock data if empty
export const initializeMockData = async (): Promise<void> => {
  const products = await getProducts();
  
  if (products.length === 0) {
    const mockProducts: ProductFormData[] = [
      {
        name: 'Vestido Floral Primavera',
        description: 'Vestido floral com decote V e manga curta, perfeito para ocasiões especiais e eventos diurnos. Confeccionado em tecido leve e confortável.',
        price: 289.90,
        salePrice: 249.90,
        category: 'vestidos',
        images: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1783&q=80',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
        ],
        colors: ['#F8C3D3', '#FFFFFF', '#000000'],
        sizes: ['P', 'M', 'G'],
        inStock: true,
        featured: true,
      },
      {
        name: 'Blusa de Seda Off-White',
        description: 'Blusa confeccionada em seda pura com manga longa e acabamento delicado. Versátil, pode ser usada em diversas ocasiões.',
        price: 199.90,
        salePrice: null,
        category: 'blusas',
        images: [
          'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        ],
        colors: ['#F5F5DC', '#000000'],
        sizes: ['P', 'M', 'G', 'GG'],
        inStock: true,
        featured: true,
      },
      // Add more initial products as needed
    ];
    
    for (const product of mockProducts) {
      await createProduct(product);
    }
  }
};
