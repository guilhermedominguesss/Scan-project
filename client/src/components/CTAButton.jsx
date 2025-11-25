import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function CTAButton({ children, onClick, disabled, loading, className, variant = 'primary', ...props }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "w-full py-6 text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0",
        variant === 'primary' && "bg-primary hover:bg-primary/90 text-primary-foreground",
        variant === 'accent' && "bg-accent hover:bg-accent/90 text-accent-foreground",
        variant === 'outline' && "bg-transparent border-2 border-primary text-primary hover:bg-primary/5",
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </Button>
  );
}
