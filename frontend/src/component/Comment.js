import React, {Component} from "react";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import SeeMorePopup from "../popup/SeeMorePopup";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Comment extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments :[ {
        user:{name:"sampleName"},
        commnetUpdatedAt: "04월 23일",
        comment:"히히몰루"
      }, {
        user:{name:"sampleName"},
        commnetUpdatedAt: "04월 23일",
        comment:"히히몰루"
      } ]
    }
  }


  textRef = React.createRef();

  textResize = () =>{
    const textAreaBox = this.textRef.current;
    textAreaBox.style.height = 'auto';
    textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
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
                  {commentContent.comment}
                </div>
                <div className="CommentDay">
                  {commentContent.commnetUpdatedAt}
                </div>
              </div>
            </div>
            <SeeMorePopup/>
          </div>
        )}
        <div className="commentAreaOutLine">
          <textarea 
            type="text"
            className="postComment"
            ref={this.textRef}
            onKeyUp={this.textResize}
            onKeyDown={this.textResize}
            maxLength={3000}
            placeholder="새로운 댓글을 남겨보세요." 
          />            
          <button className="commentUploadBtn">
            게시
          </button>
        </div>
      </div>
    );
  }
};

export default Comment;