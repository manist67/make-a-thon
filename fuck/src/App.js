import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <nav>
          <p>
            <span className="BI">헬판기에 온걸 환영해!</span>
          </p>
        </nav>
          <div className="item-wrapper">
          <ul>
            <li>
              <p className="title"> 콜라 </p>
              <img src="http://gdimg.gmarket.co.kr/205163533/still/600?ver=0" width="300"/>
              <div className="btn-wrapper">
                <button>주문하기</button>
              </div>
            </li>
            <li>
              <p className="title"> 핫식스 </p>
              <img src="http://image.auction.co.kr/itemimage/10/7b/90/107b906b91.jpg" width="300"/>
              <div className="btn-wrapper">
                <button>주문하기</button>
              </div>
            </li>
            <li>
              <p className="title"> 달가슴살 </p>
              <img src="http://image.auction.co.kr/itemimage/17/1e/e2/171ee230c6.jpg" width="300"/>
              <div className="btn-wrapper">
                <button>주문하기</button>
              </div>
            </li>
          </ul>
        </div>
        <footer>
          <p>
            <span className="BI">디자인을 이렇게 해서 미안해!</span>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
