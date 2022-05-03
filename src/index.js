import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import FileViewer from './FileViewer';

const setPdfWorkerSrc = (worker) => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
};

setPdfWorkerSrc(pdfWorker);

export {
  FileViewer,
  setPdfWorkerSrc,
};

export default FileViewer;
