import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    const { onError } = this.props;
    onError(error, errorInfo);
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, ErrorComponent } = this.props;

    if (error) {
      return <ErrorComponent error={error} />;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  ErrorComponent: PropTypes.element,
  onError: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  ErrorComponent: Error,
  onError: () => null,
};
