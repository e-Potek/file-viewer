import * as pdfjsLib from 'pdfjs-dist';
import FileViewer from './FileViewer';

const setPdfWorkerSrc = worker => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
};

setPdfWorkerSrc('./pdf.worker.js');

export { FileViewer, setPdfWorkerSrc };

export default FileViewer;
