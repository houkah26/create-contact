import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "../../store";

import Layout from "../Layout";
import Header from "../Header";
import Main from "../Main";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout header={<Header />} main={<Main />} />
      </Provider>
    );
  }
}

export default App;
