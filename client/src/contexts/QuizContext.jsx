import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { getStorage, setStorage } from '../utils/storage';
import { trackEvent, EVENTS } from '../utils/analytics';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [lead, setLead] = useState(null);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState(null);

  // Load initial state
  useEffect(() => {
    const loadState = async () => {
      try {
        const draft = await api.getDraft();
        if (draft) {
          if (draft.lead) setLead(draft.lead);
          if (draft.answers) setAnswers(draft.answers);
          if (draft.step !== undefined) setStep(draft.step);
        }
      } catch (e) {
        console.error("Failed to load quiz state", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadState();
  }, []);

  // Save draft on change
  const saveProgress = async (newLead, newAnswers, newStep) => {
    const payload = {
      lead: newLead !== undefined ? newLead : lead,
      answers: newAnswers !== undefined ? newAnswers : answers,
      step: newStep !== undefined ? newStep : step
    };
    
    // Optimistic update
    if (newLead !== undefined) setLead(newLead);
    if (newAnswers !== undefined) setAnswers(newAnswers);
    if (newStep !== undefined) setStep(newStep);

    await api.saveDraft(payload);
  };

  const captureLead = async (leadData) => {
    const newLead = { ...leadData, id: crypto.randomUUID() };
    await saveProgress(newLead, undefined, undefined);
    trackEvent(EVENTS.LEAD_CAPTURED_DRAFT, { leadId: newLead.id });
    return newLead;
  };

  const answerQuestion = async (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    await saveProgress(undefined, newAnswers, undefined);
    trackEvent(EVENTS.QUESTION_ANSWERED, { questionId, answer: value, leadId: lead?.id });
  };

  const nextStep = () => {
    const next = step + 1;
    saveProgress(undefined, undefined, next);
  };

  const prevStep = () => {
    if (step > 0) {
      saveProgress(undefined, undefined, step - 1);
    }
  };

  return (
    <QuizContext.Provider value={{
      lead,
      answers,
      step,
      isLoading,
      scores,
      setScores,
      captureLead,
      answerQuestion,
      nextStep,
      prevStep,
      setStep
    }}>
      {children}
    </QuizContext.Provider>
  );
};
