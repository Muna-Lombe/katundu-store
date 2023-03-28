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


// export const cachedProduct = new Cache()

Store.dispatch(asyncThunk())
// StateLoadMiddleware(Store)
// Store.dispatch(createAsyncThunk(`orm/load${ThunkTypes[0].dataName}`, async () => {
//   return await load(ThunkTypes[0])
//   }))
// console.log("store", Store.getState())
// loadProducts()
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      {/* <HashRouter> */}
        <Provider store={Store}>
          <App />
        </Provider>
      {/* </HashRouter> */}
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
