import React, { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';
import { trackEvent, EVENTS } from '../utils/analytics';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTAButton from '../components/CTAButton';
import { motion } from 'framer-motion';
import { Check, Star, TrendingUp, Users, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function LPPage() {
  const { scores, lead } = useQuiz();

  useEffect(() => {
    trackEvent(EVENTS.LP_VIEWED, { leadId: lead?.id });
  }, [lead]);

  const handleWhatsApp = () => {
    trackEvent(EVENTS.WHATSAPP_CLICKED, { leadId: lead?.id });
    const name = lead?.name || 'Visitante';
    const company = lead?.company || 'Minha Empresa';
    const message = `Olá! Completei o Scan de Crescimento. Meu nome é ${name}. Empresa: ${company}. Quero conversar sobre meus resultados.`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight"
        >
          Seu negócio tem potencial de <span className="text-primary underline decoration-accent/50 decoration-4 underline-offset-4">Escalar</span>.
          <br/>Agora faltam os movimentos certos.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-muted-foreground mb-10"
        >
          Veja onde você perde clientes e como corrigir com uma estratégia validada.
        </motion.p>
      </section>

      {/* Analysis Breakdown (Dynamic based on scores) */}
      <section className="py-16 bg-muted/30 w-full">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Demanda & Captação', 
              score: scores?.captacao || 0,
              icon: Users,
              desc: 'Como você atrai novos clientes todos os dias.'
            },
            { 
              title: 'Conversão & Vendas', 
              score: scores?.eficiencia || 0,
              icon: Target,
              desc: 'Sua capacidade de transformar interessados em pagantes.'
            },
            { 
              title: 'Escala & Futuro', 
              score: scores?.potencial || 0,
              icon: TrendingUp,
              desc: 'O quanto sua estrutura atual suporta crescimento.'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-8 h-full border-t-4 border-t-primary shadow-lg hover:shadow-xl transition-all bg-card">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{Math.round(item.score)}%</div>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center text-sm font-medium text-accent-foreground">
                    {item.score < 60 ? (
                      <span className="text-red-600 flex items-center"><Check className="w-4 h-4 mr-1" /> Atenção Prioritária</span>
                    ) : (
                      <span className="text-green-600 flex items-center"><Check className="w-4 h-4 mr-1" /> Ponto Forte</span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-serif font-bold text-center">Resultados Reais</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-xl border shadow-sm italic text-lg text-muted-foreground relative">
              <div className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">"</div>
              <p>Passei de 8 para 24 atendimentos semanais em apenas 30 dias seguindo o plano de ação.</p>
              <div className="mt-4 flex items-center gap-2 not-italic">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">A</div>
                <div>
                  <p className="font-bold text-foreground text-sm">Ana Paula</p>
                  <p className="text-xs">Esteticista</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-sm italic text-lg text-muted-foreground relative">
              <div className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">"</div>
              <p>Finalmente entendi onde estava perdendo clientes. A clareza que o scan me deu foi fundamental.</p>
              <div className="mt-4 flex items-center gap-2 not-italic">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">R</div>
                <div>
                  <p className="font-bold text-foreground text-sm">Ricardo S.</p>
                  <p className="text-xs">Dono de Clínica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 bg-[#232326] text-white text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#F8F7F2]">
            Estamos prontos para te mostrar exatamente onde você perde clientes.
          </h2>
          <p className="text-white/70 text-lg">
            Essa análise foi apenas o começo. Vamos desenhar o plano de ação completo para o seu negócio.
          </p>
          
          <div className="pt-4">
            <CTAButton 
              onClick={handleWhatsApp} 
              variant="accent" 
              className="text-xl py-8 px-12 shadow-[0_0_30px_rgba(205,165,128,0.3)]"
            >
              Falar com a equipe agora
            </CTAButton>
            <p className="mt-4 text-sm text-white/40">Vagas limitadas para análise gratuita.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
