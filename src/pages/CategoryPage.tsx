
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { Product } from '@/types/product';
import { getProducts } from '@/services/api';
import { Filter, X } from 'lucide-react';

const categoryMap: Record<string, string> = {
  vestidos: 'Vestidos',
  saias: 'Saias',
  blusas: 'Blusas',
  calcas: 'Calças',
  acessorios: 'Acessórios',
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    category: category || null,
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: null as string | null,
    inStock: false,
  });

  const colorOptions = [
    { id: '#000000', label: 'Preto' },
    { id: '#FFFFFF', label: 'Branco' },
    { id: '#F8C3D3', label: 'Rosa' },
    { id: '#A52A2A', label: 'Marrom' },
    { id: '#808080', label: 'Cinza' },
    { id: '#F5F5DC', label: 'Bege' },
  ];

  const sizeOptions = [
    { id: 'P', label: 'P' },
    { id: 'M', label: 'M' },
    { id: 'G', label: 'G' },
    { id: 'GG', label: 'GG' },
    { id: '36', label: '36' },
    { id: '38', label: '38' },
    { id: '40', label: '40' },
    { id: '42', label: '42' },
    { id: '44', label: '44' },
  ];

  const priceRangeOptions = [
    { id: 'under-150', label: 'Até R$ 150' },
    { id: '150-300', label: 'R$ 150 - R$ 300' },
    { id: '300-500', label: 'R$ 300 - R$ 500' },
    { id: 'over-500', label: 'Acima de R$ 500' },
  ];

  const categoryOptions = [
    { id: 'vestidos', label: 'Vestidos' },
    { id: 'saias', label: 'Saias' },
    { id: 'blusas', label: 'Blusas' },
    { id: 'calcas', label: 'Calças' },
    { id: 'acessorios', label: 'Acessórios' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(
          category ? data.filter(p => p.category === category) : data
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    // Reset category filter when URL parameter changes
    setFilters(prev => ({
      ...prev,
      category: category || null,
    }));
  }, [category]);

  useEffect(() => {
    // Apply filters to products
    let filtered = [...products];

    // Filter by category if set
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Filter by colors if any selected
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors.some(color => filters.colors.includes(color))
      );
    }

    // Filter by sizes if any selected
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'under-150':
          filtered = filtered.filter(p => (p.salePrice || p.price) < 150);
          break;
        case '150-300':
          filtered = filtered.filter(
            p => (p.salePrice || p.price) >= 150 && (p.salePrice || p.price) < 300
          );
          break;
        case '300-500':
          filtered = filtered.filter(
            p => (p.salePrice || p.price) >= 300 && (p.salePrice || p.price) < 500
          );
          break;
        case 'over-500':
          filtered = filtered.filter(p => (p.salePrice || p.price) >= 500);
          break;
      }
    }

    // Filter by stock
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="font-playfair text-3xl font-bold mb-2">
          {category ? categoryMap[category] || category : 'Todos os Produtos'}
        </h1>
        <p className="text-gray-500 mb-8">
          Encontre as peças perfeitas para completar seu estilo.
        </p>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700"
            >
              {showFilters ? (
                <>
                  <X size={18} className="mr-2" />
                  Fechar Filtros
                </>
              ) : (
                <>
                  <Filter size={18} className="mr-2" />
                  Filtrar Produtos
                </>
              )}
            </button>
          </div>

          {/* Filters - Desktop always visible, Mobile conditionally */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } lg:block lg:col-span-1 mb-8 lg:mb-0`}
          >
            <div className="sticky top-20 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <ProductFilters
                categories={categoryOptions}
                colors={colorOptions}
                sizes={sizeOptions}
                priceRanges={priceRangeOptions}
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
