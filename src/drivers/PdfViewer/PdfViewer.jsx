import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import PropTypes from 'prop-types';
import PdfPage from './PdfPage';

export default function PDFViewer({ filePath, disableVisibilityCheck }) {
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (canvasRef?.current) {
      const loadingTask = pdfjsLib.getDocument(filePath);

      loadingTask.onProgress = (progress) => {
        const newPercent = (progress.loaded / progress.total) * 100;
        setPercent(newPercent);
      };

      loadingTask.promise.then((result) => setPdf(result)).catch(setError);
    }
  }, [filePath, canvasRef?.current]);

  const renderPages = () => {
    if (!pdf || !canvasRef?.current) return null;
    const pages = Array.from({ length: pdf.numPages });
    return pages.map((v, i) => (
      <PdfPage
        key={`page-${i + 1}`}
        index={i + 1}
        pdf={pdf}
        containerWidth={canvasRef.current.offsetWidth}
        disableVisibilityCheck={disableVisibilityCheck}
      />
    ));
  };

  const renderLoading = () => {
    if (pdf) return null;
    return (
      <div className="pdf-loading">
        LOADING (
        {percent.toFixed()}
        %)
      </div>
    );
  };

  if (error) {
    throw error;
  }

  return (
    <div className="pdf-viewer" ref={canvasRef}>
      {renderLoading()}
      {renderPages()}
    </div>
  );
}

PDFViewer.propTypes = {
  filePath: PropTypes.string.isRequired,
  disableVisibilityCheck: PropTypes.bool,
};

PDFViewer.defaultProps = {
  disableVisibilityCheck: false,
};
