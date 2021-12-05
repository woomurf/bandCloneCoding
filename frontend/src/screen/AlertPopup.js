import React, {Component} from "react";
import SubButton from '../component/SubButton_sm';
import '../scss/common.scss';
import '../scss/screen.scss';

class AlertPopup extends Component {
  closeAlertPopup() {
    const alertPopup = document.querySelector('#alertPopup');
    alertPopup.classList.add('hide');
  }

  render() {
    return (
      <div id="alertPopup" class="hide"> 
        <div class="content">
          <p class="text">
            {this.props.content}
          </p>
          <p class="btn">
            <SubButton title="Close" clsNm="mt8"
            onClick={this.closeAlertPopup.bind(this)}/>
          </p>
        </div>
      </div>
    );
  }
};

export default AlertPopup;