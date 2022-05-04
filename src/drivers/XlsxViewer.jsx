import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import Csv from './Csv';
import { useFetch, RESPONSE_REPRESENTATIONS } from '../components';

const parseXlxsData = data => {
  const workbook = XLSX.read(new Uint8Array(data), {
    type: 'array',
  });
  const names = Object.keys(workbook.Sheets);
  const sheets = names.map(name =>
    XLSX.utils.sheet_to_csv(workbook.Sheets[name], {
      blankrows: false,
    }),
  );

  return { sheets, names };
};

function XlxsViewer({ filePath }) {
  const [curSheetIndex, setCurSheetIndex] = useState(0);
  const { result, isLoading, error } = useFetch({
    filePath,
    responseRepresentation: RESPONSE_REPRESENTATIONS.ARRAY_BUFFER,
  });

  if (error) {
    throw error;
  }

  const parsedData = useMemo(() => {
    if (isLoading || !result) {
      return null;
    }

    return parseXlxsData(result);
  }, [result, isLoading]);

  return (
    <div className="xlsx-viewer">
      {parsedData && (
        <>
          <div className="sheet-names">
            {parsedData.names.map((name, index) => (
              <input
                key={name}
                type="button"
                value={name}
                onClick={() => setCurSheetIndex(index)}
              />
            ))}
          </div>
          <Csv csvString={parsedData.sheets[curSheetIndex]} />
        </>
      )}
    </div>
  );
}

XlxsViewer.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default XlxsViewer;
