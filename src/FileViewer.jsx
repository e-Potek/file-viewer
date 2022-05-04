import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './FileViewer.scss';
import {
  CsvViewer,
  DocxViewer,
  PDFViewer,
  PhotoViewer,
  UnsupportedViewer,
  XlsxViewer,
} from './drivers';
import { ErrorBoundary } from './components';

function FileViewer({ fileType, onError, ...props }) {
  const [ref, setRef] = useState(null);
  const dimensions = useMemo(
    () => ({
      width: ref?.clientWidth || 0,
      height: ref?.clientHeight || 0,
    }),
    [ref?.clientWidth, ref?.clientHeight],
  );

  const getDriver = () => {
    switch (fileType) {
      case 'csv': {
        return CsvViewer;
      }
      case 'xlsx': {
        return XlsxViewer;
      }
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'png': {
        return PhotoViewer;
      }
      case 'pdf': {
        return PDFViewer;
      }
      case 'docx': {
        return DocxViewer;
      }
      default: {
        return UnsupportedViewer;
      }
    }
  };

  const Driver = getDriver();

  return (
    <div className="react-file-viewer-container">
      <div ref={newRef => setRef(newRef)} className="react-file-viewer">
        <ErrorBoundary onError={onError}>
          <Driver {...props} {...dimensions} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

FileViewer.propTypes = {
  filePath: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  onError: PropTypes.func,
  UnsupportedComponent: PropTypes.element,
};

FileViewer.defaultProps = {
  onError: () => null,
  UnsupportedComponent: null,
};

export default FileViewer;
