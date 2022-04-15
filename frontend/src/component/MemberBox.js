import React, {Component} from "react";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import '../scss/page.scss';

class MemberBox extends Component {
  render() {
    return (
      <div>
        <div className="memberBodyDiv">
          <div className="memberBody">
            <img alt="" src={this.props.profileImage||DefaultProfileImage} id="memberProfileImage"/>
            <div className="memberName">
              {this.props.name}
            </div>
          </div>
          <button 
            className="settingButton"
            onClick={function(){
              this.props.onProfilePopup(this.props.name, this.props.profileImage, this.props.email, this.props.birthday);
            }.bind(this)}
          >
            정보
          </button>
        </div>
        {this.getDivLine(this.props.lastIndexYn)}
      </div>
    );
  }

  getDivLine(divLineYn) {
    var divLine = null;
    if (!divLineYn) {
      divLine = <div className="memberLine"/>;
    }
    return divLine;
  }
};

export default MemberBox;