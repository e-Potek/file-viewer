import React, { useEffect, useState, useRef } from 'react';
import mammoth from 'mammoth';
import PropTypes from 'prop-types';
import './DocxViewer.scss';
import { RESPONSE_REPRESENTATIONS, useFetch } from '../components';

function DocxViewer({ filePath }) {
  const docxRef = useRef(null);
  const [error, setError] = useState(null);
  const { result, isLoading } = useFetch({
    filePath,
    responseRepresentation: RESPONSE_REPRESENTATIONS.ARRAY_BUFFER,
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (isLoading || !result || !docxRef?.current) {
      return;
    }

    (async () => {
      try {
        const mammothResult = await mammoth.convertToHtml(
          { arrayBuffer: result },
          { includeDefaultStyleMap: true },
        );
        const docEl = document.createElement('div');
        docEl.className = 'document-container';
        docEl.innerHTML = mammothResult.value;
        docxRef.current.innerHTML = docEl.outerHTML;
      } catch (err) {
        setError(err);
      }
    })();
  }, [result, filePath, docxRef?.current]);

  return <div className="docx-viewer" ref={docxRef} />;
}

DocxViewer.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default DocxViewer;
