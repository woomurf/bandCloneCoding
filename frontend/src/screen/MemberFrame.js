import React, {Component} from "react";
import SearchBox from "../component/SearchBox";
import MemberBox from "../component/MemberBox";
import '../scss/page.scss';
import axios from "axios";
import MemberInfoPopup from "../popup/MemberInfoPopup"

class MemberFrame extends Component {
  constructor(props){
    super(props);
    this.state = {
      memberInfoPopupCondition : false,
      memberInfo : {
        name : "",
        image : "",
        email : "",
        birth : ""
      },
      profileInfo : {
        name : "퉤스트",
        image : "",
        email : "test@test.te.st",
        birth : "19000101"
      },
      members :[]
    }
  }

  showUserInfoPopup(infoSource, nameInfo, imageInfo, emailInfo, birthInfo) {
    this.setState({
      memberInfo : {
        name : (infoSource === "member" ? nameInfo : this.state.profileInfo.name),
        image : (infoSource === "member" ? imageInfo : this.state.profileInfo.image),
        email : (infoSource === "member" ? emailInfo : this.state.profileInfo.email),
        birth : (infoSource === "member" ? birthInfo : this.state.profileInfo.birth),
      },
      memberInfoPopupCondition : !this.state.memberInfoPopupCondition
    });
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

  async componentDidMount(){
    await axios.get('/user/list')
    .then(function(res){
      this.setState({members:res.data});
    }.bind(this));
  }

  
  async memberSearchEvent(searchParam){
    if (searchParam !== '') {
      await axios.get('/user/' + searchParam)
      .then(function(res){
        const rtnUser = res.data.user;
        if (rtnUser !== null) {
          this.setState({
            members:[{
              name:rtnUser.name,
              email:rtnUser.email,
              birth:rtnUser.birth,
              profileImage:rtnUser.profileImage
            }]
          });
        } else {
          this.setState({
            members:[]
          });
        }
      }.bind(this));
    } else {
      await axios.get('/user/list')
      .then(function(res){
        this.setState({members:res.data});
      }.bind(this));
    }
  }


  render() {
    return (
      <div>
        <div id="centerFrame">
          <SearchBox
            label="멤버 검색"
            onClick={function(searchParam) {
              this.memberSearchEvent(searchParam);
            }.bind(this)}
          />
          {/* SearchBox로 멤버 검색 기능 구현 */}
          <div className="memberFrameBody">
            <div className="memberHeader">
              멤버 {this.state.members.length}
            </div>
            <div className="settingLine"/>
            {this.state.members.map((member,index) => {
              return (
                <MemberBox
                  key={index}
                  name={member.name}
                  profileImage={member.profileImage}
                  email={member.email}
                  birth={member.birth}
                  lastIndexYn={this.state.members.length === index + 1}
                  onClickProfileInfo={this.showUserInfoPopup.bind(this)}
                />
              )
            })}
            <MemberInfoPopup
              name={this.state.memberInfo.name}
              image={this.state.memberInfo.image}
              email={this.state.memberInfo.email}
              birth={this.state.memberInfo.birth}
              memberInfoPopupOnOff={this.showUserInfoPopup.bind(this)}
              memberInfoPopupCondition={this.state.memberInfoPopupCondition}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default MemberFrame;