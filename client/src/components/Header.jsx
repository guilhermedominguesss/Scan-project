import React from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

export default function Header({ className }) {
  return (
    <header className={cn("w-full fixed top-0 left-0 right-0 py-4 md:py-8 px-4 md:px-10 flex justify-between items-center bg-[#F8F7F2] backdrop-blur-sm z-50 border-b border-[#F1ECE5]/30", className)}>
      <Link href="/">
        <div className="cursor-pointer">
          <h1 className="font-serif text-sm md:text-2xl font-bold text-primary tracking-tight leading-tight whitespace-nowrap">
            Scan de <span className="block md:inline">Crescimento</span>
          </h1>
        </div>
      </Link>
      
      <Link href="/admin">
        <div className="text-[10px] md:text-xs text-muted/50 hover:text-primary transition-colors cursor-pointer uppercase tracking-widest font-medium">
          Admin
        </div>
      </Link>
    </header>
  );
}
