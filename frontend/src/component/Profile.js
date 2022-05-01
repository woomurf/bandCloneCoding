import React, {Component} from "react";
import SettingPopup from "../popup/SettingPopup";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss';
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import MemberInfoPopup from "../popup/MemberInfoPopup"

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      profileSetting: false,
      profileInfomation: false,
      memberInfo :{
        name:"",
        image:"",
        email:"",
        birthday:""
      },      
      profileInfo:{
        name:"퉤스트",
        image:"",
        email:"test@test.te.st",
        birthday:"19000101"
      },
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
          />}
        </div>
        {this.state.profileInfomation &&
          <MemberInfoPopup            
            name={this.state.memberInfo.name}
            image={this.state.memberInfo.image}
            email={this.state.memberInfo.email}
            birthday={this.state.memberInfo.birthday}
          />
        }
      </div>
    );
  }

  onClickOutside(e) {
    if ((this.wrapperRef_1 && !this.wrapperRef_1.contains(e.target))
      && (this.wrapperRef_2 && !this.wrapperRef_2.contains(e.target))) {
      this.profileSettingEvent("outside");
    }
  }

  profileSettingEvent(focusCursor) {
    this.setState({
      profileSetting:(focusCursor === "profile" ? !this.state.profileSetting : false)
    });
  }

  showUserInfoPopup(infoSource, nameInfo, imageInfo, emailInfo, birthdayInfo) {
    this.setState({
      memberInfo:{
        name:(infoSource === "member" ? nameInfo : this.state.profileInfo.name),
        image:(infoSource === "member" ? imageInfo : this.state.profileInfo.image),
        email:(infoSource === "member" ? emailInfo : this.state.profileInfo.email),
        birthday:(infoSource === "member" ? birthdayInfo : this.state.profileInfo.birthday),
      },
      profileInfomation: !this.state.profileInfomation
    }
    );
  }

  onClickMenu(menuName) {
    switch(menuName) {
      case '내 정보':
        this.showUserInfoPopup();
        this.setState({profileSetting:false})
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