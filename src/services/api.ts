
import { Product } from '@/types/product';

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    name: 'Saia Midi Plissada',
    description: 'Saia midi plissada em tecido leve e fluido, com cintura alta e fechamento em zíper invisível. Perfeita para looks elegantes.',
    price: 159.90,
    salePrice: null,
    category: 'saias',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
    ],
    colors: ['#000000', '#F8C3D3', '#808080'],
    sizes: ['P', 'M', 'G'],
    inStock: true,
    featured: false,
  },
  {
    id: 4,
    name: 'Calça de Alfaiataria',
    description: 'Calça de alfaiataria com corte reto e cintura alta. Confeccionada em tecido premium que garante caimento perfeito.',
    price: 239.90,
    salePrice: 199.90,
    category: 'calcas',
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d05113e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    ],
    colors: ['#000000', '#FFFFFF', '#A52A2A'],
    sizes: ['36', '38', '40', '42', '44'],
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    name: 'Vestido Longo Estampado',
    description: 'Vestido longo com estampa exclusiva, decote canoa e fenda lateral. Ideal para eventos noturnos e ocasiões especiais.',
    price: 399.90,
    salePrice: null,
    category: 'vestidos',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1773&q=80',
    ],
    colors: ['#F8C3D3', '#000000'],
    sizes: ['P', 'M', 'G'],
    inStock: true,
    featured: true,
  },
  {
    id: 6,
    name: 'Conjunto Blazer e Calça',
    description: 'Conjunto de blazer e calça em alfaiataria premium, com detalhes sofisticados e caimento impecável.',
    price: 599.90,
    salePrice: 499.90,
    category: 'calcas',
    images: [
      'https://images.unsplash.com/photo-1548454782-15b189d129ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    ],
    colors: ['#000000', '#F5F5DC'],
    sizes: ['36', '38', '40', '42'],
    inStock: false,
    featured: false,
  },
  {
    id: 7,
    name: 'Blusa de Renda',
    description: 'Blusa confeccionada em renda delicada com forro em cetim. Peça elegante para diversas ocasiões.',
    price: 179.90,
    salePrice: null,
    category: 'blusas',
    images: [
      'https://images.unsplash.com/photo-1551163943-3f7fffbd9a63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    ],
    colors: ['#FFFFFF', '#000000', '#F8C3D3'],
    sizes: ['P', 'M', 'G'],
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    name: 'Saia Envelope',
    description: 'Saia envelope em tecido fluido com amarração lateral. Versátil e confortável para diversas ocasiões.',
    price: 159.90,
    salePrice: 129.90,
    category: 'saias',
    images: [
      'https://images.unsplash.com/photo-1577900232427-18219b9166a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    ],
    colors: ['#000000', '#A52A2A'],
    sizes: ['P', 'M', 'G'],
    inStock: true,
    featured: false,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  await delay(800); // Simulate network delay
  return mockProducts;
};

// Get product by ID
export const getProductById = async (id: number): Promise<Product | null> => {
  await delay(500);
  const product = mockProducts.find(p => p.id === id);
  return product || null;
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await delay(800);
  return mockProducts.filter(p => p.category === category);
};

// For admin API simulation - Create, update, delete products:

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  await delay(1000);
  const newProduct = {
    ...product,
    id: Math.max(...mockProducts.map(p => p.id)) + 1,
  };
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  await delay(1000);
  const index = mockProducts.findIndex(p => p.id === product.id);
  if (index === -1) {
    throw new Error('Product not found');
  }
  mockProducts[index] = product;
  return product;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await delay(1000);
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Product not found');
  }
  mockProducts.splice(index, 1);
};
