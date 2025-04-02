
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Configurações salvas com sucesso');
    }, 1000);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informações da Loja</CardTitle>
            <CardDescription>
              Configure as informações básicas da sua loja virtual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Nome da Loja</Label>
                <Input id="store-name" defaultValue="Ateliê Gleice Rios" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">E-mail de Contato</Label>
                <Input id="store-email" defaultValue="contato@ateliegleicerios.com.br" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-phone">WhatsApp</Label>
                <Input id="store-phone" defaultValue="(00) 00000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-hours">Horário de Atendimento</Label>
                <Input id="store-hours" defaultValue="Seg-Sex, 9h às 18h" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="store-description">Descrição da Loja</Label>
              <Textarea 
                id="store-description" 
                rows={4}
                defaultValue="Moda feminina exclusiva para mulheres que valorizam elegância e qualidade."
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
            <CardDescription>
              Adicione os links para suas redes sociais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" defaultValue="https://instagram.com/_usegleicerios/" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" defaultValue="https://facebook.com/_usegleicerios/" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Separator className="my-6" />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="bg-rose-500 hover:bg-rose-600">
            {loading ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default SettingsPage;
