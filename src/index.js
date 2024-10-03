import * as pdfjsLib from 'pdfjs-dist';
import FileViewer from './FileViewer';

const setWorkerPort = workerPort => {
  pdfjsLib.GlobalWorkerOptions.workerPort = workerPort;
};

const setWorkerSrc = workerSrc => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
};

export { FileViewer, setWorkerSrc, setWorkerPort };

export default FileViewer;
