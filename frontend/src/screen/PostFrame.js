import React, {Component} from "react";
import Post from "../component/Postbox";
import SearchBox from '../component/SearchBox';
import Postuploadbox from '../component/Postuploadbox';
import Sky from '../image/Sky.png';
import Pic from '../image/Pic.png';
import Taco from '../image/Taco.png';
import '../scss/component.scss';
import '../scss/page.scss';
import moment from 'moment'
import axios from "axios";

class PostFrame extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts :[ {
        user:{name:"sampleName"},
        // profileImage:Pic,
        content:"일정입니다",
        updatedAt:Date(),
        scheduleDate:"22",
        scheduleDay:"화요일",
        scheduleDDay:"2022년 04월 22일",
        scheduleName:"일정이라구요"
      },{
        user:{name:"sampleName"},
        profileImage:Pic,
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
  // async getPostUpdatedAt(){
  //   const newPost = [];
  //   for(let i = 0; i < this.state.posts.length; i++){
  //     const post = this.state.posts[i];
  //     const updatedAt = post.updatedAt;
  //     const time = moment(updatedAt).format('YYYY년 MM월 DD일 hh:mm');
  //     post.updatedAt = time;
  //     newPost.push(post);
  //   }
  //   this.setState({
  //     post : newPost
  //   })
  // }

  async componentDidMount(){
    const posts = await this.getPostList();
    this.setState({ ...this.state, posts });
  }
  // object,lifecycle,map,array

  // 필요없음.
  // componentDidMount(){ // lifeCycle 에대한 부분 공부좀더할것. 컴포넌트가 마운트 된후에 호출됨
  //   this.getPostList();
  //   this.getPostUpdatedAt();
  // }

  // componentDidUpdate(prevprops,prevstate){ // 갱신이 일어난 직후에 호출 최초렌더링에서는 호출되지않는다. 컴포넌트가 갱신됬을때 dom을 조작하기위해 사용하면 좋다.
  //   if(prevstate.posts !== this.state.posts){
  //     this.getPostUpdatedAt();
  //   }
  // }
  
  render() {
    return (
      <div>
        <div id="centerFrame" className="centerFrame">
          <SearchBox/>
          <Postuploadbox getPostList={this.getPostList}/>
          {this.state.posts.map((post,index)=>{
            return(
              <Post
              key={index}
              userName={post.user.name}
              updatedAt={post.updatedAt}
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


export default PostFrame;
