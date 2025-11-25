import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LeadModal({ lead, open, onOpenChange }) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">Detalhes do Lead</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <label className="text-xs text-muted-foreground uppercase">Nome</label>
                <p className="font-medium">{lead.name}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase">Empresa</label>
                <p className="font-medium">{lead.company}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase">WhatsApp</label>
                <p className="font-medium">{lead.whatsapp}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase">Data</label>
                <p className="font-medium">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {lead.scores && (
              <div className="space-y-2">
                <h3 className="font-bold text-lg border-b pb-2">Resultados</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-primary/10 rounded">
                    <div className="text-xs uppercase">Potencial</div>
                    <div className="text-xl font-bold text-primary">{Math.round(lead.scores.potencial)}%</div>
                  </div>
                  <div className="p-2 bg-primary/10 rounded">
                    <div className="text-xs uppercase">Captação</div>
                    <div className="text-xl font-bold text-primary">{Math.round(lead.scores.captacao)}%</div>
                  </div>
                  <div className="p-2 bg-primary/10 rounded">
                    <div className="text-xs uppercase">Eficiência</div>
                    <div className="text-xl font-bold text-primary">{Math.round(lead.scores.eficiencia)}%</div>
                  </div>
                </div>
              </div>
            )}

            {lead.answers && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg border-b pb-2">Respostas</h3>
                {Object.entries(lead.answers).map(([key, value]) => (
                  <div key={key} className="bg-card border p-3 rounded shadow-sm">
                    <p className="text-xs text-muted-foreground font-mono mb-1">{key}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
