import React, {Component} from "react";
import PostBox from "../component/Postbox";
import SearchBox from '../component/SearchBox';
import Postuploadbox from '../component/Postuploadbox';
import moment from "moment"
import axios from "axios";
import '../scss/component.scss';
import '../scss/page.scss';

class PostFrame extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts : []
    }
  }

  async getPostList() {
    return axios.get('/post/list')
      .then(function (res) {
        console.log(res.data)
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

  async componentDidMount(){
    this.updatePostList();
  }

  componentDidUpdate(prevprops, prevState) {
    if(prevState.posts !== this.state.posts){
      this.getPostUpdatedAt();
    }
  }

  render() {
    return (
      <div>
        <div id="centerFrame" className="centerFrame">
          <SearchBox
            label="글 내용, #태그, @작성자 검색"
          />
          <Postuploadbox 
            updatePostList={this.updatePostList.bind(this)} 
            postErrorPopup={this.props.postErrorPopup.bind(this)}
          />
          {this.state.posts.map((post,index)=>{
            return(
              <PostBox
              key={index}
              post={post}
              postErrorPopup={this.props.postErrorPopup}
              updatePostList={this.updatePostList.bind(this)}
            />
          )})}
        </div>
      </div>
    );
  }
};    

export default PostFrame;