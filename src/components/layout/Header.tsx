
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Instagram, ShoppingBag } from 'lucide-react';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCart } from '@/hooks/useCart';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Coleção', path: '/colecao' },
    { name: 'Vestidos', path: '/categoria/vestidos' },
    { name: 'Saias', path: '/categoria/saias' },
    { name: 'Blusas', path: '/categoria/blusas' },
    { name: 'Calças', path: '/categoria/calcas' },
    { name: 'Acessórios', path: '/categoria/acessorios' },
    { name: 'Sobre', path: '/sobre' },
  ];

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-playfair text-xl md:text-2xl font-bold">
          Ateliê Gleice Rios
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm text-gray-700 hover:text-rose-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social & Cart Icons */}
        <div className="flex items-center space-x-4">
          <a 
            href="https://instagram.com/_usegleicerios/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-rose-500 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <button 
            onClick={toggleCart}
            className="text-gray-700 hover:text-rose-500 transition-colors relative"
            aria-label="Carrinho"
          >
            <ShoppingBag size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-fade-in">
          <div className="container-custom flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-rose-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};
