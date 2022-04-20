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
              {this.setBirthdayFormet(this.props.birthday)}
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

  setBirthdayFormet(birthday) {
    return birthday.substring(0,4) + "년 " 
    + birthday.substring(4,6) + "월 " 
    + birthday.substring(6,8) + "일생";
  }

  closeMemberInfoPopup() {
    const memberInfoPopup = document.querySelector('#memberInfoPopup');
    memberInfoPopup.classList.add('hide');
  }
};

export default MemberInfoPopup;