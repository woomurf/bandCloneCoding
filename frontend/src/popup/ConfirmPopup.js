import React, {Component} from "react";
import Button from '../component/Button';
import '../scss/common.scss';
import '../scss/popup.scss';

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
      <div id="confirmPopup" className="hide"> 
        <div className="content">
          <div className="text">
            {this.props.content}
          </div>
          <div className="btn">
            <div className="flexWrapperTwo">
              <Button 
                label="Close" 
                className="subButton smallButton mr8"
                onClick={this.closeConfirmPopup.bind(this)}
              />
              <Button 
                label="Confirm" 
                className="mainButton smallButton"
                onClick={function(e){
                  this.closeConfirmPopup();
                  this.props.onClick();
                }.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ConfirmPopup;