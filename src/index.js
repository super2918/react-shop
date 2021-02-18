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
// let store = createStore(() => { 
//   return [
//     { id: 0, name: '멋진신발', quan: 2},
//     { id: 1, name: '멋진신발2', quan: 1}
//   ]
// });

// 초기 state값
let initialState = [
  { id: 0, name: '멋진신발', quan: 2},
  { id: 1, name: '멋진신발2', quan: 1}
];

// state 데이터의 수정 방법 : reducer 정의
// reducer 수정된 state를 리턴하는 함수 퉤 뱉어 주는 역할
// state = defaultState 기본 파라미터 디폴트 state 초기값  es6
function reducer ( state = initialState, action ) {
  // 수량이 증가할 경우 
  if(action.type === 'increase') {
    let copy = [...state]; // deep cpoy
    copy[0].quan++;
    return copy; 
  } else if (action.type === 'decrease')  {
    let copy = [...state]; // deep cpoy
    copy[0].quan--;
    return copy; 
  }else {
    return initialState;
  }
  return state
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="">
      {/* 같은 store안에 있는 모든 컴포넌트들에게 state값을 전달하고 싶어서  */}
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
