import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const progress = Math.min(100, (current / total) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">
        <span>Progresso</span>
        <span>{current} / {total}</span>
      </div>
      <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
