import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import PropTypes from 'prop-types';

import PdfPage from './PdfPage';

export default function PDFViewer({ filePath, disableVisibilityCheck }) {
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [percent, setPercent] = useState(0);
  const pages =
    pdf && canvasRef?.current ? Array.from({ length: pdf.numPages }) : [];

  useEffect(() => {
    if (canvasRef?.current) {
      const loadingTask = pdfjsLib.getDocument(filePath);

      loadingTask.onProgress = progress => {
        const newPercent = (progress.loaded / progress.total) * 100;
        setPercent(newPercent);
      };

      loadingTask.promise.then(result => setPdf(result)).catch(setError);
    }
  }, [filePath, canvasRef?.current]);

  if (error) {
    throw error;
  }

  return (
    <div className="pdf-viewer" ref={canvasRef}>
      {pdf ? null : (
        <div className="pdf-loading">
          LOADING ({percent.toFixed()}
          %)
        </div>
      )}
      {pages.map((v, i) => (
        <PdfPage
          key={`page-${i + 1}`}
          index={i + 1}
          pdf={pdf}
          containerWidth={canvasRef.current.offsetWidth}
          disableVisibilityCheck={disableVisibilityCheck}
        />
      ))}
    </div>
  );
}

PDFViewer.propTypes = {
  disableVisibilityCheck: PropTypes.bool,
  filePath: PropTypes.string.isRequired,
};

PDFViewer.defaultProps = {
  disableVisibilityCheck: false,
};
