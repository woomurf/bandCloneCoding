import React, { Component } from "react";
import Button from '../component/Button';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/popup.scss';


class PostErrorPopup extends Component {
  
  render() {
    return (
      <div>
        <div id="logoutPopup" className="hide"> 
          <div className="content">
            <div className="text"> 암튼실패했음 </div>
            <div className="flexWrapperTwo">
              <Button 
                label="Confirm" 
                className="mainButton smallButton"
                onClick={this.closeUploadPopup}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  closeUploadPopup() {
    const uploadPopup = document.querySelector('#logoutPopup');
    uploadPopup.classList.add('hide');
  }
};


export default PostErrorPopup;