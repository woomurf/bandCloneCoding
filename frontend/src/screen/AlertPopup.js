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
      <div id="alertPopup" className="hide"> 
        <div className="content">
          <div className="text">
            {this.props.content}
          </div>
          <div className="btn">
            <SubButton 
              label="Close" 
              className="mt8"
              onClick={function(e){ 
                this.closeAlertPopup();
                this.props.onClick();
              }.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default AlertPopup;