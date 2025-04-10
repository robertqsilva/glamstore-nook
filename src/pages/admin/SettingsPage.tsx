import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import axios from 'axios';

declare global {
  interface Window {
    tinymce: any;
  }
}

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    horario: '',
    descricao: '',
    sobre: '',
    instagram: '',
    facebook: '',
  });

  const API_URL = 'https://atelie-backend.onrender.com/api/infoloja';

  // Carrega TinyMCE
  useEffect(() => {
    const loadTinyMCE = () => {
      const existingScript = document.querySelector('script[src*="tinymce.min.js"]');
      if (existingScript) return;

      const script = document.createElement('script');
      script.src = 'https://cdn.tiny.cloud/1/vbfe4m6jzvaa5ipsfg5iz3703o3g4y6yfajvrki8w59npwou/tinymce/7/tinymce.min.js';
      script.referrerPolicy = 'origin';
      script.onload = () => {
        window.tinymce?.init({
          selector: '#sobreEditor',
          height: 300,
          menubar: false,
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist | emoticons charmap | removeformat',
          setup: (editor: any) => {
            editor.on('Change', () => {
              setFormData((prev) => ({
                ...prev,
                sobre: editor.getContent(),
              }));
            });
          },
        });
      };
      document.body.appendChild(script);
    };

    loadTinyMCE();
  }, []);

  // Carrega dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setFormData(res.data);

        // Seta o conteúdo do TinyMCE se já estiver carregado
        if (window.tinymce?.get('sobreEditor')) {
          window.tinymce.get('sobreEditor').setContent(res.data.sobre || '');
        }
      } catch (error) {
        console.error('Erro ao carregar informações da loja:', error);
        toast.error('Erro ao carregar informações da loja');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const editorContent = window.tinymce?.get('sobreEditor')?.getContent();
      const dataToSend = { ...formData, sobre: editorContent || formData.sobre };

      await axios.post(API_URL, dataToSend);
      toast.success('Configurações salvas com sucesso');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informações da Loja</CardTitle>
            <CardDescription>Configure as informações básicas da sua loja virtual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Loja</Label>
                <Input id="nome" value={formData.nome} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail de Contato</Label>
                <Input id="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" value={formData.whatsapp} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horario">Horário de Atendimento</Label>
                <Input id="horario" value={formData.horario} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição da Loja</Label>
              <Textarea
                id="descricao"
                rows={3}
                value={formData.descricao}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sobreEditor">Sobre a Loja</Label>
              <textarea
                id="sobreEditor"
                defaultValue={formData.sobre}
                className="hidden"
              ></textarea>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
            <CardDescription>Adicione os links para suas redes sociais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" value={formData.instagram} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" value={formData.facebook} onChange={handleChange} />
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
