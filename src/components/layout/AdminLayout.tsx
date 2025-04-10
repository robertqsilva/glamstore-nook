import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'bg-rose-100 text-rose-600'
      : 'text-gray-600 hover:bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Mobile Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeSidebar}
        >
          <div
            className={`fixed left-0 top-0 w-64 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold text-rose-600">Ateliê Admin</h2>
              <button onClick={closeSidebar}>
                <X size={20} />
              </button>
            </div>
            <nav className="mt-6">
              <ul>
                <li className="px-4 py-2">
                  <Link
                    to="/admin"
                    onClick={closeSidebar}
                    className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin')}`}
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link
                    to="/admin/produtos"
                    onClick={closeSidebar}
                    className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin/produtos')}`}
                  >
                    <ShoppingBag size={18} />
                    <span>Produtos</span>
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link
                    to="/admin/configuracoes"
                    onClick={closeSidebar}
                    className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin/configuracoes')}`}
                  >
                    <Settings size={18} />
                    <span>Configurações</span>
                  </Link>
                </li>
                <li className="px-4 py-2 mt-10">
                  <Link
                    to="/"
                    onClick={closeSidebar}
                    className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    <LogOut size={18} />
                    <span>Sair</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Sidebar Desktop */}
        <div className="w-64 bg-white shadow-md min-h-screen hidden md:block">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-rose-600">Ateliê Admin</h2>
          </div>
          <nav className="mt-6">
            <ul>
              <li className="px-4 py-2">
                <Link to="/admin" className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin')}`}>
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="px-4 py-2">
                <Link to="/admin/produtos" className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin/produtos')}`}>
                  <ShoppingBag size={18} />
                  <span>Produtos</span>
                </Link>
              </li>
              <li className="px-4 py-2">
                <Link to="/admin/configuracoes" className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin/configuracoes')}`}>
                  <Settings size={18} />
                  <span>Configurações</span>
                </Link>
              </li>
              <li className="px-4 py-2 mt-10">
                <Link to="/" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100">
                  <LogOut size={18} />
                  <span>Sair</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1">
          {/* Topbar */}
          <div className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="md:hidden" onClick={toggleSidebar} aria-label="Abrir menu">
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-rose-600">Painel Administrativo</h2>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Admin</span>
            </div>
          </div>

          {/* Conteúdo */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};
