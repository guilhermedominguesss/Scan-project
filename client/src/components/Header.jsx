import React from 'react';
import { Link } from 'wouter';

export default function Header({ simple = false }) {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-center items-center bg-background border-b border-border/40">
      <Link href="/">
        <div className="cursor-pointer flex flex-col items-center">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-tight">
            Scan de Crescimento
          </h1>
          <span className="text-xs md:text-sm text-muted-foreground tracking-widest uppercase">
            Profissional
          </span>
        </div>
      </Link>
    </header>
  );
}
