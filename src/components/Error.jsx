import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

function Error({ ErrorComponent, ...props }) {
  return (
    <div className="error-message">
      {ErrorComponent ? (
        <ErrorComponent {...props} />
      ) : (
        <p className="alert">Unable to preview file</p>
      )}
    </div>
  );
}

Error.propTypes = {
  ErrorComponent: PropTypes.element,
};

Error.defaultProps = {
  ErrorComponent: null,
};

export default Error;
