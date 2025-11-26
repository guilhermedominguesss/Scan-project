import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import AdminTable from '../components/AdminTable';
import LeadModal from '../components/LeadModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, Download, Lock } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F2] p-4">
        <Card className="w-full max-w-md rounded-card shadow-elegant border border-[#F1ECE5]">
          <CardHeader className="text-center space-y-2">
            <div className="w-12 h-12 bg-dark text-white rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <CardTitle className="font-serif text-2xl">Acesso Administrativo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Senha de acesso" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-lg"
              />
              <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90">Entrar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Analytics
  const totalLeads = leads.length;
  const completedLeads = leads.filter(l => l.status === 'completed').length;
  const conversionRate = totalLeads ? Math.round((completedLeads / totalLeads) * 100) : 0;

  const funnelData = [
    { name: 'Visitantes', value: totalLeads + 25 }, // Fake visits
    { name: 'Leads (Draft)', value: totalLeads },
    { name: 'Completos', value: completedLeads },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F2] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-dark">Dashboard</h1>
            <p className="text-muted text-sm">Visão geral de performance e leads.</p>
          </div>
          <Button onClick={exportCSV} variant="outline" className="bg-white border-[#F1ECE5] shadow-sm hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-xl border-none shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest font-bold text-muted">Total de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-dark">{totalLeads}</div>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-none shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest font-bold text-muted">Scans Completos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{completedLeads}</div>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-none shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest font-bold text-muted">Taxa de Conclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">{conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-serif text-dark">Leads Recentes</h2>
              <Button variant="ghost" size="sm" onClick={loadLeads} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Atualizar'}
              </Button>
            </div>
            <div className="bg-white rounded-card shadow-soft border border-[#F1ECE5] overflow-hidden">
              <AdminTable leads={leads} onRefresh={loadLeads} onViewLead={setSelectedLead} />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold font-serif text-dark mb-6">Funil de Conversão</h2>
            <Card className="h-[350px] rounded-card shadow-soft border border-[#F1ECE5] flex items-center justify-center p-6 bg-white">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EAE5DF" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#6A635A'}} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 22px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" fill="#9D6135" radius={[0, 4, 4, 0]} barSize={32} />
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
