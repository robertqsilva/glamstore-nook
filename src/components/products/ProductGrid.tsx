
import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';
import { Menu, Grid, List } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export const ProductGrid = ({ products, loading = false }: ProductGridProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-md aspect-[3/4] mb-3"></div>
            <div className="bg-gray-200 h-5 rounded mb-2 w-3/4"></div>
            <div className="bg-gray-200 h-4 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
        <p className="text-gray-500">Tente ajustar seus filtros ou busque por outro termo.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500">
          {products.length} {products.length === 1 ? 'produto' : 'produtos'} encontrados
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid'
                ? 'bg-rose-100 text-rose-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label="Visualização em grid"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list'
                ? 'bg-rose-100 text-rose-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label="Visualização em lista"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row border rounded-lg overflow-hidden"
            >
              <div className="sm:w-1/3 aspect-[4/3] sm:aspect-auto">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:w-2/3">
                <h3 className="font-medium text-lg text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center mb-4">
                  {product.salePrice ? (
                    <>
                      <span className="font-medium text-rose-500 mr-2">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(product.salePrice)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-gray-900">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(product.price)}
                    </span>
                  )}
                </div>
                <a
                  href={`/produto/${product.id}`}
                  className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Ver detalhes
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
