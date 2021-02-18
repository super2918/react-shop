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
          <tr>
            <td>{ props.state[0].id}</td>
            <td>{ props.state[0].name }</td>
            <td>{ props.state[0].quan}</td>
            <td>테스트 중</td>
          </tr>
          <tr>
            <td>2</td>
            <td>{ props.state[0].name }</td>
            <td>{ props.state[0].name }</td>
            <td>테스트 중</td>
          </tr>
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