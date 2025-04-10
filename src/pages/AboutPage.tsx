import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import axios from 'axios';

interface InfoLoja {
  sobre: string;
  whatsapp: string;
}

const AboutPage = () => {
  const [info, setInfo] = useState<InfoLoja | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get<InfoLoja>('https://atelie-backend.onrender.com/api/infoloja');
        setInfo(res.data);
      } catch (error) {
        console.error('Erro ao carregar informações da loja', error);
      }
    };

    fetchInfo();
  }, []);

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">

          {info ? (
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: info.sobre }} />
          ) : (
            <p className="text-center text-gray-500">Carregando informações...</p>
          )}

          {info?.whatsapp && (
            <div className="text-center mt-12">
              <a
                href={`https://wa.me/${info.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Fale conosco pelo WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
