import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import React, { useContext, useState } from 'react';
import Data from './data';
import Detail from './Detail';
import Cart from './Cart';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';

export  let stockcontext = React.createContext(); // 1.값은 값을 공유할 범위를 생성, 다른 파일에도 적용하고 싶으면 export하면 된다.

function App() {

  let [ shoes, setShoes ] = useState(Data); 
  let [ stock, setStock ] = useState([10, 11, 12]);

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
            {/* 2. 값 공유를 원한는 HTML들을 <범위.Provider>로 감싸고 value={공유원하는 값} */}
            <stockcontext.Provider value={stock}> 

            <div className="row">
              {
                shoes.map((item, i) => {
                  return <Card shoes={shoes[i]} index={i} key={i} />
                })
              }
            </div>

            </stockcontext.Provider>

          </div>
          <button type="button" className="btn btn-primary" onClick={() => {

            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              console.log(result.data);
              setShoes([...shoes, ...result.data]);
            })
            .catch(() => {
              console.log('실패');
            })
          
          }}>더보기</button>

        </Route>
        {/* id: id */}
        <Route path="/detail/:id">
          <stockcontext.Provider value={stock}>
            <Detail shoes={shoes} stock={stock} setStock={setStock} />
          </stockcontext.Provider>
        </Route>

        {/* <Route path="/:id">
          <div>아무 문자나 받는 URL 작성명 parameter 작성법</div>
        </Route> */}

        <Route path="/cart">
          <Cart></Cart>
        </Route>

      </Switch>
    </div>
  );
}


function Card(props) {

  // props전송 없이 stock이라는 state값을 사용가능 
  // 3.useContext(범위이름)로 공유된 값을 사용한다.
  // 간단한 전송은 props가 더 효율적이다.
  let stock = useContext(stockcontext); 

  return(
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.index + 1) + '.jpg' } width="100%"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content }</p>
      <span>{ props.shoes.price }</span>
      <div>{stock[props.index]}</div>
      <Test />
    </div>
  )
}

function Test() {

  let stock = useContext(stockcontext); // stock을 받아오는 것 props를 선언하지 않아도 한다.

  return <p>재고 : {stock} </p>
}


export default App;
