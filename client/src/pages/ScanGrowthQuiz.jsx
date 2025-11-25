import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuiz } from '../contexts/QuizContext';
import { trackEvent, EVENTS } from '../utils/analytics';
import { calculateScores } from '../utils/scoreCalculator';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import { api } from '../services/api';

const QUESTIONS = [
  {
    id: 'business_desc',
    type: 'text',
    question: 'Para começar sua análise, me conte: qual é exatamente o seu negócio?',
    placeholder: 'Ex.: Atuo com estética facial em São Paulo. Atendo sozinha e quero lotar agenda.',
    microcopy: 'Escreva de forma objetiva — isso nos ajuda a entender seu desafio real.',
    buttonText: 'Avançar'
  },
  {
    id: 'challenge',
    type: 'select',
    question: 'Qual é o principal desafio comercial hoje?',
    options: [
      { value: 'new_clients', label: 'Conseguir novos clientes' },
      { value: 'retention', label: 'Manter clientes retornando' },
      { value: 'revenue', label: 'Aumentar faturamento' },
      { value: 'differentiation', label: 'Se destacar da concorrência' },
      { value: 'organize', label: 'Organizar / Profissionalizar' },
    ]
  },
  {
    id: 'structure',
    type: 'select',
    question: 'Como está a sua estrutura hoje?',
    options: [
      { value: 'solo', label: 'Faço tudo sozinho(a)' },
      { value: '1-2', label: 'Tenho 1–2 pessoas' },
      { value: 'small_team', label: 'Equipe pequena' },
      { value: 'structured', label: 'Empresa estruturada' },
    ]
  },
  {
    id: 'revenue_target',
    type: 'select',
    question: 'Quanto você quer faturar consistentemente por mês?',
    options: [
      { value: '2k-5k', label: 'R$ 2k – 5k' },
      { value: '5k-10k', label: 'R$ 5k – 10k' },
      { value: '10k-20k', label: 'R$ 10k – 20k' },
      { value: 'above_20k', label: 'Acima de R$ 20k' },
    ]
  },
  {
    id: 'acquisition_channel',
    type: 'select',
    question: 'Como você atrai hoje a maioria dos seus clientes?',
    options: [
      { value: 'instagram', label: 'Instagram' },
      { value: 'referral', label: 'Indicação' },
      { value: 'ads', label: 'Tráfego pago' },
      { value: 'physical', label: 'Loja física' },
      { value: 'none', label: 'Quase não atraio' },
    ]
  },
  {
    id: 'priority',
    type: 'select',
    question: 'Se pudesse resolver apenas um ponto neste mês, qual seria?',
    options: [
      { value: 'generate_leads', label: 'Gerar mais leads' },
      { value: 'close_sales', label: 'Melhorar taxa de fechamento' },
      { value: 'ticket', label: 'Aumentar ticket' },
      { value: 'automate', label: 'Automatizar atendimento' },
    ]
  }
];

export default function ScanGrowthQuiz() {
  const [_, setLocation] = useLocation();
  const { 
    step, 
    nextStep, 
    answers, 
    answerQuestion, 
    lead, 
    setScores,
    setStep
  } = useQuiz();

  useEffect(() => {
    // If no lead data, redirect to home to capture it first
    if (!lead) {
      setLocation('/');
      return;
    }
    
    trackEvent(EVENTS.QUIZ_STARTED, { leadId: lead.id });

    const handleUnload = () => {
      trackEvent(EVENTS.QUIZ_ABANDONED, { lastStep: step, leadId: lead.id });
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [lead, step, setLocation]);

  const handleAnswer = async (value) => {
    const currentQ = QUESTIONS[step];
    await answerQuestion(currentQ.id, value);
    
    if (step < QUESTIONS.length - 1) {
      nextStep();
    } else {
      // Finish Quiz
      const finalScores = calculateScores({ ...answers, [currentQ.id]: value });
      setScores(finalScores);
      
      // Save completed lead with scores
      const completedLead = {
        ...lead,
        answers: { ...answers, [currentQ.id]: value },
        scores: finalScores,
        status: 'completed',
        completedAt: new Date().toISOString()
      };
      
      await api.saveLead(completedLead);
      trackEvent(EVENTS.QUIZ_COMPLETED, { leadId: lead.id, scores: finalScores });
      
      setLocation('/radar');
    }
  };

  if (!lead) return null;

  const currentQ = QUESTIONS[step];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-20">
        <ProgressBar current={step + 1} total={QUESTIONS.length} />
        
        <QuestionCard 
          stepData={currentQ}
          onAnswer={handleAnswer}
          currentValue={answers[currentQ.id]}
          isLoading={false}
        />
      </main>
    </div>
  );
}
