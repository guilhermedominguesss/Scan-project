import React from 'react';
import { motion } from 'framer-motion';

export default function RadarBar({ scores }) {
  if (!scores) return null;

  const data = [
    { subject: 'Potencial', score: scores.potencial, description: 'Capacidade de escala x Estrutura atual' },
    { subject: 'Captação', score: scores.captacao, description: 'Força dos canais de aquisição' },
    { subject: 'Eficiência', score: scores.eficiencia, description: 'Conversão e saúde operacional' },
  ];

  const getStatus = (score) => {
    if (score >= 80) return { label: 'Alta', color: 'text-green-600' };
    if (score >= 50) return { label: 'Média', color: 'text-yellow-600' };
    return { label: 'Baixa', color: 'text-red-600' };
  };

  return (
    <div className="w-full grid md:grid-cols-3 gap-6">
      {data.map((item, index) => {
        const { label, color } = getStatus(item.score);
        return (
          <motion.div 
            key={item.subject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="bg-white rounded-card shadow-soft border border-[#F1ECE5] p-6 flex flex-col items-center text-center h-full"
          >
            <h3 className="text-lg font-serif font-bold text-dark mb-1">{item.subject}</h3>
            <p className="text-xs text-muted mb-6 px-2 h-8">{item.description}</p>
            
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="#EAE5DF"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 60}
                  strokeDashoffset={2 * Math.PI * 60 * (1 - item.score / 100)}
                  initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - item.score / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9D6135" />
                    <stop offset="100%" stopColor="#CDA580" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">{Math.round(item.score)}%</span>
              </div>
            </div>

            <div className={`text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full bg-light ${color}`}>
              {label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
