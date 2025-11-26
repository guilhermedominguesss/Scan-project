import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuiz } from '../contexts/QuizContext';
import { trackEvent, EVENTS } from '../utils/analytics';
import Header from '../components/Header';
import RadarBar from '../components/RadarBar';
import CTAButton from '../components/CTAButton';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Share2 } from 'lucide-react';

export default function RadarPage() {
  const [_, setLocation] = useLocation();
  const { scores, lead } = useQuiz();

  useEffect(() => {
    if (!scores) {
      setLocation('/');
      return;
    }
    trackEvent(EVENTS.RADAR_VIEWED, { leadId: lead?.id });
  }, [scores, lead, setLocation]);

  if (!scores) return null;

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center p-6 md:p-12 max-w-6xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 max-w-2xl"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-white border border-[#F1ECE5] shadow-sm text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
            Análise Concluída
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-dark mb-6 leading-tight">
            O Raio-X do seu Negócio
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Com base nas suas respostas, mapeamos os 3 pilares fundamentais do seu crescimento.
          </p>
        </motion.div>

        <div className="w-full mb-12">
          <RadarBar scores={scores} />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-md space-y-4"
        >
          <CTAButton onClick={() => setLocation('/lp')} className="shadow-elegant" variant="primary">
            Ver plano de ação detalhado
            <ArrowRight className="ml-2 h-5 w-5" />
          </CTAButton>
          
          <p className="text-xs text-center text-muted/60">
            Seu relatório completo está pronto na próxima página.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
