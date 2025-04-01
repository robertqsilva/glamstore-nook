
export const AboutSection = () => {
  return (
    <section className="bg-rose-50 py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-playfair text-3xl font-bold mb-4">Sobre o Ateliê</h2>
            <p className="text-gray-700 mb-4">
              O Ateliê Gleice Rios nasceu da paixão por criar peças únicas que destacam a elegância natural de cada mulher. Nossa marca é conhecida por designs exclusivos, atenção aos detalhes e compromisso com a qualidade.
            </p>
            <p className="text-gray-700 mb-6">
              Cada peça é cuidadosamente elaborada para valorizar a feminilidade e garantir conforto e estilo para diversas ocasiões.
            </p>
            <a 
              href="/sobre" 
              className="font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Conheça nossa história →
            </a>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
              alt="Ateliê Gleice Rios" 
              className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-rose-100 rounded-full -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-rose-200 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
