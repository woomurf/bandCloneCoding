import React, {Component} from "react";
import PostBox from "../component/Postbox";
import SearchBox from '../component/SearchBox';
import Postuploadbox from '../component/Postuploadbox';
import Pic from '../image/Pic.png';
import '../scss/component.scss';
import '../scss/page.scss';
import moment from "moment"
import axios from "axios";

class PostFrame extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts :[ {
        user:{name:"sampleName"},
        content:"일정입니다",
        updatedAt:"2022년 02월 22일 10:22",
        scheduleDate:"22",
        scheduleDay:"화요일",
        scheduleDDay:"2022년 04월 22일",
        scheduleName:"일정이라구요"
      },{
        user:{name:"sampleName"},
        profileImage:Pic,
        updatedAt:"2022년 02월 22일 10:22",
        content:"일정입니다",
      },{
        user:{name:"sampleName"},
        profileImage:Pic,
        updatedAt:"2022년 02월 22일 10:22",
        content:"일정입니다",
        picture:Pic
      },{
        user:{name:"sampleName"},
        profileImage:Pic,
        updatedAt:"2022년 02월 22일 10:22",
        content:"일정입니다",
      },{
        user:{name:"sampleName"},
        profileImage:Pic,
        updatedAt:"2022년 02월 22일 10:22",
        content:"일정입니다",
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

  async updatePostList(){
    const posts = await this.getPostList();
    this.setState({ ...this.state, posts });
  }

  async getPostUpdatedAt(){
    const newPost = this.state.posts.map(post=> {
      const updatedAt = post.updatedAt;
      const time = moment(updatedAt).format("YYYY년 MM월 DD일 hh:mm");
      post.updatedAt = time;
      return post
    })
    this.setState({
      post : newPost
    })
  }

  // async componentDidMount(){
  //   this.updatePostList();
  // }

  // 더보기팝업 임시조치

  componentDidUpdate(prevprops, prevState) {
    if(prevState.posts !== this.state.posts){
      this.getPostUpdatedAt();
    }
  }
  
  render() {
    return (
      <div>
        <div id="centerFrame" className="centerFrame">
          <SearchBox/>
          <Postuploadbox 
            updatePostList={this.updatePostList.bind(this)} 
            postErrorPopup={this.props.postErrorPopup.bind(this)}
          />
          {this.state.posts.map((post,index)=>{
            return(
              <PostBox
              key={index}
              userName={post.user.name}
              updatedAt={post.updatedAt}
              profileImage={post.profileImage}
              content={post.content} 
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


export default PostFrame;
