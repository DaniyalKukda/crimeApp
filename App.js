import React from 'react';
import Navigator from "./src/Navigation/navigator";
import Store from "./src/Redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={Store}>
      <Navigator />
    </Provider>
  );
}

