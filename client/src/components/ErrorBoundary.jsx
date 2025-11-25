import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-center p-6">
          <div className="max-w-md space-y-4">
            <h1 className="text-3xl font-serif text-primary">Ops, algo deu errado.</h1>
            <p className="text-muted-foreground">
              Tivemos um problema técnico. Por favor, recarregue a página para tentar novamente.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
