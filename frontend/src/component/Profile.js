import React, {Component} from "react";
import SettingPopup from "../popup/SettingPopup";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss';
import DefaultProfileImage from "../image/DefaultProfileImage.png";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      profileSetting: false,
      menuList:[
        "내 정보", "내가 쓴글", "로그아웃"
      ]
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
          onClick={this.onClickProfile.bind(this)}
        />
        <div 
          ref={(el) => this.wrapperRef_2 = el} 
          className="zidx1"
        >
          {this.getProfileSetting()}
        </div>
      </div>
    );
  }

  onClickOutside(e) {
    if ((this.wrapperRef_1 && !this.wrapperRef_1.contains(e.target))
      && (this.wrapperRef_2 && !this.wrapperRef_2.contains(e.target))) {
      this.onBlurProfile();
    }
  }

  onClickProfile() {
    this.setState({
      profileSetting:!this.state.profileSetting
    });
  }

  onBlurProfile() {
    this.setState({
      profileSetting:false
    });
  }
  
  getProfileSetting() {
    if (this.state.profileSetting) {
      return <SettingPopup
        menuList={this.state.menuList}
        onClickMenu={this.onClickMenu.bind(this)}
      />
    } else {
      return null;
    }
  }

  onClickMenu(menuName) {
    switch(menuName) {
      case '내 정보':
        this.props.onClickProfileInfo();
        break;
      case '내가 쓴글':
        alert(menuName + "은 게시글 검색 API 구현 시 재작업");
        break;
      case '로그아웃':
        this.props.onClickLogout();
        break;
      default:
        console.log('menu select error');
        break;
    }
  }
};

export default Profile;