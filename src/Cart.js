import React from  'react';
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
                    <button onClick={() => {props.dispatch({type: 'increase'})}}>+</button>
                    <button onClick={() => {props.dispatch({type: 'decrease'})}}>-</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

// redux store 데이터를 다 가지고와서 props로 변환해주는 함수
function stateProps (state) {
  return {
    state: state
  }
}

export default connect(stateProps)(Cart);

// export default Cart;