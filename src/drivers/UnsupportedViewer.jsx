import React from 'react';
import './UnsupportedViewer.scss';
import PropTypes from 'prop-types';

function UnsupportedViewer({ UnsupportedComponent, ...rest }) {
  return (
    <div className="unsupported-viewer">
      <div className="message">
        {UnsupportedComponent ? (
          <UnsupportedComponent {...rest} />
        ) : (
          <p className="alert">
            <b>{`.${rest.fileType}`}</b> is not supported.
          </p>
        )}
      </div>
    </div>
  );
}

UnsupportedViewer.propTypes = {
  UnsupportedComponent: PropTypes.element,
};

UnsupportedViewer.defaultProps = {
  UnsupportedComponent: null,
};

export default UnsupportedViewer;
