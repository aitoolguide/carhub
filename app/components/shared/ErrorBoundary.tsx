import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * A shared component that serves as a React Error Boundary.
 * It catches JavaScript errors anywhere in its child component tree, logs those errors,
 * and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // This lifecycle method is called after an error has been thrown by a descendant component.
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  // This lifecycle method is called after an error has been caught.
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service here.
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-gray-100 rounded-lg">
          <h1 className="text-3xl font-bold text-red-600">Something Went Wrong</h1>
          <p className="mt-4 text-gray-700">We're sorry, an unexpected error has occurred.</p>
          <details className="mt-4 p-4 bg-gray-200 rounded-md text-left max-w-lg overflow-auto">
            <summary className="font-semibold cursor-pointer">Error Details</summary>
            <pre className="mt-2 whitespace-pre-wrap break-words text-sm text-gray-800">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
