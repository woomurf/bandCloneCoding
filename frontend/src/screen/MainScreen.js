import React, {Component} from "react";
import TextButton from '../component/TextButton';
import PostFrame from "./PostFrame";
import CalendarFrame from "./CalendarFrame";
import MemberFrame from "./MemberFrame";
import '../scss/page.scss';

class MainScreen extends Component {
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
                selectYn={true}
                onClick={function(){
                  this.onChangeFrame("");
                }.bind(this)}
              />
              <TextButton
                label="캘린더"
                className="mt4"
                selectYn={false}
                onClick={function(){
                  this.onChangeFrame("calendar");
                }.bind(this)}
              />
              <TextButton
                label="멤버"
                className="mt4"
                selectYn={false}
                onClick={function(){
                  this.onChangeFrame("member");
                }.bind(this)}
              />
            </div>
          </div>
        </div>
        <div>
          라우트 말고 텝으로구현해야해 바보야
            {/* <Routes>
              <Route path="/post" element={
                <PostFrame/>
              }/>
              <Route path="/calendar" element={
                <CalendarFrame/>
              }/>
              <Route path="/member" element={
                <MemberFrame/>
              }/>
            </Routes> */}
        </div>
      </div>
    );
  }
};

export default MainScreen;