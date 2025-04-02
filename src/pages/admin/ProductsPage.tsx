
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { getProducts, deleteProduct } from '@/services/api';
import { Product, ProductFilter } from '@/types/product';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Plus, Search, Trash2, Star, Tag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilter>({
    search: '',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete.id);
      await fetchProducts();
      toast.success('Produto excluído com sucesso');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Erro ao excluir produto');
    } finally {
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button onClick={() => navigate('/admin/produtos/novo')}>
          <Plus className="mr-2 h-4 w-4" /> Novo Produto
        </Button>
      </div>

      <div className="bg-white rounded-md shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar produtos..."
              className="pl-9"
              value={filters.search}
              onChange={handleSearch}
            />
          </div>
          {/* Additional filters can be added here */}
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow overflow-hidden">
          {products.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">Nenhum produto encontrado</p>
              <Button variant="outline" onClick={() => navigate('/admin/produtos/novo')}>
                <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="capitalize">{product.category}</TableCell>
                      <TableCell>
                        {product.saleprice ? (
                          <div>
                            <span className="text-rose-500 font-medium">
                              {formatCurrency(product.saleprice)}
                            </span>
                            <span className="text-gray-400 line-through text-xs ml-2">
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                        ) : (
                          formatCurrency(product.price)
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.instock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.instock ? 'Em estoque' : 'Esgotado'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {product.featured && (
                            <span title="Destaque">
                              <Star size={16} className="text-amber-500" />
                            </span>
                          )}
                          {product.saleprice && (
                            <span title="Promoção">
                              <Tag size={16} className="text-rose-500" />
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/admin/produtos/${product.id}`)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto "{productToDelete?.name}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default ProductsPage;
