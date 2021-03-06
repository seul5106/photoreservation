import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Cookies } from 'react-cookie';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store';

import setAuthorizationToken from "./Component/Users/setAuthorizationToken"


const cookies = new Cookies();
setAuthorizationToken(cookies.get("jwtToken"))



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </PersistGate>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
