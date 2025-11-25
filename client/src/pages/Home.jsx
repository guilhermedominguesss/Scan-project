import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuiz } from '../contexts/QuizContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTAButton from '../components/CTAButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Home() {
  const [_, setLocation] = useLocation();
  const { captureLead, lead } = useQuiz();
  const [showCapture, setShowCapture] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMaskPhone = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Simple mask (00) 00000-0000
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
      value = `${value.slice(0, 9)}-${value.slice(9)}`;
    }
    setFormData(prev => ({ ...prev, whatsapp: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.whatsapp) return;
    
    setLoading(true);
    try {
      await captureLead(formData);
      setLocation('/scan-growth');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResume = () => {
    setLocation('/scan-growth');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />

        <div className="max-w-3xl w-full z-10 grid md:grid-cols-1 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-bold uppercase tracking-widest mb-2">
              Análise Profissional Gratuita
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight">
              Descubra o Potencial Oculto do seu Negócio
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Um scan completo para identificar onde você está perdendo dinheiro e como escalar sua operação com eficiência.
            </p>

            <div className="pt-8 flex flex-col items-center gap-4">
              {!showCapture ? (
                <>
                  <CTAButton onClick={() => setShowCapture(true)} className="max-w-md text-xl py-8 px-10 shadow-2xl hover:scale-105 transition-transform">
                    Iniciar o Scan de Crescimento
                  </CTAButton>
                  
                  {lead && (
                    <button 
                      onClick={handleResume}
                      className="text-sm text-muted-foreground hover:text-primary underline decoration-dotted"
                    >
                      Retomar análise anterior de {lead.name}
                    </button>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-md"
                >
                  <Card className="border-primary/10 shadow-2xl">
                    <CardContent className="p-6 space-y-6">
                      <div className="text-center space-y-2">
                        <h3 className="font-serif text-xl font-bold text-primary">Antes de começar</h3>
                        <p className="text-sm text-muted-foreground">
                          Para salvar sua análise caso pare no meio, preencha seus dados. Leva &lt; 10s.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <div className="space-y-1.5">
                          <Label htmlFor="name">Nome completo</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="Seu nome" 
                            required
                            className="bg-background"
                          />
                        </div>
                        
                        <div className="space-y-1.5">
                          <Label htmlFor="company">Nome da empresa / estúdio</Label>
                          <Input 
                            id="company" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleChange} 
                            placeholder="Ex: Clínica Silva" 
                            required
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="whatsapp">WhatsApp</Label>
                          <Input 
                            id="whatsapp" 
                            name="whatsapp" 
                            value={formData.whatsapp} 
                            onChange={handleMaskPhone} 
                            placeholder="(00) 00000-0000" 
                            required
                            className="bg-background"
                          />
                        </div>

                        <CTAButton 
                          type="submit" 
                          loading={loading}
                          className="w-full mt-2"
                        >
                          Salvar e Iniciar Scan
                        </CTAButton>
                        
                        <p className="text-[10px] text-center text-muted-foreground/60">
                          Garantimos privacidade — só usaremos para enviar sua análise.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
