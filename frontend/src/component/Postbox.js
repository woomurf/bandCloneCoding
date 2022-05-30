import React, {Component} from "react";
import Emogi from '../image/Emogi.png';
import CommentImage from '../image/Comment.png';
import Schedule from "../component/Schedule";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import Comment from "./Comment";
import SeeMorePopup from "../popup/SeeMorePopup";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'
import ModifyPopup from "../popup/ModifyPopup";

class PostBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditionComment : false,
      modifyPopupCondition : false
    };
  }

  modifyPopupOnOff() {
    this.setState({
      modifyPopupCondition : !this.state.modifyPopupCondition
    });
  }

  commentAreaOnOff() {
    this.setState({
      conditionComment : !this.state.conditionComment
    });
  }

  render() {
    return (
      <div className="postBox">
        <div className="postHeader">
          <div className="profile">
            <div className="profileImage">
              <img 
                alt="" 
                src={this.props.profileImage || DefaultProfileImage} 
                className="profileImage"
              />
            </div>
            <div className="profileMeta">
              <div className="userName">
                {this.props.userName}
              </div>
              <div className="day">
                {this.props.updatedAt}
              </div>
            </div>
          </div>
          <SeeMorePopup
            modifyPopupOnOff={this.modifyPopupOnOff.bind(this)}
            postErrorPopup={this.props.postErrorPopup}
            updatePostList={this.props.updatePostList}
            postId={this.props.postId}
          />
        </div>
        <ModifyPopup 
          content={this.props.content}
          postId={this.props.postId}
          modifyPopupCondition={this.state.modifyPopupCondition}
          updatePostList={this.props.updatePostList}
          postErrorPopup={this.props.postErrorPopup}
          modifyPopupOnOff={this.modifyPopupOnOff.bind(this)}
        />
        <div className="postBody">
          {this.props.content && (
            <div className="postLabel">
              {this.props.content}
            </div>
          )}
          {this.props.scheduleDay && (
            <Schedule 
              scheduleDate={this.props.scheduleDate}
              scheduleDay={this.props.scheduleDay}
              scheduleName={this.props.scheduleName}
              scheduleDDay={this.props.scheduleDDay}
            />
          )}
          {this.props.picture && (
            <div className="postPicture">
              <img alt="" className="postPicture" src={this.props.picture}/>
            </div>
          )}
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
              <Comment
                userName={this.props.userName}
                commnetUpdatedAt={this.props.commnetUpdatedAt}
              />
            }
        </div>
      </div>
    );
  }
};

export default PostBox;