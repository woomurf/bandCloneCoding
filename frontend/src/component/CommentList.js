import React, {Component} from "react";
import moment from "moment";
import axios from "axios";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'
import Comment from './Comment';
import { textResize } from '../util';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      commentsData: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getCommentList(){
    return axios.get(`post/${this.props.postId}/comments`)
      .then(function (res) {
        return res.data.comments;
      })
      .catch(function (error) {
        console.error(`${error.name}: ${error.message}`);
        return [];
      });
  }

  updateCommentList = async() => {
    const commentsData = await this.getCommentList();
    this.setState({ ...this.state, commentsData });
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

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div className="comment">
        {this.state.commentsData.map((comment, index) => {
          return(
            <Comment
              id={comment.id}
              content={comment.content}
              user={comment.user}
              isAuthor={comment.isAuthor}
              createdAt={comment.createdAt}
              postErrorPopup={this.props.postErrorPopup}
            />
        )})}
        <div className="commentAreaOutLine">
          <textarea 
            type="text"
            className="postComment"
            onKeyUp={(e) => textResize(e, '15px')}
            onKeyDown={(e) => textResize(e, '15px')}
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

export default CommentList;