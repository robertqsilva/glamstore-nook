import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Product } from '@/types/product';
import { getProductById } from '@/services/api';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const { addToCart } = useCart();

  type StoreInfo = {
    id: number;
    nome: string;
    email: string;
    whatsapp: string;
    horario: string;
    descricao: string;
    instagram: string;
    facebook: string;
  };

    const API_URL = 'https://atelie-backend.onrender.com/api/infoloja';
  


  useEffect(() => {
    const fetchStoreInfo = async () => {
        try {
          const res = await axios.get(API_URL);
          setStoreInfo(res.data);
        } catch (error) {
          console.error('Erro ao carregar informações da loja:', error);
          toast.error('Erro ao carregar informações da loja');
        }
      };
  

    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const productData = await getProductById(Number(id));
        if (productData) {
          setProduct(productData);
          if (productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0]);
          }
          if (productData.colors.length > 0) {
            setSelectedColor(productData.colors[0]);
          }
        } else {
          navigate('/404');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreInfo();
    fetchProduct();
  }, [id, navigate]);

  const handleNextImage = () => {
    if (!product) return;
    setActiveImage((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    if (!product) return;
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.saleprice || product.price,
      image: product.images[0],
    });
  };

  if (loading) {
    return (
      <Layout storeName={storeInfo?.nome}>
        <div className="container-custom py-16">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3 mt-8"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout storeName={storeInfo?.nome}>
        <div className="container-custom py-16">
          <p className="text-center text-gray-500">Produto não encontrado.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout storeName={storeInfo?.nome}>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-sm" aria-label="Imagem anterior">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-sm" aria-label="Próxima imagem">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              {product.saleprice && (
                <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-md font-medium text-sm">
                  Oferta
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button key={idx} className={`w-20 h-20 rounded-md overflow-hidden border-2 ${activeImage === idx ? 'border-rose-500' : 'border-transparent hover:border-gray-300'}`} onClick={() => setActiveImage(idx)}>
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="font-playfair text-3xl font-bold mb-2">{product.name}</h1>
            <div className="mb-4">
              {product.saleprice ? (
                <div className="flex items-baseline">
                  <span className="text-2xl font-medium text-rose-500 mr-2">{formatCurrency(product.saleprice)}</span>
                  <span className="text-lg text-gray-500 line-through">{formatCurrency(product.price)}</span>
                </div>
              ) : (
                <span className="text-2xl font-medium text-gray-900">{formatCurrency(product.price)}</span>
              )}
            </div>
            <div className="prose prose-gray mb-6">
              <p>{product.description}</p>
            </div>
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Cor</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button key={color} className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-rose-500' : 'border-transparent'}`} style={{ backgroundColor: color }} onClick={() => setSelectedColor(color)} aria-label={`Cor ${color}`} />
                  ))}
                </div>
              </div>
            )}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
                  <a href="#" className="text-sm font-medium text-rose-500 hover:text-rose-600">Guia de tamanhos</a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} className={`h-10 min-w-[2.5rem] px-3 flex items-center justify-center rounded-md border ${selectedSize === size ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setSelectedSize(size)}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantidade</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-max">
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>-</button>
                <span className="px-4 py-2 text-gray-900">{quantity}</span>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button onClick={handleAddToCart} className="flex-1 btn-primary" disabled={!product.instock}>
                {product.instock ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
              </button>
              <a href={`https://wa.me/55${storeInfo?.whatsapp.replace(/\D/g, '')}?text=Olá! Tenho interesse no produto: ${product.name}`} target="_blank" rel="noopener noreferrer" className="flex-1 btn-secondary text-center">
                Consultar via WhatsApp
              </a>
            </div>
            <div className="text-sm text-gray-500">
              <p className="mb-1">Disponibilidade: <span className={product.instock ? 'text-green-600' : 'text-red-600'}>{product.instock ? ' Em estoque' : ' Fora de estoque'}</span></p>
              <p>Categoria: {categoryMap[product.category] || product.category}</p>
            </div>

            {storeInfo && (
              <div className="mt-12 text-sm text-gray-600 border-t pt-6">
                <p><strong>Loja:</strong> {storeInfo.nome}</p>
                <p><strong>Email:</strong> {storeInfo.email}</p>
                <p><strong>WhatsApp:</strong> {storeInfo.whatsapp}</p>
                <p><strong>Atendimento:</strong> {storeInfo.horario}</p>
                <p className="my-2">{storeInfo.descricao}</p>
                <p className="flex gap-4 mt-2">
                  <a href={storeInfo.instagram} target="_blank" className="text-rose-500 underline">Instagram</a>
                  <a href={storeInfo.facebook} target="_blank" className="text-rose-500 underline">Facebook</a>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
};

const categoryMap: Record<string, string> = {
  vestidos: 'Vestidos',
  saias: 'Saias',
  blusas: 'Blusas',
  calcas: 'Calças',
  acessorios: 'Acessórios',
};

export default ProductPage;
