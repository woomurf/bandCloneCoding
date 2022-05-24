import React, {Component} from "react";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import moment from "moment";
import axios from "axios";
import SeeMorePopup from "../popup/SeeMorePopup";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Comment extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      commentContents : [],
      commentContent:[{
        content:"asd",
        createdAt:"asd"
      }]
    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async getCommentList(){
  //   return axios.get(`post/${this.props.postId}/comments`)
  //     .then(function (res) {
  //       return res.data;
  //     })
  //     .catch(function (error) {
  //       console.error(`${error.name}: ${error.message}`);
  //       return [];
  //     });
  // }

  // async updateCommentList() {
  //   const commentContents = await this.getCommentList();
  //   this.setState({ ...this.state,commentContents });
  //   console.log(this.state.commentContents)
  // }

  // async handleSubmit(e) {
  //   axios.post('/comment', {
  //     content: this.state.value,
  //     postId:this.props.postId,
  //     userId:1
  //   }).then(res => {
  //     this.updateCommentList();
  //     this.setState ({
  //       value:''
  //     })
  //   }).catch(err => {
  //     this.props.postErrorPopup();
  //   })
  //   e.preventDefault();
  // }

  // componentDidMount = async() => {
  //   this.updateCommentList();
  // }

  textRef = React.createRef();

  textResize = () => {
    const textAreaBox = this.textRef.current;
    textAreaBox.style.height = 'auto';
    textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }
  
  render() {
    return (
      <div className="comment">
        {/* {this.state.commentContent.map((commentContents,index) => { */}
            <div className="commentProfileDiv">
              <div className="commentProfile">
                <div className="commentProfileImage">
                  <img 
                    alt="" 
                    src={this.props.profileImage || DefaultProfileImage} 
                    className="commentProfileImage"
                  />
                </div>
                <div className="commentProfileMeta">
                  <div className="CommentUserName">
                    {this.props.userName}
                  </div>
                  <div className="commentContent">
                    {this.state.commentContent.content}
                  </div>
                  <div className="CommentDay">
                    {this.state.commentContent.createdAt}
                  </div>
                </div>
              </div>
              <SeeMorePopup
              //TODO => comment modify popup add
                postErrorPopup={this.props.postErrorPopup}
                updatePostList={this.props.updatePostList}
                postId={this.props.postId}
              />
            </div>
        {/* })} */}
        <div className="commentAreaOutLine">
          <textarea 
            type="text"
            className="postComment"
            ref={this.textRef}
            onKeyUp={this.textResize}
            onKeyDown={this.textResize}
            value={this.state.value}
            onChange={this.handleChange}
            maxLength={3000}
            placeholder="새로운 댓글을 남겨보세요." 
          />            
          <button className="commentUploadBtn"
            onClick={this.handleSubmit}
          >
            게시
          </button>
        </div>
      </div>
    );
  }
};

export default Comment;