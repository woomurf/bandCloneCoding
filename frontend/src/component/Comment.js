import React, {Component} from "react";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Comment extends Component {

  textRef = React.createRef();

  textResize = () =>{
    const textAreaBox = this.textRef.current;
    textAreaBox.style.height = 'auto';
    textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
  }
  
  render() {
    return (
      <div className="comment">
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