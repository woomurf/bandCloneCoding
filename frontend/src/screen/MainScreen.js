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
      selectTab : 'post',
      alertContent : "",
      alertPopupCondition : false,
      confirmEvent : "",
      confirmContent : "",
      confirmPopupCondition : false,
      memberInfoPopupCondition : false,
      isMyInfo : false,
      myId : -1,
      members : [{
        id : "",
        name : "",
        email : "",
        birth : "",
        profileImageUrl : ""
      }],
      memberInfoIndex : 0,
      memberCount : 0,
      memberFrameComment : null
    } 
  }

  async componentDidMount() {
    await this.loadProfileInfo();
    await this.memberSelectEvent('');
  } 

  async loadProfileInfo() {
    await axios.get('/auth/me')
    .then(function(res) {
      this.setState({
        myId:res.data.id
      });
    }.bind(this));
  }

  async memberSelectEvent(searchParam) {
    if (searchParam !== '') {
      await axios.get('/user/search/' + searchParam)
      .then(function(res) {
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
      .then(function(res) {
        this.setState({
          members:res.data,
          memberCount:res.data.length,
          memberFrameComment:"멤버 " + res.data.length
        });
      }.bind(this));
    }
  }

  async deleteUser() {
    axios.delete(`/user/${this.state.myId}`)
    .then(() => {
      this.setState({
        alertContent : "회원 탈퇴가 완료되었습니다.",
      }); 
    })
    .catch(() => {
      this.setState({
        confirmEvent : "",
        alertContent : "회원 탈퇴를 진행하는 도중 오류가 발생했습니다.",
      }); 
    })
    this.alertPopupOnoff();
  }

  onClickForSettingFrame(buttonTitle) {
    switch(buttonTitle) {
      case "로그아웃" :
        this.setState({
          confirmEvent : "Logout",
          confirmContent : "로그아웃 하시겠습니까?"
        });
        this.confirmPopupOnOff();
        break;
      case "밴드 이름 및 커버" :
        break;
      case "밴드 소개글 수정" :
        break;
      case "회원 탈퇴" :
        this.setState({
          confirmEvent : "Withdrawal",
          confirmContent : "회원 탈퇴를 하시겠습니까?"
        });
        this.confirmPopupOnOff();
        break; 
      default :
        alert(buttonTitle);
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
    });
  }

  confirmPopupOnOff() {
    this.setState({ 
      confirmPopupCondition : !this.state.confirmPopupCondition 
    })
  }

  showUserInfoPopup(memberId) {
    if (!this.state.memberInfoPopupCondition) {
      let isMyProfile = (memberId === this.state.myId);
      this.setState({
        isMyInfo : isMyProfile,
        memberInfoIndex : this.state.members.findIndex(m => m.id === memberId),
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
              id = {this.state.myId}
              onClickMyInfo={this.showUserInfoPopup.bind(this)}
              onClickLogout={function() {
                this.setState({
                  confirmEvent : "Logout",
                  confirmContent : "로그아웃 하시겠습니까?"
                });
                this.confirmPopupOnOff();
              }.bind(this)}
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
          memberInfo={this.state.members[this.state.memberInfoIndex]}
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
          alertPopupOnoff={function() {
            this.alertPopupOnoff();
            if (this.state.alertPopupCondition && this.state.confirmEvent === "Withdrawal") {
              this.props.onClick("");
            }
          }.bind(this)}
        />
        <ConfirmPopup
          content={this.state.confirmContent}
          confirmPopupOnOff={this.confirmPopupOnOff.bind(this)}
          confirmPopupCondition={this.state.confirmPopupCondition}
          onClick={function(){
            switch(this.state.confirmEvent) {
              case "Withdrawal" :
                this.deleteUser();
                break;
              case "Logout" :
                this.props.onClick("");
                break;
              default :
                break;
            }
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
            name={this.state.members[this.state.myId].name}
            profileImage={this.state.members[this.state.myId].profileImageUrl}
            onClick={this.onClickForSettingFrame.bind(this)}
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