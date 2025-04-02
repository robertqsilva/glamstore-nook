
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://raw.githubusercontent.com/robertqsilva/atelie-glamour-bazaar/refs/heads/main/public/lovable-uploads/d4dc73f1-a029-4418-bae1-73d28b7a9b7c.png')"
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-end text-center text-white px-4 md:px-8">
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s', paddingBottom: 100 }}>
          <Link 
            to="/colecao" 
            className="btn-primary bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40"
          >
            Ver Coleções
          </Link>
          <Link 
            to="/categoria/vestidos" 
            className="btn-secondary bg-rose-500/80 hover:bg-rose-500/90 text-white border-transparent"
          >
            Vestidos
          </Link>
        </div>
      </div>
    </div>
  );
};
