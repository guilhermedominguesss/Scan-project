import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const progress = Math.min(100, (current / total) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-12 px-4">
      <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted mb-3 font-medium">
        <span>Análise em andamento</span>
        <span>{current} / {total}</span>
      </div>
      <div className="h-[6px] bg-[#EAE5DF] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(157,97,53,0.3)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
