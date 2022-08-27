import React, {Component} from "react";
import '../scss/page.scss';
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import SettingBody from "../component/SettingBody";


class SettingFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informations : [{
        headTitle : "밴드 정보 관리",
        arr : [{              
          title : "밴드 정보 수정",
          explain : "밴드 정보를 수정합니다.",
          button : "수정"
        }]
      }, {
        headTitle: "활동 관리",
        arr : [{
          title : "회원 탈퇴",
          explain : "다시 한번 생각해봅시다.",
          button : "탈퇴"
        }]
      }]            
    }
  }

  render() {
    return (
      <div>
        <div id="centerFrame">
          <div className="settingHeader">
            <div className="settingProfileDiv">
              <div className="settingProfile">
                <div className="settingPageProfileImage">
                  <img alt="" src={this.props.profileImage || DefaultProfileImage} className="settingPageProfileImage"/>
                </div>
                <div className="settingPageUserName">
                  {this.props.name}
                </div>
              </div>
              <div className="settingChangeButton">
                <button className="settingButton" 
                  onClick={this.props.onClick.bind(this, "로그아웃")}>
                  로그아웃
                </button>
              </div>
            </div>
          </div>

          {this.state.informations.map((info,i)=>{
            return (
              <SettingBody
                key={i}
                headTitle={info.headTitle}
                informations={info.arr}
                onClick={this.props.onClick}
              />
            )
          })}
        </div>
      </div>
    );
  }
};

export default SettingFrame;