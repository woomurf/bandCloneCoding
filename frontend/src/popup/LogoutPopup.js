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
            <div className="text">로그아웃할거얌?</div>
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
        <ConfirmPopup content="로그아웃을 취소하겠습니까?" 
          onClick={function(){
            this.closeLogoutPopup();
          }.bind(this)}
        />
      </div>
    );
  }

  closeLogoutPopup() {
    const logoutPopup = document.querySelector('#logoutPopup');
    logoutPopup.classList.add('hide');
  }
  
  showConfirmPopup() {
    const confirmPopup = document.querySelector('#confirmPopup');
    confirmPopup.classList.remove('hide');
    confirmPopup.classList.add('idxZ2');
  }
};


export default logoutPopup;