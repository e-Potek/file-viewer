import * as pdfjs from 'pdfjs-dist';
import FileViewer from './FileViewer';

const setWorkerPort = workerPort => {
  pdfjs.GlobalWorkerOptions.workerPort = workerPort;
};

const setWorkerSrc = workerSrc => {
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
};

export { FileViewer, setWorkerSrc, setWorkerPort, pdfjs };

export default FileViewer;
