import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

  // Update local value if currentValue changes (e.g. resuming)
  React.useEffect(() => {
    if (currentValue) setLocalValue(currentValue);
  }, [currentValue]);

  const handleNext = () => {
    if (!localValue) return;
    onAnswer(localValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto"
    >
      <Card className="border-none shadow-xl bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6 md:p-10 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-tight">
              {question}
            </h2>
            {microcopy && (
              <p className="text-sm text-muted-foreground italic">
                {microcopy}
              </p>
            )}
          </div>

          <div className="min-h-[200px] flex flex-col justify-center">
            {type === 'text' && (
              <Textarea
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className="min-h-[150px] text-lg p-4 bg-background/50 border-primary/20 focus:border-primary transition-all"
              />
            )}

            {type === 'select' && (
              <RadioGroup 
                value={localValue} 
                onValueChange={setLocalValue}
                className="grid gap-4"
              >
                {options.map((opt) => (
                  <div key={opt.value}>
                    <RadioGroupItem
                      value={opt.value}
                      id={opt.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={opt.value}
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent/10 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all duration-200"
                    >
                      <span className="text-lg font-medium">{opt.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>

          <div className="pt-4">
            <CTAButton 
              onClick={handleNext} 
              disabled={!localValue || isLoading}
              loading={isLoading}
            >
              {buttonText || 'Avançar'}
            </CTAButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
