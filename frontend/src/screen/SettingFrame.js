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
          title : "밴드 소개",
          explain : "밴드 주소, 키워드, 소개글을 관리하세요"  
        }, {
          title : "밴드 이름 및 커버"
        }]
      }, {
        headTitle: "밴드 활동 관리",
        arr : [{
          title : "멤버들의 권한 설정",
        }, {
          title : "멤버 탈퇴, 차단 설정",
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
                  onClick={this.props.onClick}>
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
              />
            )
          })}
        </div>
      </div>
    );
  }
};

export default SettingFrame;