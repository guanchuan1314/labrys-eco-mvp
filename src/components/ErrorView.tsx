import React, { Component, ErrorInfo, ReactNode } from "react";
import { logError } from "../services/error.service";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
    const errorMessage = `[React Error] ${error.message} - Component Stack: ${errorInfo.componentStack}`;
    logError(errorMessage);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorView;
