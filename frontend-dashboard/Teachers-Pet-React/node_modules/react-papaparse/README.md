# react-papaparse

> Fast and powerful CSV (delimited text) parser that gracefully handles large files and malformed input for using with React.

[![NPM](https://img.shields.io/npm/v/react-papaparse.svg)](https://www.npmjs.com/package/react-papaparse) [![Build Status](https://travis-ci.com/themodernjavascript/react-papaparse.svg?branch=master)](https://travis-ci.com/themodernjavascript/react-papaparse) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- Easy to use
- Multi-threaded
- One of the only parsers that correctly handles line-breaks and quotations
- Read CSV to JSON
- Fast mode by default
- Integration to get files from `<input type="file">` using `inputRef`
- [Header row support](#header-row-support)
- [Stream](#stream)

## Road map

- Auto-detect delimiter
- Type conversion
- Skip commented lines
- Pause, resume, abort
- Read JSON to CSV

## Install

react-papaparse is available on npm. It can be installed with the following command:

```
npm install --save react-papaparse
```

react-papaparse is available on yarn as well. It can be installed with the following command:

```
yarn add react-papaparse
```

## Usage

```javascript
import React, { Component } from 'react';

import { CSVReader } from 'react-papaparse';

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleReadCSV = (data) => {
    console.log(data);
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  }

  handleImportOffer = () => {
    this.fileInput.current.click();
  }

  render() {
    return (
      <div>
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{display: 'none'}}
          onError={this.handleOnError}
        />
        <button onClick={this.handleImportOffer}>Import</button>
      </div>
    );
  }
}

export default App;
```

### Header row support

If you tell react-papaparse there is a header row, each row will be organized by field name instead of index.

```javascript
<CSVReader
  onFileLoaded={this.handleReadCSV}
  inputRef={this.fileInput}
  style={{display: 'none'}}
  onError={this.handleOnError}
  configOptions={{header: true /* Header row support */ }}
/>
```

### Stream

That's what streaming is for. Specify a step callback to receive the results row-by-row. This way, you won't load the whole file into memory and crash the browser.

```javascript
<CSVReader
  onFileLoaded={this.handleReadCSV}
  inputRef={this.fileInput}
  style={{display: 'none'}}
  onError={this.handleOnError}
  configOptions={{
    header: true,
    step: function(row) { /* Stream */
      console.log("Row:", row.data);
    },
  }}
/>
```

## APIs

| Props | Type | Default | Required | Description |
|:--------------|:--------------|:--------------|:--------------|:--------------|
| onFileLoaded | function |  | yes | The function to be called passing loaded results. |
| onError | function |  | no | Error handling function. |
| configOptions | object | {} | no | [The Parse Config Object](https://www.papaparse.com/docs#config). |
| [inputRef](https://reactjs.org/docs/refs-and-the-dom.html) | object |  | no | A way to access/get files from `<input type="file">` element. |
| style | object |  | no | Some styles to be applied to the `<input>` element. |

## License

MIT © [Bunlong](https://github.com/Bunlong)
