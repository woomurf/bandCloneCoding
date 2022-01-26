import React, {Component} from "react";
import TextButton from '../component/TextButton';
import '../scss/page.scss';

class CalenderScreen extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div id="PageHeader">
          {/* 프로필 및 설정 있는 부분 */}
          <div id="PageTopBar">
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
                selectYn={true}
                onClick={function(){
                  // this.props.onClick("calender");
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
        <div id="PageBody">
          <div id="leftFrame">
            <div className="Box" onClick={function(e){
              alert("로그인화면으로");
              this.props.onClick("");
            }.bind(this)}/>
          </div>
          <div id="centerFrame">
            <div id="postList">
              <div className="postBox"/>
              <div className="searchBox">
                아무튼 여기가 캘린더
              </div>
              <div className="postBox"/>
              <div className="postBox"/>
              <div className="postBox"/>
              <div className="postBox"/>
            </div>
          </div>
          <div id="rightFrame">
            <div className="Box"/>
          </div>
        </div>
      </div>
    );
  }
};

export default CalenderScreen;