import React, {Component} from "react";
import MainButton from '../component/MainButton_sm';
import SubButton from '../component/SubButton_sm';
import '../scss/common.scss';
import '../scss/screen.scss';

class ConfirmPopup extends Component {
  closeAlertPopup() {
    const confirmPopup = document.querySelector('#confirmPopup');
    confirmPopup.classList.add('hide');
  }

  render() {
    return (
      <div id="confirmPopup" class="hide"> 
        <div class="content">
          <p class="text">
            회원가입 팝업을 먼저 넣어주세요.
          </p>
          <p class="btn">
            <div className="flexWrapperTwo">
              <SubButton title="Close" clsNm="mr8"
              onClick={this.closeAlertPopup.bind(this)}/>
              <MainButton title="Confirm" clsNm=""
              onClick={function(e){
                this.props.onClick("main"); //여기 해결중
              }.bind(this)}/>
            </div>
          </p>
        </div>
      </div>
    );
  }
};

export default ConfirmPopup;