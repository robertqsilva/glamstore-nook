
export const AboutSection = () => {
  return (
    <section className="bg-rose-50 py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-playfair text-6xl font-bold mb-4">Sobre o Ateliê</h2>
            <a 
              href="/sobre" 
              className="font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Conheça nossa história →
            </a>
          </div>
          
          <div className="relative">
            <img 
              src="https://raw.githubusercontent.com/robertqsilva/atelie-glamour-bazaar/refs/heads/main/public/lovable-uploads/d4dc73f1-a029-4418-bae1-73d28b7a9b7c.png" 
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
