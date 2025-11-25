import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-10 text-center border-t border-border/40 mt-auto bg-light/50">
      <div className="container mx-auto px-4">
        <p className="text-xs text-muted/60 font-sans tracking-wide">
          &copy; {new Date().getFullYear()} Scan de Crescimento Profissional. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
