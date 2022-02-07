import React, {Component} from "react";
import Post from "../component/Postbox";
import SearchBox from '../component/SearchBox';
import Postuploadbox from '../component/Postuploadbox';
import TextButton from '../component/TextButton';
import Main_Lside from '../component/Main_Lside';
import Main_Rside from '../component/Main_Rside';
import Sky from '../image/Sky.png';
import Pic from '../image/Pic.png';
import Taco from '../image/Taco.png';
import '../scss/component.scss';
import '../scss/page.scss';

class PostScreen extends Component {
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
                selectYn={true}
                onClick={function(){
                  // this.props.onClick("post");
                }}
              />
              <TextButton
                label="캘린더"
                className="mt4"
                selectYn={false}
                onClick={function(){
                  this.props.onClick("calender");
                }.bind(this)}
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
          <div id="centerFrame" className="centerFrame">
            <SearchBox/>
            <Postuploadbox/>
            <Post 
            userName="권영준" 
            year={year} month={month} date={date} hours={hours} min = {min}
            profileImage={Taco}
            text="크림파스타먹고싶다 ㅎㅅㅎ" 
            picture={Pic} 
            scheduleDate={"22"}
            scheduleDay={"일요일"}
            scheduleDDay={"2022년 02월 22일"}
            scheduleName={"밥먹는날"}
            />

            <Post 
            userName="우현웅" 
            year={year} month={month} date={date} hours={hours} min = {min}
            profileImage={Sky}
            text="와!" 
            />

            <Post 
            userName="정의창" 
            year={year} month={month} date={date} hours={hours} min = {min}
            profileImage={Pic}
            text="일정입니다" 
            scheduleDate={"22"}
            scheduleDay={"화요일"}
            scheduleDDay={"2022년 04월 22일"}
            scheduleName={"일정이라구요"}
            />

            <Post 
            userName="권영준" 
            year={year} month={month} date={date} hours={hours} min = {min}
            profileImage={Taco}
            text="이게 슬픈문어야!" 
            picture={Taco} 
            />

            <Post 
            userName="정의창" 
            year={year} month={month} date={date} hours={hours} min = {min}
            profileImage={Pic}
            picture={Sky}
            />

            <Post 
            userName="우현웅" 
            year={year} month={month} date={date} hours={hours} min = {min}
            profileImage={Sky}
            scheduleDate={"15"}
            scheduleDay={"목요일"}
            scheduleDDay={"2022년 03월 15일"}
            scheduleName={"^^7"}
            /> 

          </div>
          <Main_Rside
          pictureCollect={Taco}
          pictureCollect1={Sky}
          pictureCollect2={Pic}
          pictureCollect3={Sky}
          pictureCollect4={Taco}
          pictureCollect5={Pic}
          pictureCollect6={Sky}
          pictureCollect7={Taco}
          pictureCollect8={Pic}
          />
        </div>
      </div>
    );
  }
};    


var now = new Date();
var year = now.getFullYear();
var month = now.getMonth();
month = month+1;

if(month<10){
  month = "0" + month
}
var date = now.getDate();
if(date<10){
  date = "0"+date
}
var hours = now.getHours();
if(hours<10){
  hours = "0"+hours
}
var min = now.getMinutes();
if(min<10){
  min = "0"+min
}

export default PostScreen;