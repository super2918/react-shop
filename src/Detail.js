import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

function Detail(props) {
  // google
  let { id } = useParams(); // 사용자가 입력한 파라메터가 들어가있다. /:id 값 뒤로 오는 것들
  let history = useHistory(); 
  let seletItem = props.shoes.find((item) => item.id = id);

  // style component 이용 css를 미리 입혀놓은 컴포넌트 사용
  let Box = styled.div`
    flex: 1 auto;
    padding : 20px;
    text-align: center;
  `;

  let Title = styled.h4`
    font-size: 30px;
    color: ${ props => props.color }
  `; 

  // 컴포넌트가 많아지면 class가 겹칠일이 줄어든다. 편의성 이런건 잘 모르겠다.

  return (
    <div className="container">
    <div className="row">
      <Box>
        <Title color={'red'}>Detail</Title> 
        <Title color="blue">Detail</Title> 
        {/* color라는 props를 전달 */}
      </Box>
      <div className="col-md-6">
        <img src={ 'https://codingapple1.github.io/shop/shoes' + seletItem.id + '.jpg' } width="100%" />
      </div>
      <div className="col-md-6 mt-4">
        <h4 className="pt-5">{seletItem.title}</h4>
        <p>{seletItem.content}</p>
        <p>{seletItem.price}</p>
        <button className="btn btn-danger">주문하기</button> 
        <button className="btn btn-danger" onClick={() => { history.push('/sdkfjlksjfdlksd')}}>뒤로가기</button> 
      </div>
    </div>
  </div> 
  )
}
// 자료 순서가 변경되면 상세페이지도 문제
// 정렬이될 경우 데이터가 정렬의 기준으로 정렬이 되어버리는데 
// 그럼 해당 id가 정렬된 순서로 상품이 변화가 되어버린다.
// Datil.js  데이터 바인딩시 0 번째상품을 보여주세요가 아니라 상품의 고유 id의 0번째 상품을 보여줘야 한다는 것이다.

export default Detail; // Detail이라는 것을 내뱉는 것 