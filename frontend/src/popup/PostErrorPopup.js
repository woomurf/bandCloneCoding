import React, { Component } from "react";
import Button from '../component/Button';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/popup.scss';


class PostErrorPopup extends Component {
  
  render() {
    return (
      <div>
        <div id="postErrorPopup" className="hide"> 
          <div className="content">
            <div className="text"> 암튼실패했음 </div>
            <div className="flexWrapperTwo">
              <Button 
                label="Confirm" 
                className="mainButton smallButton"
                onClick={this.closePostErrorPopup}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  closePostErrorPopup() {
    const postErrorPopup = document.querySelector('#postErrorPopup');
    postErrorPopup.classList.add('hide');
  }
};


export default PostErrorPopup;