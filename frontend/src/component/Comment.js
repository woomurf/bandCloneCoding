import React, {Component} from "react";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import axios from "axios";
import SeeMorePopup from "../popup/SeeMorePopup";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Comment extends Component {
  constructor(props){
    super(props);
    this.state = {
      // value:'',
      comments :[ {
        commnetUpdatedAt: "2022년 02월 22일 10:22",
        value:"히히몰루"
      }, {
        commnetUpdatedAt: "2022년 02월 22일 10:22",
        value:"히히히히 몰루우짤몰루"
      } ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  textRef = React.createRef();

  textResize = () => {
    const textAreaBox = this.textRef.current;
    textAreaBox.style.height = 'auto';
    textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
  }

  handleSubmit = async (e) => {
    axios.post(`/post/${this.props.postId}`,{
      comments:this.state.comments.comment
    }
    ).then(res => {
      this.props.updatePostList(); 
      this.props.modifyPopupOnOff();
    }).catch(err => {
      this.props.postErrorPopup();
    })
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }
  
  render() {
    return (
      <div className="comment">
        {this.state.comments.map((commentContent,i)=>
          <div className="commentProfileDiv"key={i}>
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
                  {commentContent.value}
                </div>
                <div className="CommentDay">
                  {commentContent.commnetUpdatedAt}
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
        )}
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
          <button className="commentUploadBtn"  onClick={this.handleSubmit}>
            게시
          </button>
        </div>
      </div>
    );
  }
};

export default Comment;