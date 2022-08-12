import React, {Component} from "react";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import '../scss/page.scss';

class MemberBox extends Component {
  render() {
    return (
      <div>
        <div className="memberBodyDiv">
          <div className="memberBody">
            <img alt="" src={this.props.memberInfo.profileImageUrl || DefaultProfileImage} id="memberProfileImage"/>
            <div className="memberName">
              {this.props.memberInfo.name}
            </div>
          </div>
          <button 
            className="settingButton"
            onClick={function(){
              this.props.onClickProfileInfo(this.props.memberInfo.id);
            }.bind(this)}
          >
            정보
          </button>
        </div>
        {!this.props.lastIndexYn && <div className="memberLine"/>}
      </div>
    );
  }
};

export default MemberBox;