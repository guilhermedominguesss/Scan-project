import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuiz } from '../contexts/QuizContext';
import { trackEvent, EVENTS } from '../utils/analytics';
import Header from '../components/Header';
import RadarBar from '../components/RadarBar';
import CTAButton from '../components/CTAButton';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-5xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 max-w-2xl"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Sua análise está pronta.
          </h1>
          <p className="text-muted-foreground text-lg">
            Com base nas suas respostas, identificamos exatamente onde seu negócio está perdendo oportunidades.
          </p>
        </motion.div>

        <RadarBar scores={scores} />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 w-full max-w-md"
        >
          <CTAButton onClick={() => setLocation('/lp')} className="text-lg shadow-xl">
            Ver meus pontos de crescimento
            <ArrowRight className="ml-2 h-5 w-5" />
          </CTAButton>
        </motion.div>
      </main>
    </div>
  );
}
