
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
  path: string;
}

export const Categories = () => {
  const categories: Category[] = [
    {
      id: 'vestidos',
      name: 'Vestidos',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1783&q=80',
      path: '/categoria/vestidos',
    },
    {
      id: 'saias',
      name: 'Saias',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
      path: '/categoria/saias',
    },
    {
      id: 'blusas',
      name: 'Blusas',
      image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      path: '/categoria/blusas',
    },
    {
      id: 'calcas',
      name: 'Calças',
      image: 'https://images.unsplash.com/photo-1509551388413-e18d05113e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      path: '/categoria/calcas',
    },
  ];

  return (
    <section className="container-custom py-16">
      <h2 className="font-playfair text-3xl font-bold mb-12 text-center">Categorias</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="group relative overflow-hidden rounded-lg aspect-[3/4]"
          >
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-playfair font-bold text-white">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
