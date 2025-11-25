import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Could log to analytics here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F7F2] p-6">
          <div className="max-w-md w-full bg-white rounded-card shadow-elegant p-8 text-center space-y-6 border border-[#F1ECE5]">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            
            <div>
              <h1 className="text-2xl font-serif font-bold text-dark mb-2">Ops, algo deu errado.</h1>
              <p className="text-muted text-sm leading-relaxed">
                Tivemos um problema técnico ao processar sua solicitação. Não se preocupe, seus dados estão salvos.
              </p>
            </div>

            <div className="pt-2">
              <Button 
                onClick={() => window.location.reload()}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
