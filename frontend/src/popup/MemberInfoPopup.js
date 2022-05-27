import React, {Component} from "react";
import Button from '../component/Button';
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import '../scss/page.scss';
import '../scss/common.scss';
import '../scss/popup.scss';

class MemberInfoPopup extends Component {
  render() {
    return (
      <div id="memberInfoPopup" className="hide"> 
        <div className="content">
          <div className="profileInfo">
            <img alt="" src={this.props.profileImage||DefaultProfileImage} className="infoProfileImage"/>  
            <div className="text taCenter">
              {this.props.name} <br/>
              {this.props.email} <br/>
              {this.setBirthdayFormet(this.props.birth)}
            </div>
          </div>
          <div className="btn">
            <Button 
              label="Close" 
              className="subButton smallButton mt8"
              onClick={this.closeMemberInfoPopup.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }

  setBirthdayFormet(birth) {
    console.log(birth);
    return birth.substring(0,4) + "년 " 
    + birth.substring(5,7) + "월 " 
    + birth.substring(8,10) + "일생";
  }

  closeMemberInfoPopup() {
    const memberInfoPopup = document.querySelector('#memberInfoPopup');
    memberInfoPopup.classList.add('hide');
  }
};

export default MemberInfoPopup;