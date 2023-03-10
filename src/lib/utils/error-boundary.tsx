import {Component} from 'react';

class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('<< ERROR BOUNDARY >>', error);
    console.log('<< ERROR BOUNDARY INFO >>', errorInfo);
  }

  render() {
    if (this.state.hasError) return <h1>Error boundary: Something went wrong</h1>;
    return this.props.children;
  }
}

export default ErrorBoundary;
