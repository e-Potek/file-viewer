import React, { useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './PhotoViewer.scss';

function PhotoViewer({ filePath, height, width }) {
  const imageRef = useRef(null);
  const [imageOriginalDimensions, setImageOriginalDimensions] = useState({
    width: null,
    height: null,
  });

  const dimensions = useMemo(() => {
    // Scale image to fit into viewer
    const { width: naturalWidth, height: naturalHeight } = imageOriginalDimensions;
    let imgHeight;
    let imgWidth;

    if (naturalHeight <= height && naturalWidth <= width) {
      imgWidth = naturalWidth;
      imgHeight = naturalHeight;
    } else {
      const heightRatio = height / naturalHeight;
      const widthRatio = width / naturalWidth;
      if (heightRatio < widthRatio) {
        imgHeight = naturalHeight * heightRatio;
        imgWidth = naturalWidth * heightRatio;
      } else {
        imgHeight = naturalHeight * widthRatio;
        imgWidth = naturalWidth * widthRatio;
      }
    }

    return { height: imgHeight, width: imgWidth };
  }, [imageOriginalDimensions]);

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="photo-viewer"
    >
      <img
        style={
          dimensions.width && dimensions.height
            ? {
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
            }
            : { visibility: 'hidden' }
        }
        ref={imageRef}
        src={filePath}
        alt={filePath}
        onLoad={() => setImageOriginalDimensions({
          width: imageRef.current.width,
          height: imageRef.current.height,
        })}
      />
    </div>
  );
}

PhotoViewer.propTypes = {
  filePath: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default PhotoViewer;
