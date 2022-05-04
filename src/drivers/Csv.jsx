import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Papa from 'papaparse';
import PropTypes from 'prop-types';

const parseCsvString = csvString => {
  const { data: parsedData, errors = [] } = Papa.parse(csvString);

  if (errors?.length) {
    throw errors[0];
  }

  const [columns, ...rows] = parsedData;

  return {
    columns: columns.map((column, index) => ({
      field: `field-${index.toString()}`,
      headerName: column,
    })),
    rows: rows.map((row, rowIndex) => ({
      id: rowIndex,
      ...row.reduce(
        (mapping, value, index) => ({
          ...mapping,
          [`field-${index.toString()}`]: value,
        }),
        {},
      ),
    })),
  };
};

function Csv({ csvString }) {
  const { rows: parsedRows, columns: parsedColumns } = useMemo(() => {
    if (!csvString) {
      return {};
    }

    return parseCsvString(csvString);
  }, [csvString]);

  if (!parsedRows || !parsedColumns) {
    return null;
  }

  return <DataGrid rows={parsedRows} columns={parsedColumns} autoHeight />;
}

Csv.propTypes = {
  csvString: PropTypes.string,
};

Csv.defaultProps = {
  csvString: '',
};

export default Csv;
