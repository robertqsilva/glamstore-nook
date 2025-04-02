/**
 * This file contains examples of API request/response bodies for documentation purposes.
 * The actual implementation is in the api.ts file.
 */

import { Product, ProductFormData } from "@/types/product";

// Base URL for all API calls
export const API_BASE_URL = 'https://atelie-backend.onrender.com/api';

/**
 * GET /products
 * 
 * Used to fetch all products, with optional filters
 * 
 * Query parameters (optional):
 * - search: string
 * - category: string
 * - inStock: boolean
 * - featured: boolean
 * - onSale: boolean
 */
export const getProductsExample = {
  url: `${API_BASE_URL}/products`,
  method: 'GET',
  queryParams: {
    search: 'vestido',
    category: 'vestidos',
    inStock: true,
    featured: true,
    onSale: true
  },
  response: [
    {
      id: 1,
      name: 'Vestido Floral Primavera',
      description: 'Vestido floral com decote V e manga curta, perfeito para ocasiões especiais e eventos diurnos.',
      price: 289.90,
      salePrice: 249.90,
      category: 'vestidos',
      images: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1783&q=80',
      ],
      colors: ['#F8C3D3', '#FFFFFF', '#000000'],
      sizes: ['P', 'M', 'G'],
      inStock: true,
      featured: true,
      createdAt: '2023-06-15T10:00:00.000Z',
      updatedAt: '2023-06-15T10:00:00.000Z'
    }
  ]
};

/**
 * GET /products/:id
 * 
 * Used to fetch a single product by id
 */
export const getProductByIdExample = {
  url: `${API_BASE_URL}/products/1`,
  method: 'GET',
  response: {
    id: 1,
    name: 'Vestido Floral Primavera',
    description: 'Vestido floral com decote V e manga curta, perfeito para ocasiões especiais e eventos diurnos.',
    price: 289.90,
    salePrice: 249.90,
    category: 'vestidos',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1783&q=80',
    ],
    colors: ['#F8C3D3', '#FFFFFF', '#000000'],
    sizes: ['P', 'M', 'G'],
    inStock: true,
    featured: true,
    createdAt: '2023-06-15T10:00:00.000Z',
    updatedAt: '2023-06-15T10:00:00.000Z'
  }
};

/**
 * POST /products
 * 
 * Used to create a new product
 */
export const createProductExample = {
  url: `${API_BASE_URL}/products`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    name: 'Novo Vestido Elegante',
    description: 'Um lindo vestido para ocasiões especiais.',
    price: 299.90,
    salePrice: 259.90,
    category: 'vestidos',
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ],
    colors: ['#000000', '#FFFFFF'],
    sizes: ['P', 'M', 'G'],
    inStock: true,
    featured: false
  } as ProductFormData,
  response: {
    id: 3,
    name: 'Novo Vestido Elegante',
    description: 'Um lindo vestido para ocasiões especiais.',
    price: 299.90,
    salePrice: 259.90,
    category: 'vestidos',
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ],
    colors: ['#000000', '#FFFFFF'],
    sizes: ['P', 'M', 'G'],
    inStock: true,
    featured: false,
    createdAt: '2023-08-20T14:35:42.000Z',
    updatedAt: '2023-08-20T14:35:42.000Z'
  } as Product
};

/**
 * PUT /products/:id
 * 
 * Used to update an existing product
 */
export const updateProductExample = {
  url: `${API_BASE_URL}/products/1`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    name: 'Vestido Floral Primavera - Atualizado',
    description: 'Vestido floral com decote V e manga curta, perfeito para ocasiões especiais e eventos diurnos.',
    price: 289.90,
    salePrice: 229.90,
    category: 'vestidos',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1783&q=80',
    ],
    colors: ['#F8C3D3', '#FFFFFF', '#000000', '#FF0000'],
    sizes: ['P', 'M', 'G'],
    inStock: true,
    featured: true
  } as ProductFormData,
  response: {
    id: 1,
    name: 'Vestido Floral Primavera - Atualizado',
    description: 'Vestido floral com decote V e manga curta, perfeito para ocasiões especiais e eventos diurnos.',
    price: 289.90,
    salePrice: 229.90,
    category: 'vestidos',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1783&q=80',
    ],
    colors: ['#F8C3D3', '#FFFFFF', '#000000', '#FF0000'],
    sizes: ['P', 'M', 'G'],
    inStock: true,
    featured: true,
    createdAt: '2023-06-15T10:00:00.000Z',
    updatedAt: '2023-08-20T15:22:47.000Z'
  } as Product
};

/**
 * DELETE /products/:id
 * 
 * Used to delete a product
 */
export const deleteProductExample = {
  url: `${API_BASE_URL}/products/2`,
  method: 'DELETE',
  response: {
    success: true
  }
};

/**
 * GET /categories
 * 
 * Used to fetch all categories
 */
export const getCategoriesExample = {
  url: `${API_BASE_URL}/categories`,
  method: 'GET',
  response: ['vestidos', 'blusas', 'saias', 'calcas', 'acessorios']
};
