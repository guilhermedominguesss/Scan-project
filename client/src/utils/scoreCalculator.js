// Logic for calculating Radar Chart scores
// Scores: Potencial, Captação, Eficiência

/**
 * Calculate scores based on quiz answers
 * @param {Object} answers - The key-value map of answers
 * @returns {Object} { potencial, captacao, eficiencia }
 */
export const calculateScores = (answers) => {
  // Default scores
  let potencial = 50;
  let captacao = 50;
  let eficiencia = 50;

  // 1. Potencial (%)
  // Baseado em: ambição de faturamento + estrutura
  const revenueScores = {
    '2k-5k': 10,
    '5k-10k': 20,
    '10k-20k': 30,
    'above_20k': 40
  };
  
  const structureScores = {
    'solo': 10,
    '1-2': 20,
    'small_team': 30,
    'structured': 40
  };

  potencial = 20 + (revenueScores[answers.revenue_target] || 0) + (structureScores[answers.structure] || 0);
  potencial = Math.min(95, Math.max(30, potencial));


  // 2. Captação (%)
  // Baseado em: canal de atração (acquisition_channel)
  const acquisitionScores = {
    'instagram': 70,
    'referral': 50,
    'ads': 90,
    'physical': 60,
    'none': 20
  };
  
  captacao = acquisitionScores[answers.acquisition_channel] || 30;
  
  if (answers.priority !== 'generate_leads') {
    captacao += 10;
  }
   captacao = Math.min(95, Math.max(20, captacao));


  // 3. Eficiência (%)
  // Baseado em: desafio comercial (challenge)
  const challengeScores = {
    'new_clients': 40,
    'retention': 60,
    'revenue': 50,
    'differentiation': 70,
    'organize': 30
  };

  eficiencia = challengeScores[answers.challenge] || 50;
  
  if (answers.structure === 'solo' && answers.revenue_target === 'above_20k') {
    eficiencia -= 20;
  }

  eficiencia = Math.min(95, Math.max(20, eficiencia));

  return {
    potencial,
    captacao,
    eficiencia
  };
};
