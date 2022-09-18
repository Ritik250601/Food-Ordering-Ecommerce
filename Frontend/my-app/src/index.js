import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {AuthContextProvider} from './Store/auth-context'
import {CartContextProvider} from './Store/Cart-context'


ReactDOM.render(
  <React.StrictMode>
 <AuthContextProvider>
   <CartContextProvider>
      <App />
   </CartContextProvider>
  </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
