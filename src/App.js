import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Data from './data';
import Detail from './Detail';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';

// 컴포넌트 lifecycle 
// hook 컴퍼넌트 중간에 뭔가 명령어를 넣어줄 수 있다.

function App() {

  let [ shoes, setShoes ] = useState(Data); // 제일중요한 데이터는 App.js 상위컴포넌트에서 하위로 넘기는것

  return (
    <div className="App">
      <Navbar bg="light" expand="lg" className="">
        <Navbar.Brand href="#home">Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron className="bg-main">
            <h1>20% Season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <div className="container">
            <div className="row">
              {
                shoes.map((item, i) => {
                  return <Card shoes={shoes[i]} index={i} key={i} />
                })
              }
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => {
            // 더보여줄 상품이 없을 경우, 근데 또 사옹자가 버튼을 누를경우
            // 실패시 사용자에게 알림 ui를 제공한다.
            // axios.post('서버URL', {id: 'id1111', pw: 1234}).then()
            
            // 로딩중이라는 ui 띄움

            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              console.log(result.data);
              // 로딩중이라는 ui 안보이게 처리
              setShoes([...shoes, ...result.data]);
            })
            .catch(() => {
              // 로딩중이라는 ui 안보이게
              console.log('실패');
            })
          
          }}>더보기</button>

        </Route>
        {/* id: id */}
        <Route path="/detail/:id">
          <Detail shoes={shoes} />
        </Route>

        <Route path="/:id">
          <div>아무 문자나 받는 URL 작성명 parameter 작성법</div>
        </Route>

      </Switch>

      {/* <Route path="/어쩌구"  component={Modal}></Route> */}
    </div>
  );
}


function Card(props) {
  return(
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.index + 1) + '.jpg' } width="100%"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content }</p>
      <span>{ props.shoes.price }</span>
    </div>
  )
}


export default App;
