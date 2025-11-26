import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [lead, setLead] = useState(null);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState(null);

  // Load initial state
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Save draft on change
  const saveProgress = (newLead, newAnswers, newStep) => {
    // Optimistic update
    if (newLead !== undefined) setLead(newLead);
    if (newAnswers !== undefined) setAnswers(newAnswers);
    if (newStep !== undefined) setStep(newStep);
  };

  const captureLead = (leadData) => {
    const newLead = { ...leadData, id: crypto.randomUUID() };
    saveProgress(newLead, undefined, undefined);
    return newLead;
  };

  const answerQuestion = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    saveProgress(undefined, newAnswers, undefined);
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
