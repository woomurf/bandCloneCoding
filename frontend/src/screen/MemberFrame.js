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
      conditionMemberInfoPopup : false,
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
      members :[{
        name:"권영준",
        email:"dudwns@gjrn.gjtkd",
        birthday:"19960900"
      }, {
        name:"우현웅",
        email:"gusdnd@gjrn.gjtkd",
        birthday:"19961100"
      }, {
        name:"정의창",
        email:"dmlckd@gjrn.gjtkd",
        birthday:"19961200"
      }, {
        name:"가상인물",
        email:"rktkd@gjrn.gjtkd",
        birthday:"19480202"
      }, {
        name:"가장인물",
        email:"rkwkd@gjrn.gjtkd",
        birthday:"19430204"
      }, {
        name:"가정인물",
        email:"rkwjd@gjrn.gjtkd",
        birthday:"19520207"
      }]
    }
  }

  showUserInfoPopup(infoSource, nameInfo, imageInfo, emailInfo, birthdayInfo) {
    this.setState({
      memberInfo:{
        name:(infoSource === "member" ? nameInfo : this.state.profileInfo.name),
        image:(infoSource === "member" ? imageInfo : this.state.profileInfo.image),
        email:(infoSource === "member" ? emailInfo : this.state.profileInfo.email),
        birthday:(infoSource === "member" ? birthdayInfo : this.state.profileInfo.birthday),
      },
      conditionMemberInfoPopup: !this.state.conditionMemberInfoPopup
    });
  }

  componentWillUnmount() {
    // 로그아웃 시 프로필 정보 초기화
    this.setState({
      profileInfo:{
        name:"",
        image:"",
        email:"",
        birthday:""
      }
    });
  }

  async componentDidMount(){
    await axios.get('/user/list')
    .then(function(res){
      console.log(res.data[0]);
      this.setState({member:res.data});
    }.bind(this));

    this.setState({
      profileInfo:{
        name:"정의창",
        image:"",
        email:"zvzvz@zvzv.zv",
        birthday:"19961213"
      }
    });
  }

  render() {
    return (
      <div>
        <div id="centerFrame">
          <SearchBox
            label="멤버 검색"
          />
          {/* SearchBox로 멤버 검색 기능 구현 */}
          <div className="memberFrameBody">
            <div className="memberHeader">
              멤버 {this.state.members.length}
            </div>
            <div className="settingLine"/>
            {this.state.members.map((member,index) => {
              return(
                <MemberBox
                  key={index}
                  name={member.name}
                  profileImage={member.profileImage}
                  email={member.email}
                  birthday={member.birthday}
                  lastIndexYn={this.state.members.length === index + 1}
                  onClickProfileInfo={this.showUserInfoPopup.bind(this)}
                />
              )
            })}
            {this.state.conditionMemberInfoPopup &&
              <MemberInfoPopup
                name={this.state.memberInfo.name}
                image={this.state.memberInfo.image}
                email={this.state.memberInfo.email}
                birthday={this.state.memberInfo.birthday}
                showUserInfoPopup={this.showUserInfoPopup.bind(this)}
              />
            }
          </div>
        </div>
      </div>
    );
  }
};

export default MemberFrame;