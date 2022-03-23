import React, {Component} from "react";
import Button from '../component/Button';
import ConfirmPopup from '../popup/ConfirmPopup';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/popup.scss';

class logoutPopup extends Component {
  render() {
    return (
      <div>
        <div id="logoutPopup" className="hide"> 
          <div className="content">
            <div className="text"> 로그아웃할거얌? </div>
            <div className="flexWrapperTwo">
              <Button 
                label="Close" 
                className="subButton largeButton mr8"
                onClick={this.showConfirmPopup.bind(this)}
              />
              <Button 
                label="Confirm" 
                className="mainButton largeButton"
                onClick={this.props.onClick}
              />
            </div>
          </div>
        </div>
        <ConfirmPopup content="로그아웃을 취소하겠습니까?" // 없애기
          onClick={function(){
            this.closeLogoutPopup();
          }.bind(this)}
        />
      </div>
    );
  }

  closeLogoutPopup() {
    const logoutPopup = document.querySelector('#logoutPopup');
    // #logoutPopup인 온전한 요소에 접근 왜냐하면 ID이기때문 
    // querySelector 는 특정 name 이나 id 를 제한하지않고 css선택자를 사용하여 요소를 찾는다
    logoutPopup.classList.add('hide');
    // classList.add = 지정한 클래스값을추가한다 / popup.scss에 이름추가되어있음
    // classList, className 차이
    // 전자는 기존 클래스에 새로운 클래스 추가
    // 후자는 기존에 클래스가없음 추가시키고 있다면 그 이름을 변경
  }
  
  showConfirmPopup() {
    const confirmPopup = document.querySelector('#confirmPopup');
    confirmPopup.classList.remove('hide');
    confirmPopup.classList.add('idxZ2');
  }
};


export default logoutPopup;