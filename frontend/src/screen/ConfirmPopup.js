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
      <div id="confirmPopup" className="hide"> 
        <div className="content">
          <div className="text">
            {this.props.content}
          </div>
          <div className="btn">
            <div className="flexWrapperTwo">
              <SubButton 
                label="Close" 
                className="mr8"
                onClick={this.closeConfirmPopup.bind(this)}
              />
              <MainButton 
                label="Confirm" 
                className=""
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