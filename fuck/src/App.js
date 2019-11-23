import React from 'react';
import Axios from 'axios';
import './App.css';

class App extends React.Component {
  clickOrder(num) {
    return () => {
      Axios.post("http://vending.hssoft.kr", {
        idx: num
      }).then((value) => {
        alert("주문이 완료되었습니다.")
      }).catch(e => {
        alert("서버 오류! 잠시 후 다시 시도해주세요.");
      })
    }
  }

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
                <button onClick={this.clickOrder(1)}>주문하기</button>
              </div>
            </li>
            <li>
              <p className="title"> 핫식스 </p>
              <img src="http://image.auction.co.kr/itemimage/10/7b/90/107b906b91.jpg" width="300"/>
              <div className="btn-wrapper">
                <button onClick={this.clickOrder(2)}>주문하기</button>
              </div>
            </li>
            <li>
              <p className="title"> 달가슴살 </p>
              <img src="http://image.auction.co.kr/itemimage/17/1e/e2/171ee230c6.jpg" width="300"/>
              <div className="btn-wrapper">
                <button onClick={this.clickOrder(3)}>주문하기</button>
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
