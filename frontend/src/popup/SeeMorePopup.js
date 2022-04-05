import React, {Component} from "react";
import Button from '../component/Button';
import '../scss/common.scss';
import '../scss/popup.scss';

class SeeMorePopup extends Component {
  closeSeeMorePopup() {
    const seeMorePopup = document.querySelector('#seeMorePopup');
    seeMorePopup.classList.add('hide');
  }

  onConfirmCallback() {
    console.log(this);
  }

  render() {
    return (
      <div id="seeMorePopup" className="hide"> 
        <div className="content">
          <div className="btn">
            <Button 
                label="Close" 
                className="subButton smallButton mt4"
                onClick={this.closeSeeMorePopup.bind(this)}
            />
             <Button 
                label="수정" 
                className="subButton smallButton mt4"
            />
            <Button 
               label="삭제" 
               className="subButton smallButton mt4"
           />
          </div>
        </div>
      </div>
    );
  }
};

export default SeeMorePopup;