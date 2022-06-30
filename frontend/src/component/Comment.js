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
      modifyCommentValue:'',
      commentsData:[],
      seeMorePopupCondition: true ,
      modifyCommentId: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange_2 = this.handleChange_2.bind(this);
  }

  async getCommentList(){
    return axios.get(`post/${this.props.postId}/comments`)
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.error(`${error.name}: ${error.message}`);
        return [];
      });
  }

  updateCommentList = async() => {
    const commentsData = await this.getCommentList();
    this.setState({ ...this.state, commentsData:commentsData.comments });
  }

  async getCommentcreatedAt(){
    const newComment = this.state.commentsData.map(comment => {
      const createdAt = comment.createdAt;
      const time = moment(createdAt).format("YYYY년 MM월 DD일 hh:mm");
      comment.createdAt = time;
      return comment
    })
    this.setState({
      comment : newComment
    })
  }

  async handleSubmit(e) {
    axios.post('/comment', {
      content: this.state.value,
      postId:this.props.postId,
      userId:1
    }).then(res => {
      this.updateCommentList();
      this.setState ({
        value:''
      })
    }).catch(err => {
      this.props.postErrorPopup();
    })
    e.preventDefault();
  }

  componentDidUpdate(prevprops, prevState) {
    if(prevState.commentsData !== this.state.commentsData){
      this.getCommentcreatedAt();
    }
  }

  componentDidMount = async() => {
    this.updateCommentList();
  }

  textRef = React.createRef();
  textRef_2 = React.createRef();

  textResize = () => {
    const textAreaBox = this.textRef.current;
    textAreaBox.style.height = 'auto';
    textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleChange_2(e) {
    this.setState({modifyCommentValue: e.target.value});
  }
  
  deleteComment = async(commentId) => {
    axios.delete(`/comment/${commentId}`)
    .then(res => {
      this.updateCommentList();
    })
    .catch(err => {
      this.props.postErrorPopup();
    })
  }

  modifyComment = async(commentid) =>{
    axios.put(`/comment/${commentid}`,{
      content: this.state.modifyCommentValue
    })
    .then(res =>{
      this.updateCommentList();
      this.modifyCommentId();
    })
    .catch(err =>{
      this.props.postErrorPopup();
    })
  }

  modifyCommentId = (modifyCommentId) =>{
    this.setState({
      modifyCommentId : modifyCommentId
    })
  }

  seeMorePopupShowHide = () =>{
    this.setState({
      seeMorePopupCondition : !this.state.seeMorePopupCondition
    })
  }

  //Todo modiftyComment create
  
  render() {
    return (
      <div className="comment">
        {this.state.commentsData.map((comment,index) => {
          return(
            <div className="commentProfileDiv" key={index}>
              <div className="commentProfile">
                <div className="commentProfileImage">
                  <img 
                    alt="" 
                    src={this.props.profileImage || DefaultProfileImage} 
                    className="commentProfileImage"
                  />
                </div>
                <div className="commentProfileMeta">
                  {this.state.modifyCommentId === comment.id ? 
                    <div className="commentContent">
                      <div className="commentAreaOutLine_2">
                        <textarea 
                          type="text"
                          className="postComment_2"
                          ref={this.textRef}
                          // onKeyUp={this.textResize}
                          // onKeyDown={this.textResize}
                          value={this.state.modifyCommentValue}
                          onChange={this.handleChange_2}
                          maxLength={3000}
                        />            
                        <button className="modifyCommentUploadBtn"
                          onClick={this.modifyComment.bind(this,comment.id)}
                        >
                          게시
                        </button>
                      </div>
                    </div>
                    : 
                    <div>
                    <div className="CommentUserName">
                      {this.props.userName}
                    </div>
                    <div className="commentContent">
                      {comment.content}
                    </div>
                    <div className="CommentDay">
                      {comment.createdAt}
                    </div>
                    </div>
                  }
                </div>
              </div>
              {this.state.seeMorePopupCondition &&
                <SeeMorePopup
                  modifyCommand={this.modifyCommentId.bind(this)}
                  deleteCommand={this.deleteComment.bind(this)}
                  contentId={comment.id}
                  seeMorePopupShowHide = {this.seeMorePopupShowHide}
                  postErrorPopup={this.props.postErrorPopup}
                  updateCommentList={this.updateCommentList}
                />
              }
            </div>
        )})}
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