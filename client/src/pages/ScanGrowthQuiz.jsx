import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQuiz } from '../contexts/QuizContext';
import { trackEvent, EVENTS } from '../utils/analytics';
import { calculateScores } from '../utils/scoreCalculator';
import { formatPhoneBR, validatePhoneBR } from '../utils/validators';
import { api } from '../services/api';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import CTAButton from '../components/CTAButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { LockKeyhole, CheckCircle2, AlertCircle } from 'lucide-react';

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
    setStep,
    answers, 
    answerQuestion, 
    lead, 
    captureLead,
    setScores
  } = useQuiz();

  const [captureForm, setCaptureForm] = useState({
    name: '',
    company: '',
    whatsapp: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize state based on existing lead
  useEffect(() => {
    if (lead && lead.name) {
      setCaptureForm({
        name: lead.name,
        company: lead.company,
        whatsapp: lead.whatsapp
      });
    }
  }, [lead]);

  // Before Unload Tracking
  useEffect(() => {
    const handleUnload = () => {
      // Track abandonment if quiz started (step > 0) but not finished
      if (step > 0 && step <= QUESTIONS.length) {
         trackEvent(EVENTS.QUIZ_ABANDONED, { lastStep: step, leadId: lead?.id });
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [lead, step]);


  // STEP 0: CAPTURE HANDLER
  const handleCaptureSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!captureForm.name || !captureForm.company || !captureForm.whatsapp) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Simple validation length check
    if (captureForm.whatsapp.replace(/\D/g, '').length < 10) {
      setError('Por favor, insira um WhatsApp válido.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await captureLead({
        ...captureForm,
        startedAt: new Date().toISOString()
      });
      
      trackEvent(EVENTS.LEAD_CAPTURED_DRAFT, { leadId: lead?.id });
      // Move to Question 1
      nextStep(); 
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e) => {
    setCaptureForm(prev => ({ ...prev, whatsapp: formatPhoneBR(e.target.value) }));
    if (error) setError('');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCaptureForm(prev => ({ ...prev, [id]: value }));
    if (error) setError('');
  };

  // STEP 1-6: QUIZ HANDLER
  const handleAnswer = async (value) => {
    // QUESTIONS array is 0-indexed, but Steps are 1-indexed relative to QUESTIONS
    // So Step 1 = QUESTIONS[0]
    const questionIndex = step - 1;
    const currentQ = QUESTIONS[questionIndex];
    
    await answerQuestion(currentQ.id, value);
    
    nextStep();
  };

  // STEP 7: FINAL SUBMIT
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const finalScores = calculateScores(answers);
      setScores(finalScores);
      
      const completedLead = {
        ...lead,
        ...captureForm, // Ensure latest contact info
        scores: finalScores,
        status: 'completed',
        completedAt: new Date().toISOString()
      };
      
      await api.saveLead(completedLead);
      trackEvent(EVENTS.QUIZ_COMPLETED, { leadId: lead?.id, scores: finalScores });
      
      setLocation('/radar');
    } catch (e) {
      console.error(e);
      setError('Erro ao finalizar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };


  // RENDER LOGIC
  
  // STEP 0: CAPTURE SCREEN
  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <Header className="absolute top-0 left-0" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-card shadow-elegant border border-[#F1ECE5] p-8 md:p-10 z-10"
        >
          <div className="text-center mb-8 space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-4">
              <LockKeyhole className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-dark">Antes de começar</h2>
            <p className="text-sm text-muted">
              Para salvar sua análise caso pare no meio, preencha seu nome, empresa e WhatsApp. Leva &lt; 10s.
            </p>
          </div>

          <form onSubmit={handleCaptureSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted font-bold">Nome Completo</Label>
              <Input 
                id="name" 
                value={captureForm.name} 
                onChange={handleInputChange} 
                required
                className="bg-[#FAFAFA] border-input focus:border-primary h-12"
                placeholder="Seu nome"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-xs uppercase tracking-wider text-muted font-bold">Nome da Empresa / Estúdio</Label>
              <Input 
                id="company" 
                value={captureForm.company} 
                onChange={handleInputChange} 
                required
                className="bg-[#FAFAFA] border-input focus:border-primary h-12"
                placeholder="Ex: Clínica Silva"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="whatsapp" className="text-xs uppercase tracking-wider text-muted font-bold">WhatsApp</Label>
              <Input 
                id="whatsapp" 
                value={captureForm.whatsapp} 
                onChange={handlePhoneChange} 
                required
                className="bg-[#FAFAFA] border-input focus:border-primary h-12"
                placeholder="(00) 00000-0000"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#C95050] text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <CTAButton 
              type="submit" 
              loading={isSubmitting}
              className="w-full mt-4"
            >
              Salvar e iniciar o Scan
            </CTAButton>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted/60 mt-4">
              <LockKeyhole className="w-3 h-3" />
              <span>Garantimos privacidade — só usaremos para enviar sua análise.</span>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // STEP 7: CONFIRMATION SCREEN (After last question)
  if (step > QUESTIONS.length) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex flex-col items-center justify-center p-4">
        <Header className="absolute top-0 left-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-card shadow-elegant border border-[#F1ECE5] p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-dark mb-2">Quase lá!</h2>
            <p className="text-sm text-muted">
              Confirme seus dados para receber o relatório detalhado e o plano de ação.
            </p>
          </div>

          <div className="space-y-4 mb-8">
             <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted font-bold">Nome</Label>
              <Input 
                id="name"
                value={captureForm.name} 
                onChange={handleInputChange}
                className="bg-[#FAFAFA] h-11"
              />
            </div>
             <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted font-bold">Empresa</Label>
              <Input 
                id="company"
                value={captureForm.company} 
                onChange={handleInputChange}
                className="bg-[#FAFAFA] h-11"
              />
            </div>
             <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted font-bold">WhatsApp</Label>
              <Input 
                id="whatsapp"
                value={captureForm.whatsapp} 
                onChange={handlePhoneChange} 
                className="bg-[#FAFAFA] h-11"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10 mb-6">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-dark leading-relaxed">
              Autorizo o envio da minha análise completa e orientações de crescimento pelo WhatsApp.
            </p>
          </div>

          <CTAButton 
            onClick={handleFinalSubmit} 
            loading={isSubmitting}
            variant="accent"
          >
            Gerar meu Scan de Crescimento
          </CTAButton>
          
          <button 
            onClick={() => setStep(QUESTIONS.length)} // Go back to last question
            className="w-full text-center text-xs text-muted mt-4 hover:text-dark uppercase tracking-wider"
          >
            Voltar e revisar
          </button>
        </motion.div>
      </div>
    );
  }

  // STEPS 1-6: QUIZ QUESTIONS
  // step is 1-indexed here relative to flow, so index is step - 1
  const questionIndex = step - 1;
  const currentQ = QUESTIONS[questionIndex];

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-20 relative">
        {/* Progress Bar - Shows step 1/6, 2/6 etc. */}
        <div className="w-full fixed top-[80px] left-0 z-40 bg-[#F8F7F2]/90 backdrop-blur-sm py-4">
           <ProgressBar current={step} total={QUESTIONS.length} />
        </div>
        
        <div className="mt-20 w-full">
          <QuestionCard 
            stepData={currentQ}
            onAnswer={handleAnswer}
            currentValue={answers[currentQ.id]}
            isLoading={false}
          />
        </div>
      </main>
    </div>
  );
}
