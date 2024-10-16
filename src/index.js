import React from 'react';
import ReactDOM from 'react-dom';
// import index from "./js/index";
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Store from './js/store';
// import { asyncThunk,} from './orm/utilities/StateLoader';
// import ReduxTester from './ReduxTester.js.example';
import App from './App';
import { apiSlice } from './js/middleware/queryHandler';



Store.dispatch(apiSlice.endpoints.getProducts.initiate())
Store.dispatch(apiSlice.endpoints.getCatalog.initiate())
sessionStorage.setItem("connectionRetry", 0)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      {/* <HashRouter> */}
        <Provider store={Store}>
        {/* <ReduxTester/> */}
          
          <App />
        </Provider>
      {/* </HashRouter> */}
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
