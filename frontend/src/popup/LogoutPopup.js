import React, {Component} from "react";
import Button from '../component/Button';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/popup.scss';

class logoutPopup extends Component {
  render() {
    return (
      <div>
        <div id="logoutPopup" className="hide"> 
          <div className="content">
            <div className="logoutPopuptext"> 로그아웃 하시겠습니까? </div>
            <div className="logoutPopupflexWrapperTwo">
              <Button 
                label="Close" 
                className="subButton smallButton mr8"
                onClick={this.closeLogoutPopup}
              />
              <Button 
                label="Confirm" 
                className="mainButton smallButton"
                onClick={this.props.onClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  closeLogoutPopup() {
    const logoutPopup = document.querySelector('#logoutPopup');
    logoutPopup.classList.add('hide');
  }
};


export default logoutPopup;