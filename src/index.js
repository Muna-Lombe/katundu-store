import React from 'react';
import ReactDOM from 'react-dom';
// import index from "./js/index";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Store from './js/store';
import { asyncThunk,} from './orm/utilities/StateLoader';



Store.dispatch(asyncThunk())

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='katundu-store'>
      {/* <HashRouter> */}
        <Provider store={Store}>
          <App />
        </Provider>
      {/* </HashRouter> */}
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
