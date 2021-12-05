import React, {Component} from "react";
import MainButton from '../component/MainButton_sm';
import SubButton from '../component/SubButton_sm';
import '../scss/common.scss';
import '../scss/screen.scss';

class ConfirmPopup extends Component {
  closeConfirmPopup() {
    const confirmPopup = document.querySelector('#confirmPopup');
    confirmPopup.classList.add('hide');
  }

  onConfirmCallback() {
    console.log(this);
  }

  render() {
    return (
      <div id="confirmPopup" class="hide"> 
        <div class="content">
          <p class="text">
            {this.props.content}
          </p>
          <p class="btn">
            <div className="flexWrapperTwo">
              <SubButton title="Close" clsNm="mr8"
              onClick={this.closeConfirmPopup.bind(this)}/>
              <MainButton title="Confirm" clsNm=""
              onClick={function(e){
                this.closeConfirmPopup();
                this.props.onClick();
              }.bind(this)}/>
            </div>
          </p>
        </div>
      </div>
    );
  }
};

export default ConfirmPopup;