import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  PolarRadiusAxis
} from 'recharts';
import { motion } from 'framer-motion';

export default function RadarBar({ scores }) {
  if (!scores) return null;

  const data = [
    { subject: 'Potencial', A: scores.potencial, fullMark: 100 },
    { subject: 'Captação', A: scores.captacao, fullMark: 100 },
    { subject: 'Eficiência', A: scores.eficiencia, fullMark: 100 },
  ];

  // Helper to determine color/label based on score
  const getLabel = (score) => {
    if (score >= 80) return { text: 'Alto', color: 'text-green-600' };
    if (score >= 50) return { text: 'Médio', color: 'text-yellow-600' };
    return { text: 'Baixo', color: 'text-red-600' };
  };

  return (
    <div className="w-full space-y-12">
      {/* Chart Section */}
      <div className="h-[300px] w-full flex justify-center items-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e5e5e5" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#232326', fontSize: 14, fontFamily: 'Inter', fontWeight: 600 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Seu Negócio"
              dataKey="A"
              stroke="#9D6135"
              strokeWidth={3}
              fill="#CDA580"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Bars Details Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {data.map((item) => {
          const { text, color } = getLabel(item.A);
          return (
            <motion.div 
              key={item.subject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card p-6 rounded-xl shadow-sm border border-border/50 text-center"
            >
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">{item.subject}</h3>
              <div className="text-4xl font-bold text-primary mb-1">{Math.round(item.A)}%</div>
              <div className={`text-sm font-medium uppercase tracking-wider ${color}`}>
                {text}
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.A}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
