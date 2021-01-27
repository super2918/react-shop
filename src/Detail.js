import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

// class Detail2 extends React.Component {
//   componentDidMount(){
//     // 컴포넌트가 Mount 되고나서 실행되는 코드
//   }
//   componentWillMount(){
//     // 컴포넌트가 Unmount 되기전에 실행할 코드
//   }
// } 

function Detail(props) {
  let [ showAlert, setShowAlert ] = useState(true);
  let [ input, setInput ] = useState('');
  // lifecycle hook = useEffect hook 컴포넌트가 mount되었을때 컴포넌트가 update가 될때 특정 코드 실행 
  // useEffect 여러개 써도 상관없다. 하나 안에 사용한다던지 아니면 여러개를 사용하여 다시 만든다.
  useEffect(() => {

    axios.get(); // Detail 컴포넌트 등장시 실행할 코드, 업데이트가 x , 요청을 할 경우

    let timer = setTimeout(() => { setShowAlert(false) }, 1000);
    console.log('계속실행 ');
    return () => { clearTimeout(timer) } // 버그가 생기는 부분도 고려해야 한다.
    
    // 업데이트가 될때도 실행이 된다.
    // return function 어쩌구 () {  return 이건 > 함수를 실행 
    //   실행코드
    // }

  },[]); 
  // [showAlert, input] showAlert라는 state가 변경이 될때만 되라 
  // [] 업데이시엔 아무것도 없을 때만 실행이 되세요 / 딱 로드가 실행 될때 한번만 된다.
  
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
      <input onChange={(e) => {setInput(e.target.value)}} />
      { input } 
      {/* 재랜더링 실행될때마다 */}
      {
        showAlert === true 
        ? (<div className="my-alert">
            <p>재고가 많이 남지 않았음</p>
        </div>)
        : null 
      }
      <div className="col-md-6">
        <img src={ 'https://codingapple1.github.io/shop/shoes' + seletItem.id + '.jpg' } width="100%" />
      </div>
      <div className="col-md-6 mt-4">
        <h4 className="pt-5 title-big">{seletItem.title}</h4>
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