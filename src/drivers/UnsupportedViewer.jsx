import React from 'react';
import './UnsupportedViewer.scss';
import PropTypes from 'prop-types';

function UnsupportedViewer({ unsupportedComponent, ...rest }) {
  return (
    <div className="unsupported-viewer">
      <div className="message">
        {unsupportedComponent ? (
          <unsupportedComponent {...rest} />
        ) : (
          <p className="alert">
            <b>{`.${rest.fileType}`}</b>
            {' '}
            is not supported.
          </p>
        )}
      </div>
    </div>
  );
}

UnsupportedViewer.propTypes = {
  unsupportedComponent: PropTypes.element,
};

UnsupportedViewer.defaultProps = {
  unsupportedComponent: null,
};

export default UnsupportedViewer;
