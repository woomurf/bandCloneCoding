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
    axios.get('https://4b2d-110-10-225-160.ngrok.io/post/list')
      .then(function(res){
        this.setState({posts:res.data})
        console.log(res.data[0])
        // console.log(this);
      }.bind(this));
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

  async getPostUpdatedAt(){
    const newPost = this.state.posts.map(post=>{//post 라는이름을가진 객체에다가 state.posts배열의 값을 각각 나눠주겠다.
      const updatedAt = post.updatedAt; // updatedAt이라는 상수 에 post.updatedAt을 넣는다
      const time = moment(updatedAt).format("YYYY년 MM월 DD일 hh:mm"); //time이라는 상수에다가 => updatedAt에 moment라이브러리 적용
      post.updatedAt = time; //post.updatedAt은 time의 값을 가지게된다
      return post // post 객체를 newPost에 담기위해서 return하면 newpost에 들어간다
    })
    this.setState({
      post : newPost // state에 post 라고 선언한걸 newPost로 바꾼다
    })
  }
  // object,lifecycle,map,array


  componentDidMount(){ // lifeCycle 에대한 부분 공부좀더할것. 컴포넌트가 마운트 된후에 호출됨
    this.getPostList();
    this.getPostUpdatedAt();
  }

  componentDidUpdate(prevprops,prevstate){ // 갱신이 일어난 직후에 호출 최초렌더링에서는 호출되지않는다. 컴포넌트가 갱신됬을때 dom을 조작하기위해 사용하면 좋다.
    if(prevstate.posts !== this.state.posts){
      this.getPostUpdatedAt();
    }
  }
  
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
