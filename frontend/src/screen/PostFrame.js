import React, {Component} from "react";
import Post from "../component/Postbox";
import SearchBox from '../component/SearchBox';
import Postuploadbox from '../component/Postuploadbox';
import Sky from '../image/Sky.png';
import Pic from '../image/Pic.png';
import Taco from '../image/Taco.png';
import '../scss/component.scss';
import '../scss/page.scss';

class PostFrame extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts :[{
        userName:"정의창",
        year:year,
        month:month,
        date:date, 
        hours:hours,
        min:min,
        profileImage:Pic,
        text:"일정입니다", 
        scheduleDate:"22",
        scheduleDay:"화요일",
        scheduleDDay:"2022년 04월 22일",
        scheduleName:"일정이라구요"
      },{
        userName:"권영준",
        year:year, 
        month:month, 
        date:date, 
        hours:hours, 
        min:min,
        profileImage:Taco,
        picture:Pic,
        text:"크림파스타먹고싶다 ㅎㅅㅎ" , 
        scheduleDate:"22",
        scheduleDay:"일요일",
        scheduleDDay:"2022년 02월 22일",
        scheduleName:"밥먹는날"
      },{
        userName:"우현웅",
        year:year, 
        month:month, 
        date:date, 
        hours:hours, 
        min:min,
        profileImage:Sky,
        text:"와!",
      },{
        userName:"정의창",
        year:year, 
        month:month, 
        date:date, 
        hours:hours, 
        min:min,
        profileImage:Sky,
        picture:Sky
      },{
        userName:"권영준",
        year:year, 
        month:month, 
        date:date, 
        hours:hours, 
        min:min,
        profileImage:Taco,
        picture:Taco,
        text:"이게 슬픈문어야!" , 
      },{
        userName:"우현웅",
        year:year, 
        month:month, 
        date:date, 
        hours:hours, 
        min:min,
        profileImage:Sky,
        scheduleDate:"15",
        scheduleDay:"목요일",
        scheduleDDay:"2022년 06월 15일",
        scheduleName:"^^7"        
      }]
    }
  }

  render() {
    return (
      <div>
        <div id="centerFrame" className="centerFrame">
          <SearchBox/>
          <Postuploadbox/>
          {this.state.posts.map((post,index)=>{
            return(
              <Post
              key={index}
              userName={post.userName}
              year={post.year} 
              month={post.month}
              date={post.date} 
              hours={post.hours} 
              min = {post.min}
              profileImage={post.profileImage}
              text={post.text} 
              picture={post.picture} 
              scheduleDate={post.scheduleDate}
              scheduleDay={post.scheduleDay}
              scheduleDDay={post.scheduleDDay}
              scheduleName={post.scheduleName}
            />
            )})}
        </div>
      </div>
    );
  }
};    

//DB 연결후 지울 데이터입니다.
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

export default PostFrame;