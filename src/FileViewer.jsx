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

const defaultDrivers = {
  bmp: PhotoViewer,
  csv: CsvViewer,
  docx: DocxViewer,
  gif: PhotoViewer,
  jpeg: PhotoViewer,
  jpg: PhotoViewer,
  pdf: PDFViewer,
  png: PhotoViewer,
  xlsx: XlsxViewer,
};

function FileViewer({
  drivers: driversInput = {},
  fileType: fileTypeInput,
  onError,
  ErrorComponent,
  ...props
}) {
  const fileType =
    props.filePath?.split(/[#?]/)[0].split('.').pop().trim() || fileTypeInput;
  const [ref, setRef] = useState(null);
  const viewerDimensions = useMemo(
    () => ({
      width: ref?.clientWidth || 0,
      height: ref?.clientHeight || 0,
    }),
    [ref?.clientWidth, ref?.clientHeight],
  );
  const drivers = {
    ...defaultDrivers,
    ...driversInput,
  };

  const Driver = drivers[fileType] || UnsupportedViewer;

  return (
    <div className="react-file-viewer-container">
      <div ref={newRef => setRef(newRef)} className="react-file-viewer">
        <ErrorBoundary
          onError={onError}
          {...(ErrorComponent ? { ErrorComponent } : {})}
        >
          <Driver
            {...props}
            fileType={fileType}
            viewerDimensions={viewerDimensions}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

FileViewer.propTypes = {
  drivers: PropTypes.object,
  ErrorComponent: PropTypes.element,
  filePath: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  onError: PropTypes.func,
  UnsupportedComponent: PropTypes.element,
};

FileViewer.defaultProps = {
  drivers: {},
  ErrorComponent: null,
  onError: () => null,
  UnsupportedComponent: null,
};

export default FileViewer;
