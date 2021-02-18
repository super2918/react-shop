import React, { useEffect, memo } from  'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {
            
            props.state.map((a, i) => {
              return  (
                <tr key={i}>
                  <td>{ a.id }</td>
                  <td>{ a.name }</td>
                  <td>{ a.quan }</td>
                  {/* 데이터를 수정할 경우 1.reducer 수정 2. dispatch()  reducer에 만들어둔 'increase' 요청*/}
                  <td>
                    <button onClick={() => {props.dispatch({type: 'increase', data: a.id})}}>+</button>
                    <button onClick={() => {props.dispatch({type: 'decrease', data: a.id})}}>-</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      {/* 굳이 다른 컴포넌트에 필요하징 않는 것들은 reducer에 넣을 필요가 없고 useState로 하는 것이 좋다 */}
       { 
        props.alertOpend === true
        ? <div className="my-alert">
          <p>지금 구매하시면 신규할인 20%</p>
          <button onClick={() => {props.dispatch({type: 'closeAlert'})}}>닫기</button>
        </div>
        : null 
       }

       <Parent name='존박' age='20' />
    </div>
  )
}

function Parent(props) {
  return (
    <div>
      {/* <Child1 name={props.name}></Child1>
      <Child2 name={props.age}></Child2> */}
      <Child1 name={props.name}></Child1>
      <Child2 age={props.age}></Child2>
    </div>
  )
}

function Child1() {
  useEffect(() => {console.log('랜더링1')})
  return (
    <div>111</div>
  )
}

let Child2 = memo(function () { 
  // memo 불필요한 재랜더링을 하지 않기 위함 memoraize 직접적인 props의 변경이 있을때만 작동을한다.
  // 단점 : 기존 props vs 바뀐 props 비교연산후 컴포넌트 업데이트를 할지말지 결정함
  useEffect(() => {console.log('랜더링2')})
  return (
    <div>222</div>
  )
})

// redux store 데이터를 다 가지고와서 props로 변환해주는 함수
function stateProps (state) {
  console.log(state)
  return {
    state: state.reducer,
    alertOpend: state.reducer2
  }
}

export default connect(stateProps)(Cart);

// export default Cart;