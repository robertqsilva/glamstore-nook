
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Product } from '@/types/product';
import { getProducts } from '@/services/api';
import { Search } from 'lucide-react';

const CollectionPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="font-playfair text-3xl font-bold mb-2">Coleção Completa</h1>
        <p className="text-gray-500 mb-8">
          Explore todas as nossas peças exclusivas criadas com carinho e atenção aos detalhes.
        </p>

        {/* Search Bar */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-md focus:ring-rose-300 focus:border-rose-300 outline-none"
                placeholder="Buscar produtos..."
              />
            </div>
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-r-md transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} loading={loading} />
      </div>
    </Layout>
  );
};

export default CollectionPage;
