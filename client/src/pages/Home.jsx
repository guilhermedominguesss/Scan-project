import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuiz } from '../contexts/QuizContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTAButton from '../components/CTAButton';
import { motion } from 'framer-motion';

export default function Home() {
  const [_, setLocation] = useLocation();
  let lead = null;
  try {
    const quiz = useQuiz();
    lead = quiz?.lead;
  } catch (e) {
    // Context not available yet
  }

  const handleStart = () => {
    setLocation('/scan-growth');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2] relative overflow-hidden font-sans">
      <Header />
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-dark/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl w-full text-center space-y-8"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-[#F1ECE5] shadow-sm mb-4">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary">
              Análise Profissional Gratuita
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-dark leading-[1.1] tracking-tight">
            Descubra o Potencial <br className="hidden md:block" />
            <span className="text-primary italic relative inline-block">
              Oculto
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span> do seu Negócio
          </h1>
          
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed font-light">
            Um diagnóstico profundo para identificar onde você está perdendo dinheiro e como escalar sua operação com eficiência e previsibilidade.
          </p>

          <div className="pt-8 flex flex-col items-center gap-6">
            <div className="w-full max-w-xs md:max-w-sm">
              <CTAButton onClick={handleStart} className="shadow-elegant text-lg">
                Iniciar o Scan
              </CTAButton>
            </div>
            
            {lead && (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleStart}
                className="text-xs text-muted/60 hover:text-primary uppercase tracking-widest border-b border-transparent hover:border-primary transition-all pb-0.5"
              >
                Retomar sessão anterior
              </motion.button>
            )}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
