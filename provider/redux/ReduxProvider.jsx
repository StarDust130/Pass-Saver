"use client";

import { Provider } from "react-redux";
import { store } from "./store";

const ReduxProvider = ({ children }) => {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};
export default ReduxProvider;
