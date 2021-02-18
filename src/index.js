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

import { connect, Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

// state 초기값
// let store = createStore(() => { return [ { id: 0, name: '멋진신발', quan: 2 }] })
// let store = createStore(() => { 
//   return [
//     { id: 0, name: '멋진신발', quan: 2},
//     { id: 1, name: '멋진신발2', quan: 1}
//   ]
// });

// let alertIinitial = true;
function reducer2(state = true, action){
  if(action.type === 'closeAlert') {
    return !state;
  } else {
    return state;
  }
}

// 초기 state값
let initialState = [
  { id: 0, name: '멋진신발', quan: 2},
  { id: 1, name: '멋진신발2', quan: 1}
];

// state 데이터의 수정 방법 : reducer 정의
// reducer 수정된 state를 리턴하는 함수 퉤 뱉어 주는 역할
// state = defaultState 기본 파라미터 디폴트 state 초기값  es6
function reducer ( state = initialState, action ) {
  
  if(action.type === 'addItem') {
    //만약에 같은 상품이 계속 주문하면 항목을 추가지않고, 수량만 증가 
    // "id가 같은 상품이  state에 있으면 push하지 말고 id가 같은 상품의 quan을 증가"
    // state안에 id: action.datat 인게 있냐? 
    let found = state.findIndex((item) => { return item.id === action.data.id}) // findex, find
    console.log(found)
    if (found >= 0){
      let copy = [...state]; 
      copy[found].quan++; 
      return copy;
    } else {
      let copy = [...state]; // deep cpoy
      copy.push(action.data); // dispatch할 때 함께 데이터 전송, 전송한 데이터를 사용하려면
      return copy;
    }

  }else if(action.type === 'increase') {
    let copy = [...state]; // deep cpoy
    copy[action.data].quan++;
    return copy; 
  } else if (action.type === 'decrease')  {
    let copy = [...state]; // deep cpoy
    copy[action.data].quan--;
    return copy; 
  }else { 
    return initialState;
  }
  return state
}
// conbineReudecers 상단에 들어가는 것들 한번
let store = createStore(combineReducers({reducer, reducer2}));

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
