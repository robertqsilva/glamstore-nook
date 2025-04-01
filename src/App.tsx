
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { useEffect } from "react";
import { initializeMockData } from "@/services/api";

// Pages
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import CollectionPage from "./pages/CollectionPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsPage from "./pages/admin/ProductsPage";
import ProductForm from "./pages/admin/ProductForm";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => {
  // Initialize mock data on app start
  useEffect(() => {
    const initData = async () => {
      await initializeMockData();
    };
    initData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Store Front Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/colecao" element={<CollectionPage />} />
              <Route path="/categoria/:category" element={<CategoryPage />} />
              <Route path="/produto/:id" element={<ProductPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/produtos" element={<ProductsPage />} />
              <Route path="/admin/produtos/novo" element={<ProductForm />} />
              <Route path="/admin/produtos/:id" element={<ProductForm />} />
              <Route path="/admin/configuracoes" element={<SettingsPage />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
