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
      isMyInfo : false,
      profileInfo : {
        id : "",
        name : "퉤스트",
        image : "",
        email : "test@test.te.st",
        birth : "1900-01-01"
      },
      memberInfo : {
        id : "",
        name : "nameInfo",
        image : "imageInfo",
        email : "emailInfo",
        birth : "birthInfo"
      },
      selectTab : 'post',
      members : [],
      memberCount : 0,
      memberFrameComment : null,
      alertContent : "Err!",
      alertPopupCondition : false,
      confirmPopupCondition : false,
      memberInfoPopupCondition : false
    } 
  }

  async componentDidMount(){
    await this.loadProfileInfo();
    await this.memberSelectEvent('');
  } 

  async loadProfileInfo() {
    await axios.get('/auth/me')
    .then(function(res){
      this.setState({
        profileInfo:res.data,
        memberInfo:res.data
      });
    }.bind(this));
  }

  async memberSelectEvent(searchParam){
    if (searchParam !== '') {
      await axios.get('/user/search/' + searchParam)
      .then(function(res){
        if (res.data.length > 0) {
          this.setState({
            members:res.data,
            memberFrameComment:`'${searchParam}' (으)로 검색한 결과`
          });
        } else {
          this.setState({
            members:[],
            memberFrameComment:"조회된 데이터가 없습니다."
          });
        }
      }.bind(this));
    } else {
      await axios.get('/user/list')
      .then(function(res){
        this.setState({
          members:res.data,
          memberCount:res.data.length,
          memberFrameComment:"멤버 " + res.data.length
        });
      }.bind(this));
    }
  }

  componentWillUnmount() {
    // 로그아웃 시 프로필 정보 초기화
    this.setState({
      profileInfo:{
        id : "",
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

  showUserInfoPopup(isMyInfo, idInfo, nameInfo, imageInfo, emailInfo, birthInfo) {
    if (!this.state.memberInfoPopupCondition) {
      let isMyProfile = isMyInfo || (nameInfo === this.state.profileInfo.name);
      this.setState({
        isMyInfo : isMyProfile,
        memberInfo:{
          id:(isMyProfile ? this.state.profileInfo.id : idInfo),
          name:(isMyProfile ? this.state.profileInfo.name : nameInfo),
          image:(isMyProfile ? this.state.profileInfo.profileImage : imageInfo),
          email:(isMyProfile ? this.state.profileInfo.email : emailInfo),
          birth:(isMyProfile ? this.state.profileInfo.birth : birthInfo),
        },
        memberInfoPopupCondition : !this.state.memberInfoPopupCondition
      });
    } else {
      this.setState({
        memberInfoPopupCondition : !this.state.memberInfoPopupCondition
      });
    }
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
        <MemberInfoPopup
          isMyInfo={this.state.isMyInfo}
          id={this.state.memberInfo.id}
          name={this.state.memberInfo.name}
          image={this.state.memberInfo.image}
          email={this.state.memberInfo.email}
          birth={this.state.memberInfo.birth}
          memberInfoPopupOnOff={this.showUserInfoPopup.bind(this)}
          memberInfoPopupCondition={this.state.memberInfoPopupCondition}
          onClick={function(result, content) {
            if (result === 'success') {
              this.setState({
                alertContent : content,
              }); 
            } else {
              this.setState({
                alertContent : content,
              }); 
            } 
            this.alertPopupOnoff();
            this.loadProfileInfo();
            this.memberSelectEvent('');
          }.bind(this)}
        />
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
          <MemberFrame
            members={this.state.members}
            memberFrameComment={this.state.memberFrameComment}
            memberInfoPopupOnOff={this.showUserInfoPopup.bind(this)}
            memberSearchEvent={function(searchParam) {
              this.memberSelectEvent(searchParam);
            }.bind(this)}
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