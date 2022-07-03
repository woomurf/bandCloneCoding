import React, {Component} from "react";
import TextButton from '../component/TextButton';
import PostFrame from "./PostFrame";
import MemberFrame from "./MemberFrame";
import SettingFrame from "./SettingFrame";
import Profile from '../component/Profile';
import MainLside from '../component/Main_Lside';
import MainRside from '../component/Main_Rside';
import ConfirmPopup from '../popup/ConfirmPopup';
import AlertPopup from "../popup/AlertPopup";
import '../scss/page.scss';

//DB 연결전 사진파일 임시방편
import Sky_ from '../image/Sky.png';
import Pic_ from '../image/Pic.png';
import Taco_ from '../image/Taco.png';

class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
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
      alertContent : "Err!",
      alertPopupCondition : false,
      confirmPopupCondition : false
    } 
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

  render () {
    return (
      <div>
        <div id="pageHeader">
          <div id="pageTopMenu">
            <div id="postSearch">
              {/*할까?*/}
            </div>
            <Profile
              name={this.state.profileInfo.name}
              profileImage={this.state.profileInfo.profileImage}
              email={this.state.profileInfo.email}
              birth={this.state.profileInfo.birth}
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
              memberCount={"멤버 3"}
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
          <MemberFrame/>;
        break;
      case 'setting':
        tabPage = 
          <SettingFrame
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