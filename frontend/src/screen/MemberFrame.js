import React, {Component} from "react";
import SearchBox from "../component/SearchBox";
import MemberBox from "../component/MemberBox";
import MemberInfoPopup from "../popup/MemberInfoPopup";
import '../scss/page.scss';
import axios from "axios";

class MemberFrame extends Component {
  constructor(props){
    super(props);
    this.state = {
      memberInfo :{
        name:"",
        image:"",
        birthday:""
      },
      members :[{
        name:"권영준",
        birthday:"19961000"
      }, {
        name:"우현웅",
        birthday:"19961100"
      }, {
        name:"정의창",
        birthday:"19961200"
      }, {
        name:"가상인물",
        birthday:"19480202"
      }, {
        name:"가장인물",
        birthday:"19430204"
      }, {
        name:"가정인물",
        birthday:"19520207"
      }]
    }
  }

  async componentDidMount(){
    await axios.get('/member/list')
    .then(function(res){
      console.log(res.data[0]);
      this.setState({member:res.data});
    }.bind(this));
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
                  birthday={member.birthday}
                  lastIndexYn={this.state.members.length === index + 1}
                  onClick={function(nameInfo, imageInfo, birthdayInfo) {
                    this.setState({
                      memberInfo:{
                        name:nameInfo,
                        image:imageInfo,
                        birthday:birthdayInfo
                      }
                    }); 
                    this.showMemberInfoPopup();
                  }.bind(this)}
                />
              )
            })}
          </div>
        </div>
        <MemberInfoPopup
          name={this.state.memberInfo.name}
          image={this.state.memberInfo.image}
          birthday={this.state.memberInfo.birthday}
        />
      </div>
    );
  }

  showMemberInfoPopup() {
    const memberInfoPopup = document.querySelector('#memberInfoPopup');
    memberInfoPopup.classList.remove('hide');
  }
};

export default MemberFrame;