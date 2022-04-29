import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import FileViewer from './FileViewer';

const setPdfWorker = (worker) => {
  pdfjsLib.GlobalWorkerOptions.workerPort = worker;
};

export {
  FileViewer,
  setPdfWorker
};

export default FileViewer;
