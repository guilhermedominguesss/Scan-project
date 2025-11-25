import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-card text-center border-t border-border">
      <p className="text-sm text-muted-foreground font-sans">
        &copy; {new Date().getFullYear()} Scan de Crescimento Profissional. Todos os direitos reservados.
      </p>
    </footer>
  );
}
