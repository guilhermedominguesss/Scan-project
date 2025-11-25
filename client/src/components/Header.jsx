import React from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

export default function Header({ className }) {
  return (
    <header className={cn("w-full py-8 px-4 md:px-10 flex justify-between items-center bg-transparent z-50", className)}>
      <Link href="/">
        <div className="cursor-pointer flex flex-col">
          <h1 className="font-serif text-xl md:text-2xl font-bold text-primary tracking-tight leading-none">
            Scan de Crescimento
          </h1>
          <span className="text-[10px] md:text-xs text-muted uppercase tracking-[0.2em] mt-1">
            Profissional
          </span>
        </div>
      </Link>
      
      <Link href="/admin">
        <div className="text-xs text-muted/50 hover:text-primary transition-colors cursor-pointer uppercase tracking-widest font-medium">
          Admin
        </div>
      </Link>
    </header>
  );
}
