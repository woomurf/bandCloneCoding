import React, {Component} from "react";
import TextButton from '../component/TextButton';
import '../scss/page.scss';
import Main_Lside from '../component/Main_Lside';
import Main_Rside from '../component/Main_Rside';
import Sky from '../image/Sky.png';
import Pic from '../image/Pic.png';
import Taco from '../image/Taco.png';

class BandSettingScreen extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div id="pageHeader">
          {/* 프로필 및 설정 있는 부분 */}
          <div id="pageTopBar">
            <div id="menuTab">
              <TextButton
                label="게시글"
                className="mt4"
                selectYn={false}
                onClick={function(){
                  this.props.onClick("post");
                }.bind(this)}
              />
              <TextButton
                label="캘린더"
                className="mt4"
                selectYn={false}
                onClick={function(){
                  this.props.onClick("calender");
                }}
              />
              <TextButton
                label="멤버"
                className="mt4"
                selectYn={false}
                onClick={function(){
                  this.props.onClick("member");
                }.bind(this)}
              />
            </div>
          </div>
        </div>
        <div id="pageBody">

          <Main_Lside
            onClick={this.props.onClick}
            bandImage={Sky}
            bandName={"우리의밴드이름은?"}
            memberCount={"멤버 3"}
            bandIntroduce={"몰?루"}
            />

          <div id="centerFrame">
            <div id="settingList">
                <div className="settingBox">
                    암튼 설정 머시기
                </div>
            </div>
          </div>

          <Main_Rside 
          //DB 연결이되면 수정
          pictures = {[Taco,Sky,Pic,Sky,Pic,Sky,Pic,Sky,Pic,Sky,Pic,Sky,Pic]}
          />
        </div>
      </div>
    );
  }
};


export default BandSettingScreen;