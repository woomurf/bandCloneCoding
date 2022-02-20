import React, {Component} from "react";
import TextButton from '../component/TextButton';
import PostFrame from "./PostFrame";
import CalendarFrame from "./CalendarFrame";
import MemberFrame from "./MemberFrame";
import '../scss/page.scss';

class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectTab:'post'
    }
  }

  render() {
    return (
      <div>
        <div id="pageHeader">
          {/* 프로필 및 설정 있는 부분 */}
          <div id="pageTopBar">
            <div id="menuTab" className="mt4">
              <TextButton
                label="게시글"
                selectYn={this.state.selectTab === "post" ? true : false}
                onClick={function(){
                  this.onChangeTab("post");
                }.bind(this)}
              />
              <TextButton
                label="캘린더"
                selectYn={this.state.selectTab === "calendar" ? true : false}
                onClick={function(){
                  this.onChangeTab("calendar");
                }.bind(this)}
              />
              <TextButton
                label="멤버"
                selectYn={this.state.selectTab === "member" ? true : false}
                onClick={function(){
                  this.onChangeTab("member");
                }.bind(this)}
              />
            </div>
          </div>
        </div>
        <div>
          {this.getSelectTab()}
        </div>
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
        tabPage = <PostFrame/>;
        break;
      case 'calendar':
        tabPage = <CalendarFrame/>;
        break;
      case 'member':
        tabPage = <MemberFrame/>;
        break;
      default:
        console.log('tab select error');
        break;
    }
    return tabPage;
  }
};

export default MainScreen;