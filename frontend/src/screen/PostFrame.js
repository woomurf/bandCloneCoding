import React, {Component} from "react";
import Post from "../component/Postbox";
import SearchBox from '../component/SearchBox';
import Postuploadbox from '../component/Postuploadbox';
import Sky from '../image/Sky.png';
import Pic from '../image/Pic.png';
import Taco from '../image/Taco.png';
import '../scss/component.scss';
import '../scss/page.scss';
import axios from "axios";

class PostFrame extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts :[ {
        user:{name:"sampleName"},
        // profileImage:Pic,
        content:"일정입니다",
        today:time,
        scheduleDate:"22",
        scheduleDay:"화요일",
        scheduleDDay:"2022년 04월 22일",
        scheduleName:"일정이라구요"
      }
      ]
    }
  }

  async getPostList() {
    return axios.get('/post/list')
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.error(`${error.name}: ${error.message}`);
        return [];
      });
  }

  async componentDidMount(){
    const posts = await this.getPostList();
    this.setState({ ...this.state, posts });
  }

  // 이미지 넣을때 {post.user.profileImage}||디폴트 이미지

  //life sycle 찾아보기
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
              userName={post.user.name}
              today={post.today}
              profileImage={post.profileImage}
              text={post.content} 
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

const moment = require('moment');
const today = moment();
const time = today.format('YYYY년 MM월 DD일 hh:mm')

export default PostFrame;
