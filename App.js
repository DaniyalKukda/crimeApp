import React from 'react';
import Navigator from "./Navigation/navigator";
import Store from "./Redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={Store}>
      <Navigator />
    </Provider>
  );
}

