import axios from 'axios';
import {  Nav  } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { CSSTransition } from 'react-transition-group';
import { stockcontext } from './App.js';
import { connect } from 'react-redux';

function Detail(props) {
  let [ showAlert, setShowAlert ] = useState(true);
  let [ input, setInput ] = useState('');
  let stock = useContext(stockcontext); // import해서 사용하면 된다.

  let [tab, setTab] = useState(0); // tab status저장
  let [aniSwitch, setAniSwitch] = useState(false);

  useEffect(() => {
    axios.get(); // Detail 컴포넌트 등장시 실행할 코드, 업데이트가 x , 요청을 할 경우
    let timer = setTimeout(() => { setShowAlert(false) }, 1000);
    console.log('계속실행 ');
    return () => { clearTimeout(timer) } // 버그가 생기는 부분도 고려해야 한다.
  },[]); 


  // 1. 누가 Detail페이지에 들어가면
  // 2. localStorage에 있는 항목을 꺼내고
  // 3. 경우가 두가지 있는데 null or [] 가 나온다. 
  // 4. []가 나오면 거기에 url 파라미터 id부분을 push()추가함
  // 5. 중복처리한다. 0이 있으면 set 자료형 찾아보기 
  // 6. 그러면 []를 다시 localStorage를 저장함(따옴표)

  useEffect(() => { //1.
    var arr = localStorage.getItem('watched'); //2.
    if(arr == null ) {
      arr = [] 
    } else { 
      arr = JSON.parse(arr); 
    }//3.
    
    arr.push(id); //4.
    // set자료형 중복
    arr = new Set(arr); // 5.
    arr = [...arr]; // 중복이 제거된 값을 array로 만든다.

    localStorage.setItem('watched', JSON.stringify(arr)); //6.
    
  }, []);
  
  let { id } = useParams(); 
  let history = useHistory(); 
  let seletItem = props.shoes.find((item) => item.id = id);

  // style component 이용 css를 미리 입혀놓은 컴포넌트 사용
  let Box = styled.div`
    flex: 1 auto;
    padding : 20px;
    text-align: center;
  `;

  let Title = styled.h4`
    color: ${ props => props.color }
  `; 

  // 컴포넌트가 많아지면 class가 겹칠일이 줄어든다. 편의성 이런건 잘 모르겠다.

  return (
    <div className="container">
    <div className="row">
      <Box className="col-md-6">
        <Title color={'red'}>Detail</Title> 
        {/* <Title color="blue">Detail</Title>  */}
        {/* color라는 props를 전달 */}
        {/* 재랜더링 실행될때마다 */}
        {
          showAlert === true 
          ? (<div className="my-alert">
              <p>재고가 많이 남지 않았음</p>
          </div>)
          : null 
      }
      </Box>
      {/* <input onChange={(e) => {setInput(e.target.value)}} />
      { input }  */}
      <div className="col-md-6">
        <img src={ 'https://codingapple1.github.io/shop/shoes' + seletItem.id + '.jpg' } width="100%" />
      </div>
      <div className="col-md-6 mt-4">
        <h4 className="pt-5 title-big">{seletItem.title}</h4>
        <p>{seletItem.content}</p>
        <p>{seletItem.price}</p>

        <Info stock={props.stock}></Info>
        <button className="btn btn-danger" onClick={() => {
          props.setStock([9])
          // props.dispatch({type: 'addItem', payload: { id: 1, name: '새로운 상품', quan: 1 }});
          props.dispatch({type: 'addItem', data: { id: seletItem.id, name: seletItem.title, quan: 1 }}); // 현재 상품을 id, title s
          // 근데 다시 저장할때 데이터가 저장이 될때 반복적으로 저장이되고 있는 버그 어떻게 변경
          history.push('/cart');
         }}>주문하기</button> 
        <button className="btn btn-danger" onClick={() => { history.push('/')}}>뒤로가기</button> 
      </div>
    </div>

    <Nav className="mt-5" variant="tabs" defaultActiveKey="/link-0"> 
      <Nav.Item>
        <Nav.Link eventKey="link-0" onClick={() => {setAniSwitch(false); setTab(0)}}>0</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={() => {setAniSwitch(false); setTab(1)}}>Option 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link eventKey="link-2" onClick={() => {setAniSwitch(false); setTab(2)}}>Option 2</Nav.Link>
      </Nav.Item>
    </Nav>

    <CSSTransition in={aniSwitch} classNames="ani" timeout={500}>
      <TabContent tab = { tab } setAniSwitch={setAniSwitch} />
    </CSSTransition>

  </div> 
  )
}

function TabContent(props) {

  useEffect(() => {
    props.setAniSwitch(true); // tab 내용 컴포넌트가 로드될 떄 true
  });

  if(props.tab === 0) {
    return <div>0 번째 내용입니다.</div>
  } else if (props.tab === 1) {
    return <div>1 번째 내용입니다.</div>
  } else if (props.tab === 2) {
    return <div>2 번째 내용입니다.</div>
  }
}

function Info(props) {
  return (
    <p>재고 : {props.stock[0]}</p>
  )
}

function stateprops (state) {
  console.log(state)
  return {
    state: state.reducer,
  }
}

export default connect(stateprops)(Detail);

// export default Detail;