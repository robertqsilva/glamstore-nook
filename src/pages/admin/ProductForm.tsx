
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { getProductById, createProduct, updateProduct, getCategories } from '@/services/api';
import { ProductFormData } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';

const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  description: z.string().min(10, { message: 'Descrição deve ter pelo menos 10 caracteres' }),
  price: z.coerce.number().positive({ message: 'Preço deve ser positivo' }),
  salePrice: z.coerce.number().positive({ message: 'Preço de promoção deve ser positivo' }).nullable(),
  category: z.string().min(1, { message: 'Categoria é obrigatória' }),
  images: z.array(z.string().url({ message: 'URL de imagem inválida' })).min(1, { message: 'Pelo menos uma imagem é necessária' }),
  colors: z.array(z.string()).min(1, { message: 'Pelo menos uma cor é necessária' }),
  sizes: z.array(z.string()).min(1, { message: 'Pelo menos um tamanho é necessário' }),
  inStock: z.boolean(),
  featured: z.boolean(),
});

const defaultValues: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  salePrice: null,
  category: '',
  images: [''],
  colors: ['#000000'],
  sizes: ['P'],
  inStock: true,
  featured: false,
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const isEditMode = !!id;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    if (isEditMode) {
      fetchProduct(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    setLoading(true);
    try {
      const product = await getProductById(productId);
      form.reset(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Erro ao carregar produto');
      navigate('/admin/produtos');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      if (isEditMode) {
        await updateProduct(parseInt(id), data);
        toast.success('Produto atualizado com sucesso');
      } else {
        await createProduct(data);
        toast.success('Produto criado com sucesso');
      }
      navigate('/admin/produtos');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(`Erro ao ${isEditMode ? 'atualizar' : 'criar'} produto`);
    } finally {
      setLoading(false);
    }
  };

  const addImage = () => {
    if (!imageUrl) return;
    const images = form.getValues().images || [];
    form.setValue('images', [...images, imageUrl]);
    setImageUrl('');
  };

  const removeImage = (index: number) => {
    const images = form.getValues().images;
    form.setValue('images', images.filter((_, i) => i !== index));
  };

  if (loading && isEditMode) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </AdminLayout>
    );
  }

  const availableSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', '36', '38', '40', '42', '44', '46', '48'];

  return (
    <AdminLayout>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/produtos')}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditMode ? 'Editar Produto' : 'Novo Produto'}
        </h1>
      </div>

      <div className="bg-white rounded-md shadow p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Vestido Floral Primavera" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category} className="capitalize">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição detalhada do produto..." 
                      className="resize-none min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0" 
                        step="0.01" 
                        placeholder="199.90" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.valueAsNumber || 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Promocional (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        placeholder="149.90" 
                        {...field}
                        value={field.value === null ? '' : field.value}
                        onChange={(e) => {
                          const value = e.target.value === '' ? null : e.target.valueAsNumber;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Deixe em branco se não houver promoção
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Imagens</FormLabel>
              <div className="flex flex-wrap gap-4 mt-2">
                {form.watch('images')?.map((image, index) => (
                  <div key={index} className="relative w-full md:w-40 h-40 border rounded-md overflow-hidden group">
                    <img src={image} alt={`Produto ${index + 1}`} className="w-full h-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}

                <div className="w-full md:w-40 h-40 border rounded-md border-dashed flex flex-col items-center justify-center p-2">
                  <Input
                    type="url"
                    placeholder="URL da imagem"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="mb-2"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addImage}>
                    <Plus size={16} className="mr-1" /> Adicionar
                  </Button>
                </div>
              </div>
              {form.formState.errors.images && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.images.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormLabel>Tamanhos Disponíveis</FormLabel>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableSizes.map((size) => (
                    <FormField
                      key={size}
                      control={form.control}
                      name="sizes"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(size)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  const updated = checked
                                    ? [...current, size]
                                    : current.filter((val) => val !== size);
                                  field.onChange(updated);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm cursor-pointer">
                              {size}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                {form.formState.errors.sizes && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.sizes.message}
                  </p>
                )}
              </div>

              <div>
                <FormLabel>Cores</FormLabel>
                <div className="flex flex-wrap gap-3 mt-2">
                  {['#000000', '#FFFFFF', '#F8C3D3', '#A52A2A', '#F5F5DC', '#808080'].map((color) => (
                    <FormField
                      key={color}
                      control={form.control}
                      name="colors"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-col items-center space-y-1">
                            <FormControl>
                              <Checkbox
                                className="sr-only"
                                checked={field.value?.includes(color)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  const updated = checked
                                    ? [...current, color]
                                    : current.filter((val) => val !== color);
                                  field.onChange(updated);
                                }}
                              />
                            </FormControl>
                            <div
                              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                                field.value?.includes(color) 
                                  ? 'border-rose-500' 
                                  : 'border-transparent'
                              }`}
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                const current = field.value || [];
                                const updated = current.includes(color)
                                  ? current.filter((val) => val !== color)
                                  : [...current, color];
                                field.onChange(updated);
                              }}
                            />
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                {form.formState.errors.colors && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.colors.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Produto em estoque
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Produto em destaque
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/produtos')}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="bg-rose-500 hover:bg-rose-600">
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Salvando...' : 'Salvar Produto'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
