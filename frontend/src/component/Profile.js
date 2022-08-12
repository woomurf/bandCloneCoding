import React, {Component} from "react";
import SettingPopup from "../popup/SettingPopup";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileSetting : false,
      menuList : [
        "내 정보", "로그아웃"
      ]
    } 
  }

  profileSettingEvent(focusCursor) {
    this.setState({
      profileSetting:(focusCursor === "profile" ? !this.state.profileSetting : false)
    });
  }

  onClickMenu(menuName) {
    switch(menuName) {
      case '내 정보':
        this.props.onClickMyInfo(this.props.id);
        this.setState({profileSetting:false});
        break;
      case '로그아웃':
        this.props.onClickLogout();
        this.setState({profileSetting:false});
        break;
      default:
        console.log('menu select error');
        break;
    }
  }

  onClickOutside(e) {
    if ((this.wrapperRef_1 && !this.wrapperRef_1.contains(e.target))
      && (this.wrapperRef_2 && !this.wrapperRef_2.contains(e.target))) {
      this.profileSettingEvent("outside");
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside.bind(this));
  }

  render() {
    return (
      <div 
        id="myProfile"
        className="noDrag"
      >
        <img 
          id="memberProfileImage"
          ref={(el) => this.wrapperRef_1 = el}
          alt="" 
          src={DefaultProfileImage} 
          onClick={this.profileSettingEvent.bind(this, "profile")}
        />
        <div 
          ref={(el) => this.wrapperRef_2 = el} 
          className="zidx1"
        >
          {this.state.profileSetting && 
            <SettingPopup
              menuList={this.state.menuList}
              onClickMenu={this.onClickMenu.bind(this)}
            />
          }
        </div>
      </div>
    );
  }
};

export default Profile;