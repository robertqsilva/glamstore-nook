import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, Clock } from 'lucide-react';
import axios from 'axios';

export const Footer = () => {
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);

  type StoreInfo = {
    nome: string;
    email: string;
    whatsapp: string;
    horario: string;
    descricao: string;
    instagram: string;
    facebook: string;
  };

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        const res = await axios.get('https://atelie-backend.onrender.com/api/infoloja');
        setStoreInfo(res.data);
      } catch (error) {
        console.error('Erro ao buscar informações da loja:', error);
      }
    };

    fetchStoreInfo();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h3 className="font-playfair text-xl font-bold mb-4">
              {storeInfo?.nome || 'Ateliê Gleice Rios'}
            </h3>
            <p className="text-gray-600 mb-4">
              {storeInfo?.descricao || 'Moda feminina exclusiva para mulheres que valorizam elegância e qualidade.'}
            </p>
            <div className="flex space-x-4">
              {storeInfo?.instagram && (
                <a
                  href={storeInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-rose-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {storeInfo?.whatsapp && (
                <a
                  href={`https://wa.me/55${storeInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-rose-500 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-900">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-rose-500 transition-colors">Início</Link></li>
              <li><Link to="/colecao" className="text-gray-600 hover:text-rose-500 transition-colors">Coleção</Link></li>
              <li><Link to="/categoria/vestidos" className="text-gray-600 hover:text-rose-500 transition-colors">Vestidos</Link></li>
              <li><Link to="/categoria/acessorios" className="text-gray-600 hover:text-rose-500 transition-colors">Acessórios</Link></li>
              <li><Link to="/sobre" className="text-gray-600 hover:text-rose-500 transition-colors">Sobre nós</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-900">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">{storeInfo?.email || 'contato@ateliegleicerios.com.br'}</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">{storeInfo?.whatsapp || '(00) 00000-0000'}</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">{storeInfo?.horario || 'Seg-Sex, 9h às 18h'}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-900">
              Newsletter
            </h4>
            <p className="text-gray-600 mb-3">
              Receba novidades e promoções.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-rose-300 focus:border-rose-300 outline-none"
              />
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-r-md transition-colors">
                Assinar
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} {storeInfo?.nome || 'Ateliê Gleice Rios'}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
