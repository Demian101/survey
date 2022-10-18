import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ReactQueryProvider } from "./lib/react-query";

import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <ReactQueryProvider>
        <App/>
      </ReactQueryProvider>
    </Router>
  </Provider>
);
