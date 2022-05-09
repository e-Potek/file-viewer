import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import FileViewer from './FileViewer';

const setPdfWorkerSrc = worker => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
};

setPdfWorkerSrc(pdfWorker);

export { FileViewer, setPdfWorkerSrc };

export default FileViewer;
