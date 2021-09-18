import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import PasswordControls from "./components/password-controls/containers/password-controls";
import 'antd/dist/antd.css';

const App = () => {
  return <Provider store={store}>
    <PasswordControls />
  </Provider>;
};

export default App;
