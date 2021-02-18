import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//router setting 
import { BrowserRouter } from 'react-router-dom';
// import { HashRouter } from 'react-router-dom'; #router 라우팅 안전하게 할수도 있다. # 뒤에 오는 것들은 서버에 요청이 안간다.
// Browser은 셋팅이 필요할 수 있다.
// redux setting 

import { Provider } from 'react-redux';
import { createStore } from 'redux';

// state 초기값
// let store = createStore(() => { return [ { id: 0, name: '멋진신발', quan: 2 }] })
let store = createStore(() => { return [{ id: 0, name: '멋진신발', quan: 2}]})



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
