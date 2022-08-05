import React from 'react';
import PropTypes from 'prop-types';

import Csv from './Csv';
import { useFetch } from '../components';

function CsvViewer({ filePath }) {
  const { result, isLoading, error } = useFetch({ filePath });

  if (error) {
    throw error;
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="csv-viewer">
      <Csv csvString={result} />
    </div>
  );
}

CsvViewer.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default CsvViewer;
