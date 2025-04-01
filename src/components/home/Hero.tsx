
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1601037432416-3ee7c4c33e61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          Moda Feminina Exclusiva
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Elegância e qualidade para mulheres que valorizam peças únicas
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
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
