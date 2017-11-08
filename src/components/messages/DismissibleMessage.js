import React, { Component } from "react";
import { Message } from "semantic-ui-react";

class DismissibleMessage extends Component {
  state = { visible: true };

  handleDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    if (this.state.visible) {
      return (
        <Message
          onDismiss={this.handleDismiss}
          // Props for Semantic UI Message
          // https://react.semantic-ui.com/collections/message#message-example-dismissible-block
          {...this.props}
        />
      );
    }

    return null;
  }
}

export default DismissibleMessage;
