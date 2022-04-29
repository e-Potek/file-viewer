import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import FileViewer from './FileViewer';

const setPdfWorkerSrc = (worker) => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
};

export {
  FileViewer,
  setPdfWorkerSrc,
};

export default FileViewer;
