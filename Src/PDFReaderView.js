import * as React from "react";
import PDFReader from "rn-pdf-reader-js";
export default class PDFReaderView extends React.Component {
  render() {
    return (
      <PDFReader
        source={{
          base64:
            "data:application/pdf;base64," +
            this.props.navigation.state.params.stream,
        }}
      />
    );
  }
}
