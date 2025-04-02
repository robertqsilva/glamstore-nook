
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.saleprice || product.price,
      image: product.images[0],
    });
  };

  return (
    <Link 
      to={`/produto/${product.id}`} 
      className="group"
    >
      <div className="relative overflow-hidden rounded-md aspect-[3/4] mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {product.saleprice && (
          <div className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-medium px-2 py-1 rounded">
            Oferta
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 text-sm font-medium text-rose-500 opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
        >
          Adicionar ao Carrinho
        </button>
      </div>
      
      <h3 className="font-medium text-gray-900 mb-1 transition-colors group-hover:text-rose-500">
        {product.name}
      </h3>
      
      <div className="flex items-center">
        {product.saleprice ? (
          <>
            <span className="font-medium text-rose-500 mr-2">
              {formatCurrency(product.saleprice)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.price)}
            </span>
          </>
        ) : (
          <span className="font-medium text-gray-900">
            {formatCurrency(product.price)}
          </span>
        )}
      </div>
    </Link>
  );
};
