import React, {Component} from "react";
import TextButton from '../component/TextButton';
import PostFrame from "./PostFrame";
import MemberFrame from "./MemberFrame";
import SettingFrame from "./SettingFrame";
import Profile from '../component/Profile';
import MainLside from '../component/Main_Lside';
import MainRside from '../component/Main_Rside';
import AlertPopup from "../popup/AlertPopup";
import ConfirmPopup from '../popup/ConfirmPopup';
import MemberInfoPopup from "../popup/MemberInfoPopup"
import axios from "axios";
import '../scss/page.scss';

//DB 연결전 사진파일 임시방편
import Sky_ from '../image/Sky.png';
import Pic_ from '../image/Pic.png';
import Taco_ from '../image/Taco.png';

class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      myInfo : false,
      profileInfo : {
        name : "퉤스트",
        image : "",
        email : "test@test.te.st",
        birth : "1900-01-01"
      },
      memberInfo : {
        name : "nameInfo",
        image : "imageInfo",
        email : "emailInfo",
        birth : "birthInfo"
      },
      selectTab : 'post',
      memberCount : 0,
      alertContent : "Err!",
      alertPopupCondition : false,
      confirmPopupCondition : false,
      memberInfoPopupCondition : false
    } 
  }

  async componentDidMount(){
    await axios.get('/auth/me')
    .then(function(res){
      this.setState({profileInfo:res.data});
    }.bind(this));
    await axios.get('/user/list')
    .then(function(res){
      this.setState({memberCount:res.data.length});
    }.bind(this));
  }

  componentWillUnmount() {
    // 로그아웃 시 프로필 정보 초기화
    this.setState({
      profileInfo:{
        name : "",
        image : "",
        email : "",
        birth : ""
      }
    });
  }

  alertPopupOnoff() {
    this.setState({ 
      alertPopupCondition : !this.state.alertPopupCondition 
    })
  }

  confirmPopupOnOff() {
    this.setState({ 
      confirmPopupCondition : !this.state.confirmPopupCondition 
    })
  }

  showUserInfoPopup(myInfo, nameInfo, imageInfo, emailInfo, birthInfo) {
    let myProfileYn = myInfo || (nameInfo === this.state.profileInfo.name);
    this.setState({
      myInfo : myProfileYn,
      memberInfo:{
        name:(myProfileYn ? this.state.profileInfo.name : nameInfo),
        image:(myProfileYn ? this.state.profileInfo.profileImage : imageInfo),
        email:(myProfileYn ? this.state.profileInfo.email : emailInfo),
        birth:(myProfileYn ? this.state.profileInfo.birth : birthInfo),
      },
      memberInfoPopupCondition : !this.state.memberInfoPopupCondition
    });
  }

  render () {
    return (
      <div>
        <div id="pageHeader">
          <div id="pageTopMenu">
            <div id="postSearch">
              {/*할까?*/}
            </div>
            <Profile
              onClickMyInfo={this.showUserInfoPopup.bind(this)}
              onClickLogout={this.confirmPopupOnOff.bind(this)}
            />
          </div>
          <div id="pageTopBar">
            <div id="menuTab" className="mt4">
              <TextButton
                label="게시글"
                selectYn={this.state.selectTab === "post"}
                onClick={function(){
                  this.onChangeTab("post");
                }.bind(this)}
              />
              <TextButton
                label="멤버"
                selectYn={this.state.selectTab === "member"}
                onClick={function(){
                  this.onChangeTab("member");
                }.bind(this)}
              />
              <TextButton
                label="설정"
                selectYn={this.state.selectTab === "setting"}
                onClick={function(){
                  this.onChangeTab("setting");
                }.bind(this)}
              />
            </div>
          </div>
        </div>
        <div>
          <div id="pageBody">
            <MainLside
              onClick={this.onChangeTab.bind(this, "setting")}
              selectYn={this.state.selectTab === "setting"}
              bandImage={Sky_}
              bandName={"우리의밴드이름은?"}
              memberCount={"멤버 " + this.state.memberCount}
              bandIntroduce={"몰?루"}
            />
            {this.getSelectTab()}
            <MainRside 
              //DB 연결이되면 수정
              pictures = {[Taco_,Sky_,Pic_,Sky_,Pic_,Sky_,Pic_,Sky_,Pic_,Sky_,Pic_,Sky_,Pic_]}
            />
          </div>
        </div>
        <AlertPopup
          content={this.state.alertContent} 
          alertPopupCondition={this.state.alertPopupCondition}
          alertPopupOnoff={this.alertPopupOnoff.bind(this)}
        />
        <ConfirmPopup
          content="로그아웃 하시겠습니까?"
          confirmPopupOnOff={this.confirmPopupOnOff.bind(this)}
          confirmPopupCondition={this.state.confirmPopupCondition}
          onClick={function(e){
            this.props.onClick("")
          }.bind(this)}
        />
        <MemberInfoPopup
          myInfoYn={this.state.myInfo}
          name={this.state.memberInfo.name}
          image={this.state.memberInfo.image}
          email={this.state.memberInfo.email}
          birth={this.state.memberInfo.birth}
          memberInfoPopupOnOff={this.showUserInfoPopup.bind(this)}
          memberInfoPopupCondition={this.state.memberInfoPopupCondition}
        />
      </div>
    );
  }

  onChangeTab(pagePath) {
    this.setState({ 
      selectTab:pagePath
    });
  }

  getSelectTab() {
    var tabPage;
    switch(this.state.selectTab) {
      case 'post':
        tabPage = 
          <PostFrame 
            postErrorPopup={this.alertPopupOnoff.bind(this)}
          />;
        break;
      case 'member':
        tabPage = 
          <MemberFrame
            memberInfoPopupOnOff={this.showUserInfoPopup.bind(this)}
          />;
        break;
      case 'setting':
        tabPage = 
          <SettingFrame
            name={this.state.profileInfo.name}
            profileImage={this.state.profileInfo.profileImage}
            onClick={this.confirmPopupOnOff.bind(this)}
          />;
        break;
      default:
        console.log('tab select error');
        break;
    }
    return tabPage;
  }
};

export default MainScreen;