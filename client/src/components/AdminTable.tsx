import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MessageCircle, RefreshCcw, Eye } from 'lucide-react';

export default function AdminTable({ leads, onRefresh, onViewLead }) {
  const handleWhatsApp = (lead) => {
    const phone = lead.whatsapp.replace(/\D/g, '');
    const message = `Olá ${lead.name}, vi que você gerou seu Scan de Crescimento para a ${lead.company}. Podemos conversar sobre seus resultados?`;
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="rounded-md border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Nome / Empresa</TableHead>
            <TableHead>Scores (P/C/E)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Nenhum lead encontrado.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id || lead.leadId}>
                <TableCell className="font-medium text-xs text-muted-foreground">
                  {lead.createdAt ? format(new Date(lead.createdAt), "dd/MM HH:mm", { locale: ptBR }) : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">{lead.name}</span>
                    <span className="text-xs text-muted-foreground">{lead.company}</span>
                    <span className="text-xs text-muted-foreground">{lead.whatsapp}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {lead.scores ? (
                    <div className="flex gap-1 text-xs font-mono">
                      <span className="text-primary font-bold">{Math.round(lead.scores.potencial)}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-primary font-bold">{Math.round(lead.scores.captacao)}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-primary font-bold">{Math.round(lead.scores.eficiencia)}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">Incompleto</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs uppercase">
                    {lead.scores ? 'Completo' : 'Rascunho'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleWhatsApp(lead)} title="WhatsApp">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onViewLead && onViewLead(lead)} title="Ver Detalhes">
                      <Eye className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
