import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';

import FileViewer from '..';
import csvSample from '../../samples/csvSample.csv';
import docxSample from '../../samples/docxSample.docx';
import jpgSample from '../../samples/jpgSample.jpg';
import pdfSample from '../../samples/pdfSample.pdf';
import xlsxSample from '../../samples/xlsxSample.xlsx';

const sampleList = [
  {
    fileType: 'csv',
    filePath: csvSample,
  },
  {
    fileType: 'docx',
    filePath: docxSample,
  },
  {
    fileType: 'jpg',
    filePath: jpgSample,
  },
  {
    fileType: 'pdf',
    filePath: pdfSample,
  },
  {
    fileType: 'xlsx',
    filePath: xlsxSample,
  },
];

function App() {
  const [sample, setSample] = useState(sampleList[0]);

  return (
    <CssBaseline>
      <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <ul style={{ marginRight: '16px' }}>
          {sampleList.map(s => (
            <li key={s.fileType}>
              <button type="button" onClick={() => setSample(s)}>
                {s.fileType}
              </button>
            </li>
          ))}
        </ul>
        <div style={{ flexGrow: 1 }}>
          <FileViewer {...sample} />
        </div>
      </div>
    </CssBaseline>
  );
}

ReactDOM.render(<App />, window.document.getElementById('app'));
