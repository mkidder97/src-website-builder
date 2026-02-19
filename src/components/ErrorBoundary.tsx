import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-primary p-4">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-bold text-primary-foreground tracking-tight mb-2">
              SRC
            </h2>
            <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto my-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground mb-3">
              Something went wrong
            </h1>
            <p className="text-primary-foreground/70 mb-8">
              We're sorry — an unexpected error occurred. Please refresh the page to try again.
            </p>
            <Button
              onClick={this.handleRefresh}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
