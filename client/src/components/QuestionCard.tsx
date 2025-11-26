import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import CTAButton from './CTAButton';

export default function QuestionCard({ 
  stepData, 
  onAnswer, 
  currentValue, 
  isLoading 
}) {
  const { type, question, options, placeholder, microcopy, buttonText } = stepData;
  const [localValue, setLocalValue] = React.useState(currentValue || '');

  React.useEffect(() => {
    if (currentValue) setLocalValue(currentValue);
  }, [currentValue]);

  const handleNext = () => {
    if (!localValue) return;
    onAnswer(localValue);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepData.id}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-[640px] mx-auto"
      >
        <div className="bg-white rounded-card shadow-elegant border border-[#F1ECE5] p-6 md:p-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-serif text-dark leading-tight font-semibold">
              {question}
            </h2>
            {microcopy && (
              <p className="text-sm text-muted leading-relaxed max-w-lg">
                {microcopy}
              </p>
            )}
          </div>

          <div className="min-h-[120px]">
            {type === 'text' && (
              <div className="space-y-4">
                <Textarea
                  value={localValue}
                  onChange={(e) => setLocalValue(e.target.value)}
                  placeholder={placeholder}
                  className="min-h-[180px] text-lg p-5 bg-[#FAFAFA] border border-input rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder:text-muted/40 font-sans"
                />
                <div className="pt-2">
                   <CTAButton 
                    onClick={handleNext} 
                    disabled={!localValue || isLoading}
                    loading={isLoading}
                  >
                    {buttonText || 'Continuar'}
                  </CTAButton>
                </div>
              </div>
            )}

            {type === 'select' && (
              <div className="grid gap-3">
                {options.map((opt) => {
                  const isSelected = localValue === opt.value;
                  return (
                    <motion.button
                      key={opt.value}
                      onClick={() => onAnswer(opt.value)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group",
                        isSelected 
                          ? "border-primary bg-primary/5 text-primary shadow-sm" 
                          : "border-[#F1ECE5] bg-white text-dark hover:border-primary/30 hover:bg-[#FAFAFA]"
                      )}
                    >
                      <span className={cn("text-lg font-medium", isSelected ? "font-semibold" : "")}>
                        {opt.label}
                      </span>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                        isSelected ? "border-primary bg-primary" : "border-muted/30 group-hover:border-primary/50"
                      )}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
