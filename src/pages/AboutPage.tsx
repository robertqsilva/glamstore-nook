
import { Layout } from '@/components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-playfair text-4xl font-bold mb-6 text-center">Sobre o Ateliê Gleice Rios</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-600 mb-8">
              O Ateliê Gleice Rios nasceu da paixão por criar peças únicas que destacam a elegância natural de cada mulher. Nossa marca é conhecida por designs exclusivos, atenção aos detalhes e compromisso com a qualidade.
            </p>
            
            <div className="mb-12 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80" 
                alt="Ateliê Gleice Rios" 
                className="w-full h-auto"
              />
            </div>
            
            <h2 className="font-playfair text-2xl font-bold mb-4">Nossa história</h2>
            <p>
              Fundado em 2015 por Gleice Rios, estilista apaixonada por moda e com uma visão única sobre a elegância feminina, o Ateliê Gleice Rios começou como um pequeno empreendimento focado em peças sob medida para eventos especiais.
            </p>
            
            <p>
              Com o tempo, o reconhecimento pela qualidade e originalidade das criações permitiu que o ateliê expandisse suas atividades, passando a oferecer coleções sazonais completas, mantendo sempre a essência de roupas exclusivas com acabamento impecável.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <img 
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Processo de criação" 
                className="rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Detalhes das peças" 
                className="rounded-lg shadow-md"
              />
            </div>
            
            <h2 className="font-playfair text-2xl font-bold mb-4">Nossa filosofia</h2>
            <p>
              Acreditamos que a verdadeira elegância está na simplicidade e na valorização da essência feminina. Cada peça é pensada não apenas como uma roupa, mas como uma extensão da personalidade de quem a veste.
            </p>
            
            <p>
              Nosso compromisso com a qualidade se reflete na escolha criteriosa dos tecidos, no cuidado com cada costura e na atenção dedicada aos detalhes que fazem toda a diferença no resultado final.
            </p>
            
            <h2 className="font-playfair text-2xl font-bold mb-4">Sustentabilidade</h2>
            <p>
              Comprometidos com um futuro mais consciente, o Ateliê Gleice Rios adota práticas sustentáveis em seu processo produtivo, desde a escolha de fornecedores até o aproveitamento máximo dos materiais para redução de resíduos.
            </p>
            
            <p>
              Nossas coleções são planejadas para serem atemporais, incentivando o consumo consciente e prolongando a vida útil das peças, que são feitas para durar muito além de uma temporada.
            </p>
            
            <div className="my-12 p-6 bg-rose-50 rounded-lg border border-rose-100">
              <h3 className="font-playfair text-xl font-bold mb-3 text-rose-700">Nossos valores</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Exclusividade em cada peça</li>
                <li>Compromisso com a qualidade</li>
                <li>Valorização do talento local</li>
                <li>Atenção personalizada</li>
                <li>Moda consciente e sustentável</li>
              </ul>
            </div>
            
            <h2 className="font-playfair text-2xl font-bold mb-4">Visite nosso ateliê</h2>
            <p>
              Convidamos você a conhecer o nosso espaço, onde poderá ver de perto o processo criativo e encontrar peças exclusivas que não estão disponíveis online.
            </p>
            
            <p className="mb-8">
              Para visitas, entre em contato pelo WhatsApp (00) 00000-0000 ou pelo e-mail contato@ateliegleicerios.com.br
            </p>
            
            <div className="text-center">
              <a 
                href="https://wa.me/557196451002" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Fale conosco pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
