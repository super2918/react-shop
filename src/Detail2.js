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
    flex: 1;
    padding : 20px;
    text-align: center;
  `;

  let Title = styled.h4`
    font-size: 30px;
    color: ${ props => props.color }
  `; 

  // 컴포넌트가 많아지면 컴포넌트화가 된다?

  return (
    <div className="container">
    <div className="row">
      <Box>
        <Title color={'red'}>Detail</Title>
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


export default Detail;