## file-viewer

Supported file formats:
- bmp
- csv
- docx
- gif
- jpeg
- jpg
- pdf
- png
- xlsx

### Install
```
# via npm
npm install @resolve_ch/file-viewer
```
### FileViewer example
```
import React from 'react';
import ReactDOM from 'react-dom';
import FileViewer from '@resolve_ch/file-viewer';

class App extends React.Component {
  render() {
    return (
      <FileViewer
        filePath="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"
      </FileViewer>
    );
  }
}

ReactDOM.render(<App/>, document.body);
```
### FileViewer props
```
{
  // The url of the resource to be shown by the FileViewer.
  filePath: string,
  
  // Type of resource to be shown (one of the supported file formats, eg 'png').
  // Passing in an unsupported file type will result in displaying an unsupported file type message (or a custom component).
  // By default, the extension of the filePath is used to determine the fileType, but it can be overwritten using this prop.
  fileType: string [optional]
  
  // Can be used to extend the file-viwer or overwrite the existing drivers, eg: '{ mp4: VideoPlayerViewer }'
  drivers: object [optional]

  // Called when an error is thrown due to fetching or rendering problems
  onError: function [optional]
  
  // A component to render in case the file format is not supported.
  UnsupportedComponent: ReactElement [optional]
  
  // A component to render in case an error is thrown
  ErrorComponent: ReactElement [optional]
}
```
### Local development
There is a demo app built into this library that can be used for development purposes.
```
npm run dev
```
