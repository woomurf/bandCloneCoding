import React, {Component} from "react";
import Button from '../component/Button';
import '../scss/common.scss';
import '../scss/popup.scss';

class AlertPopup extends Component {
  render() {
    return (
      <div id="alertPopup" className="hide"> 
        <div className="content">
          <div className="text">
            {this.props.content}
          </div>
          <div className="btn">
            <Button 
              label="Close" 
              className="subButton smallButton mt8"
              onClick={function(e){ 
                this.closeAlertPopup();
                // this.props.onClick();
              }.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }

  closeAlertPopup() {
    const alertPopup = document.querySelector('#alertPopup');
    alertPopup.classList.add('hide');
  }
};

export default AlertPopup;