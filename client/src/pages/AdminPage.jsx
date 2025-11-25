import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import AdminTable from '../components/AdminTable';
import LeadModal from '../components/LeadModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, Download } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'guilherme2025') {
      setIsAuthenticated(true);
      loadLeads();
    } else {
      alert('Senha incorreta');
    }
  };

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await api.getLeads();
      // Sort by date desc
      const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLeads(sorted);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    if (!leads.length) return;
    
    const headers = ['Nome', 'Empresa', 'WhatsApp', 'Status', 'Potencial', 'Captação', 'Eficiência', 'Data'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        `"${lead.name}"`,
        `"${lead.company}"`,
        `"${lead.whatsapp}"`,
        lead.status || 'draft',
        lead.scores?.potencial || 0,
        lead.scores?.captacao || 0,
        lead.scores?.eficiencia || 0,
        `"${new Date(lead.createdAt).toISOString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center font-serif">Acesso Administrativo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Senha de acesso" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Analytics Data Prep
  const totalLeads = leads.length;
  const completedLeads = leads.filter(l => l.status === 'completed').length;
  const conversionRate = totalLeads ? Math.round((completedLeads / totalLeads) * 100) : 0;

  const funnelData = [
    { name: 'Visitantes', value: totalLeads + 10 }, // Fake visits for funnel visual
    { name: 'Iniciados', value: totalLeads },
    { name: 'Completos', value: completedLeads },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
          <Button onClick={exportCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalLeads}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scans Completos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{completedLeads}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Leads Recentes</h2>
              <Button variant="ghost" size="sm" onClick={loadLeads} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Atualizar'}
              </Button>
            </div>
            <AdminTable leads={leads} onRefresh={loadLeads} onViewLead={setSelectedLead} />
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Funil de Conversão</h2>
            <Card className="h-[300px] flex items-center justify-center p-4">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#9D6135" radius={[0, 4, 4, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>

      <LeadModal 
        lead={selectedLead} 
        open={!!selectedLead} 
        onOpenChange={(open) => !open && setSelectedLead(null)} 
      />
    </div>
  );
}
