import React, {Component} from "react";
import '../scss/page.scss';
import '../scss/calendar.css';
import Sky from '../image/Sky.png';
import SettingBody from "../component/SettingBody";

class SettingFrame extends Component {
  constructor(props){
    super(props);
    this.state = {

        informations:[{
            headTitle: "밴드 정보 관리",
            arr : [{              
              title : "밴드 소개",
              explain : "밴드 주소, 키워드, 소개글을 관리하세요"  
            },{
              title : "밴드 이름 및 커버"
              }
            ]
            },{
              headTitle: "밴드 활동 관리",
              arr : [{              
                title : "맴버 그룹관리",
            },{
                title : "멤버들의 권한 설정",
            },{
                title : "멤버 탈퇴, 차단 설정",
            },{
                title : "밴드관리 활동 내역",
            }]
            },{
              headTitle:"밴드 메뉴 관리",
              arr : [{
                title:"대표 태그 설정",
                explain:"설정된 대표태그를 넣고 글을 쓰면,같은 태그가 입력된 글들을 모아 볼 수 있습니다"
              },{
                title:"글, 사진, 동영상 지정 설정"
              }]
            }
        ]  
            
      }

  }

  render() {
    return (
      <div id="centerFrame">
        <div className="settingBox">

          <div className="settingHeader">
            <div className="settingProfileDiv">
              <div className="settingProfile">
                <div className="settingPageProfileImage">
                  <img alt="" src={Sky} id="settingPageProfileImage"/>
                </div>
                <div className="settingPageUserName">
                  권영준
                </div>
             </div>
              <div className="settingChangeButton">
                <button className="settingButton">로그아웃</button>
              </div>
            </div>
          </div>

          {this.state.informations.map((info,i)=>{
            console.log(info)
            return(
              <SettingBody
              ket={i}
              headTitle={info.headTitle}
              arr={info.arr}
              />
            )
          })}
        </div>
      </div>
    );
  }
};

export default SettingFrame;