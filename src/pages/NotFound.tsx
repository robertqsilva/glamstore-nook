
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from '@/components/layout/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container-custom py-32 text-center">
        <h1 className="font-playfair text-6xl font-bold mb-6">404</h1>
        <p className="text-xl text-gray-600 mb-8">Ops! Página não encontrada</p>
        <p className="max-w-md mx-auto mb-8 text-gray-500">
          A página que você está procurando pode ter sido movida, excluída ou nunca existiu.
        </p>
        <Link to="/" className="btn-primary">
          Voltar para o início
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
