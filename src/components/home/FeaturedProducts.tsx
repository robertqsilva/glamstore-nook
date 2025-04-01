
import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/types/product';
import { getProducts } from '@/services/api';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const allProducts = await getProducts();
        const featuredProducts = allProducts.filter(product => product.featured);
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="container-custom py-16">
        <h2 className="font-playfair text-3xl font-bold mb-12 text-center">Destaques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-md aspect-[3/4] mb-3"></div>
              <div className="bg-gray-200 h-5 rounded mb-2 w-3/4"></div>
              <div className="bg-gray-200 h-4 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container-custom py-16">
      <h2 className="font-playfair text-3xl font-bold mb-12 text-center">Destaques</h2>
      
      {products.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto em destaque no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
