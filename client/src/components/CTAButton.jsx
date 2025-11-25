import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTAButton({ 
  children, 
  onClick, 
  disabled, 
  loading, 
  className, 
  variant = 'primary', 
  ...props 
}) {
  const variants = {
    primary: "bg-primary hover:bg-[#8A522E] text-white shadow-soft hover:shadow-elegant border-none",
    secondary: "bg-transparent border-2 border-dark/10 text-dark hover:border-primary hover:text-primary hover:bg-primary/5",
    ghost: "bg-transparent text-muted hover:text-primary hover:bg-transparent shadow-none p-0 h-auto",
    accent: "bg-accent hover:bg-[#C0956E] text-dark shadow-soft hover:shadow-elegant"
  };

  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          "relative w-full rounded-xl font-medium transition-all duration-300 text-base md:text-lg py-6 md:py-7 h-auto",
          variants[variant],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {children}
      </Button>
    </motion.div>
  );
}
