import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error) {
    console.log(error);
    this.setState({ error: true });
  }
  render() {
    if (this.state.error) return <ErrorMessage />;
    return this.props.children;
  }
}
