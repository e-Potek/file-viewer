import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

function Error({ errorComponent, ...props }) {
  return (
    <div className="error-message">
      {errorComponent ? (
        <errorComponent {...props} />
      ) : (
        <p className="alert">Unable to preview file</p>
      )}
    </div>
  );
}

Error.propTypes = {
  errorComponent: PropTypes.element,
};

Error.defaultProps = {
  errorComponent: null,
};

export default Error;
