import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background p-6 text-text dark:bg-background-dark dark:text-text-dark">
          <h2 className="mb-4 font-display text-2xl font-bold">
            Something went wrong.
          </h2>
          <p className="mb-6">
            Reload the page or try again later if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-control bg-primary px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-hover"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
