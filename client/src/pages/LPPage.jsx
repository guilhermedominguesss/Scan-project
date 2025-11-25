import React, { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';
import { trackEvent, EVENTS } from '../utils/analytics';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTAButton from '../components/CTAButton';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, MessageCircle, Quote } from 'lucide-react';

export default function LPPage() {
  const { scores, lead } = useQuiz();

  useEffect(() => {
    trackEvent(EVENTS.LP_VIEWED, { leadId: lead?.id });
  }, [lead]);

  const handleWhatsApp = () => {
    trackEvent(EVENTS.WHATSAPP_CLICKED, { leadId: lead?.id });
    const name = lead?.name || 'Visitante';
    const company = lead?.company || 'Minha Empresa';
    // Dynamic greeting based on time of day
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    
    const message = `${greeting}! Completei o Scan de Crescimento. Meu nome é ${name}, da empresa ${company}. Gostaria de conversar sobre meus resultados e entender como melhorar meus pontos fracos.`;
    window.open(`https://wa.me/41984804266?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Fallback scores if accessed directly without quiz
  const safeScores = scores || { potencial: 0, captacao: 0, eficiencia: 0 };

  return (
    <div className="min-h-screen bg-[#F8F7F2] font-sans selection:bg-primary/20">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-6 md:px-12 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#F1ECE5] shadow-sm mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-dark">Diagnóstico Concluído</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-dark mb-8 leading-tight">
            Seu negócio tem potencial de <br/>
            <span className="text-primary underline decoration-accent/30 decoration-4 underline-offset-8">Escalar Agora</span>.
          </h1>
          
          <p className="text-xl text-muted max-w-2xl mx-auto font-light leading-relaxed">
            Analisamos seus dados e identificamos exatamente onde está o gargalo.
            <br/>Não é falta de esforço — é falta de <strong>estratégia direcionada</strong>.
          </p>
        </motion.div>
      </section>

      {/* Analysis Breakdown Cards */}
      <section className="py-20 bg-white w-full border-y border-[#F1ECE5]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Demanda & Captação', 
              score: safeScores.captacao,
              icon: Users,
              desc: 'Como você atrai novos clientes todos os dias.',
              lowMsg: 'Sua captação está instável. Você depende muito de indicação ou sorte.',
              highMsg: 'Você atrai bem, mas pode estar pagando caro por leads desqualificados.'
            },
            { 
              title: 'Conversão & Vendas', 
              score: safeScores.eficiencia,
              icon: Target,
              desc: 'Sua capacidade de transformar interessados em pagantes.',
              lowMsg: 'Você está deixando dinheiro na mesa. Muitos curiosos, poucos pagantes.',
              highMsg: 'Sua conversão é boa, mas será que seu ticket médio está otimizado?'
            },
            { 
              title: 'Escala & Futuro', 
              score: safeScores.potencial,
              icon: TrendingUp,
              desc: 'O quanto sua estrutura atual suporta crescimento.',
              lowMsg: 'Se você dobrar as vendas hoje, sua operação colapsa. Cuidado.',
              highMsg: 'Você tem base para crescer, mas precisa automatizar processos manuais.'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#FAFAFA] rounded-card p-8 border border-[#F1ECE5] shadow-soft hover:shadow-elegant transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white rounded-xl shadow-sm text-primary border border-[#F1ECE5]">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-serif font-bold text-dark">{Math.round(item.score)}%</div>
              </div>
              
              <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
              <p className="text-sm text-muted mb-6">{item.desc}</p>
              
              <div className="bg-white p-4 rounded-xl border border-[#F1ECE5]">
                <p className="text-xs font-medium text-dark leading-relaxed">
                  <span className="text-primary font-bold uppercase text-[10px] tracking-widest block mb-1">Diagnóstico:</span>
                  {item.score < 60 ? item.lowMsg : item.highMsg}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof Section - TEXT ONLY */}
      <section className="py-24 px-6 bg-[#F8F7F2] overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark">
              Resultados de nossos clientes
            </h2>
            <p className="text-muted">Veja como empresas como a sua crescem com estratégia direcionada.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-card shadow-elegant border border-[#F1ECE5] flex flex-col justify-between"
            >
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 bg-primary rounded-full" />)}
                </div>
                <p className="text-dark font-serif italic text-lg leading-relaxed">
                  "Triplicamos a agenda em 60 dias. O scan mostrou que nosso gargalo não era captação, era fechamento. Mudamos o processo de vendas e explodiu."
                </p>
              </div>
              <div className="border-t border-[#F1ECE5] pt-4">
                <p className="font-bold text-dark text-sm">Clínica Lumina</p>
                <p className="text-xs text-muted uppercase tracking-wider font-medium">Estética & Bem-estar</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-card shadow-elegant border border-[#F1ECE5] flex flex-col justify-between"
            >
              <div className="mb-6">
                 <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 bg-primary rounded-full" />)}
                </div>
                <p className="text-dark font-serif italic text-lg leading-relaxed">
                  "Vendas cresceram 68% em 45 dias depois de implementar as recomendações. Não foi sorte — foi estratégia. Agora sabemos exatamente o que funciona."
                </p>
              </div>
              <div className="border-t border-[#F1ECE5] pt-4">
                <p className="font-bold text-dark text-sm">FitStyle Boutique</p>
                <p className="text-xs text-muted uppercase tracking-wider font-medium">E-commerce de Moda</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-card shadow-elegant border border-[#F1ECE5] flex flex-col justify-between"
            >
              <div className="mb-6">
                 <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 bg-primary rounded-full" />)}
                </div>
                <p className="text-dark font-serif italic text-lg leading-relaxed">
                  "Virei referência na região em apenas 90 dias. A análise mostrou que eu estava desperdiçando 40% dos meus leads. Simples ajuste, resultados enormes."
                </p>
              </div>
              <div className="border-t border-[#F1ECE5] pt-4">
                <p className="font-bold text-dark text-sm">Barber Pro Prime</p>
                <p className="text-xs text-muted uppercase tracking-wider font-medium">Serviços Premium</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final - Black Section */}
      <section className="py-32 px-6 bg-[#232326] text-white text-center relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-10 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F8F7F2] leading-tight">
            Estamos prontos para te mostrar exatamente onde você perde clientes.
          </h2>
          <p className="text-white/60 text-xl font-light">
            Essa análise foi apenas o começo. Vamos desenhar o plano de ação completo para o seu negócio escalar nos próximos 30 dias.
          </p>
          
          <div className="pt-8 flex flex-col items-center">
            <CTAButton 
              onClick={handleWhatsApp} 
              variant="accent" 
              className="text-xl py-8 px-12 min-w-[300px] shadow-[0_0_40px_rgba(205,165,128,0.2)] hover:shadow-[0_0_60px_rgba(205,165,128,0.4)] border-none"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Falar com a equipe agora
            </CTAButton>
            
            <div className="mt-6 flex items-center gap-2 text-sm text-white/30 uppercase tracking-widest">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Vagas limitadas para análise gratuita
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
