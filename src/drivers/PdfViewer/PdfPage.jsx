import React, { useState, useEffect, useRef } from 'react';
import { InView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

const DEFAULT_SCALE = 1.2;
const SCALING_FACTOR = 2;
const PAGE_STATES = {
  BLANK: 'BLANK',
  LOADING: 'LOADING',
  RENDERED: 'RENDERED',
};

export default function PDFPage({
  pdf,
  containerWidth,
  index,
  disableVisibilityCheck,
}) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [pageState, setPageState] = useState(PAGE_STATES.BLANK);
  const [isVisible, setIsVisible] = useState(false);

  const renderPage = (page) => {
    const calculatedScale = containerWidth / page.getViewport({ scale: DEFAULT_SCALE }).width;
    const scale = calculatedScale > DEFAULT_SCALE ? DEFAULT_SCALE : calculatedScale;
    const viewport = page.getViewport({ scale });

    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = SCALING_FACTOR * viewport.width;
    canvasRef.current.height = SCALING_FACTOR * viewport.height;

    canvasRef.current.style.height = viewport.height;
    canvasRef.current.style.width = viewport.width;

    const renderTask = page.render({
      canvasContext: context,
      viewport,
      transform: [SCALING_FACTOR, 0, 0, SCALING_FACTOR, 0, 0],
    });

    return renderTask.promise;
  };

  const onVisibilityChange = (value) => (value ? setIsVisible(value) : null);

  useEffect(() => {
    if ([PAGE_STATES.LOADING, PAGE_STATES.RENDERED].includes(pageState)) {
      return;
    }

    if (disableVisibilityCheck || isVisible) {
      setPageState(PAGE_STATES.LOADING);

      (async () => {
        try {
          const page = await pdf.getPage(index);
          await renderPage(page);
          setPageState(PAGE_STATES.RENDERED);
        } catch (err) {
          setError(err);
        }
      })();
    }
  }, [pdf, index, pageState, disableVisibilityCheck, isVisible]);

  if (error) {
    throw error;
  }

  const canvas = <canvas ref={canvasRef} width="670" height="870" />;

  return (
    <div className="pdf-canvas">
      {disableVisibilityCheck ? (
        { canvas }
      ) : (
        <InView onChange={onVisibilityChange}>{canvas}</InView>
      )}
    </div>
  );
}

PDFPage.propTypes = {
  disableVisibilityCheck: PropTypes.bool,
  index: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  pdf: PropTypes.shape({
    getPage: PropTypes.func.isRequired,
  }).isRequired,
};

PDFPage.defaultProps = {
  disableVisibilityCheck: false,
};
