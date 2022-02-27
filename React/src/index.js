import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {store} from "./reducers";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";

ReactDOM.render(
    //<React.StrictMode>
  <Provider store={store}>
      <Router>
            <App />
      </Router>
  </Provider>,
  document.getElementById('root')
);

