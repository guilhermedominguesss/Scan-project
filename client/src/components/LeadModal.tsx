import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from 'lucide-react';

export default function LeadModal({ lead, open, onOpenChange }) {
  if (!lead) return null;

  const handleWhatsApp = () => {
    const phone = lead.whatsapp.replace(/\D/g, '');
    const message = `Olá ${lead.name}, vi que você gerou seu Scan de Crescimento para a ${lead.company}. Podemos conversar sobre seus resultados?`;
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white rounded-card border-none shadow-elegant">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">Detalhes do Lead</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-8 p-1">
            {/* Header Info */}
            <div className="bg-[#F8F7F2] p-6 rounded-xl border border-[#F1ECE5] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] text-muted uppercase tracking-wider font-bold block mb-1">Nome</label>
                <p className="font-serif text-xl font-bold text-dark">{lead.name}</p>
              </div>
              <div>
                <label className="text-[10px] text-muted uppercase tracking-wider font-bold block mb-1">Empresa</label>
                <p className="font-medium text-dark">{lead.company}</p>
              </div>
              <div>
                <label className="text-[10px] text-muted uppercase tracking-wider font-bold block mb-1">WhatsApp</label>
                <p className="font-mono text-dark">{lead.whatsapp}</p>
              </div>
              <div>
                <label className="text-[10px] text-muted uppercase tracking-wider font-bold block mb-1">Data</label>
                <p className="text-sm text-dark">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <MessageCircle className="mr-2 h-4 w-4" />
                Abrir WhatsApp
              </Button>
            </div>

            {/* Scores */}
            {lead.scores && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-4 text-dark border-b pb-2">Resultados do Radar</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(lead.scores).map(([key, val]) => (
                    <div key={key} className="text-center p-4 rounded-xl bg-white border border-[#F1ECE5] shadow-sm">
                      <div className="text-[10px] uppercase text-muted mb-1">{key}</div>
                      <div className="text-2xl font-bold text-primary">{Math.round(val)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Answers */}
            {lead.answers && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-4 text-dark border-b pb-2">Respostas do Quiz</h3>
                <div className="space-y-3">
                  {Object.entries(lead.answers).map(([key, value]) => (
                    <div key={key} className="bg-[#FAFAFA] p-4 rounded-lg border border-input">
                      <p className="text-xs text-primary font-mono mb-1 uppercase">{key}</p>
                      <p className="text-sm text-dark">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
