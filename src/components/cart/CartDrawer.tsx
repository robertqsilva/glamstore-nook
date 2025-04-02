
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  
  const handleCheckout = () => {
    const items = cartItems.map(item => 
      `*${item.name}* - ${item.quantity} ${item.quantity > 1 ? 'unidades' : 'unidade'} - ${formatCurrency(item.price * item.quantity)}`
    ).join('\n');
    
    const total = formatCurrency(getTotalPrice());
    
    const message = `Olá! Gostaria de finalizar minha compra:\n\n${items}\n\n*Total: ${total}*`;
    
    const whatsappURL = `https://wa.me/557196451002?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      <div className="cart-drawer top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-all animate-slide-up">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-playfair text-xl font-medium">Seu Carrinho</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <ShoppingBag size={48} className="mb-2 opacity-30" />
                <p className="text-lg mb-1">Seu carrinho está vazio</p>
                <p className="text-sm">Adicione produtos para começar a comprar.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex border-b pb-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">{formatCurrency(item.price)}</p>
                      </div>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-500 hover:text-gray-700"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm font-medium text-rose-500 hover:text-rose-600"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between font-medium">
                <p>Subtotal</p>
                <p>{formatCurrency(getTotalPrice())}</p>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary flex justify-center items-center"
                >
                  Finalizar no WhatsApp
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  Limpar carrinho
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
