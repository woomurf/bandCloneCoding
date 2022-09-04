import React, {Component} from "react";
import Emogi from '../image/Emogi.png';
import CommentImage from '../image/Comment.png';
import Schedule from "../component/Schedule";
import axios from "axios";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import CommentList from "./CommentList";
import SeeMorePopup from "../popup/SeeMorePopup";
import ModifyPopup from "../popup/ModifyPopup";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class PostBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditionComment: false,
      modifyPopupCondition : false,
      commentModifyPopupCondition : false
    };
  }

  modifyPopupOnOff(){
    this.setState({
      modifyPopupCondition: !this.state.modifyPopupCondition
    });
  }

  commentModifyPopupOnOff(){
    this.setState({
      commentModifyPopupCondition: !this.state.commentModifyPopupCondition
    });
  }

  commentAreaOnOff(){
    this.setState({
      conditionComment : !this.state.conditionComment
    });
  }

  deletePost = (postId) => {
    axios.delete(`/post/${postId}`)
    .then(res => {
      // do you want delete? => *TODO* confirmPopup create
      this.props.updatePostList();
    })
    .catch(err => {
      this.props.postErrorPopup();
    })
  }

  render() {
    const { post, postErrorPopup, updatePostList } = this.props;
    return (
      <div className="postBox">
        <div className="postHeader">
          <div className="profile">
            <div className="profileImage">
              <img 
                alt="" 
                src={post.user.profileImageUrl || DefaultProfileImage} 
                className="profileImage"
              />
            </div>
            <div className="profileMeta">
              <div className="userName">
                {post.user.name}
              </div>
              <div className="day">
                {post.updatedAt}
              </div>
            </div>
          </div>
          {
            post.isAuthor &&
              <SeeMorePopup
              modifyCommand={this.modifyPopupOnOff.bind(this)}
              deleteCommand={this.deletePost.bind(this)}
              postErrorPopup={postErrorPopup}
              contentId={post.id}
            />
          }
          
        </div>
          <ModifyPopup 
            content={post.content}
            postId={post.id}
            modifyPopupCondition={this.state.modifyPopupCondition}
            updatePostList={updatePostList}
            postErrorPopup={postErrorPopup}
            modifyPopupOnOff={this.modifyPopupOnOff.bind(this)}
          />
        <div className="postBody">
          {post.content && (
            <div className="postLabel">
              {post.content}
            </div>
          )}
          {post.scheduleDay && (
            <Schedule 
              scheduleDate={post.scheduleDate}
              scheduleDay={post.scheduleDay}
              scheduleName={post.scheduleName}
              scheduleDDay={post.scheduleDDay}
            />
          )}
          {/* TODO : 추후 이미 여러장 올릴수있게 할것 */}
          {this.props.picture.map((picture,index)=>{
            return(
              <div className="postPicture" key={index}>
                <img alt="" className="postPicture" src={picture.url}/>
              </div>
          )})}
          
        </div>
        <div className="postFooter">
          <div className="addOn">
            <img alt="" className="Emogi" src={Emogi}/>
            <img 
              alt="" 
              className="Comment" 
              src={CommentImage}
              onClick={
                this.commentAreaOnOff.bind(this)
              }
            />
          </div>
            {this.state.conditionComment && 
              <CommentList
                userName={post.user.name}
                postId={post.id}
                postErrorPopup={postErrorPopup}
              />
            }
        </div>
      </div>
    );
  }
};

export default PostBox;