import { useState } from 'react';
import axios from 'axios';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'
import SeeMorePopup from "../popup/SeeMorePopup";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import { textResize } from '../util';

const Comment = ({ id, content, user, isAuthor, createdAt, postErrorPopup }) => {
  const [ oldContent, setOldContent ] = useState(content);
  const [ newContent, setNewContent ] = useState(oldContent);
  const [ isModify, setIsModify ] = useState(false);

  const updateContent = (e) => {
    setNewContent(e.target.value);
  }

  const modifyComment = async (commentId, content) =>{
    axios.put(`/comment/${commentId}`,{ content })
    .then(() => {
      setOldContent(content);
    })
    .catch(err => {
      console.error(err);
      this.props.postErrorPopup();
    })
  }

  const deleteComment = async (commentId) => {
    axios.delete(`/comment/${commentId}`)
    .catch(err => {
      console.error(err);
      this.props.postErrorPopup();
    })
  }

  return (
    <div className="commentProfileDiv" key={id}>
      <div className="commentProfile">
        <div className="commentProfileImage">
          <img 
            alt=""
            src={user.profileImageUrl || DefaultProfileImage} 
            className="commentProfileImage"
          />
        </div>
        <div className="commentProfileMeta">
          {isModify ? 
            <div className="commentContent">
              <div className="commentAreaOutLine_2">
                <textarea 
                  type="text"
                  className="postComment_2"
                  onKeyUp={(e) => textResize(e, '15px')}
                  onKeyDown={(e) => textResize(e, '15px')}
                  value={newContent}
                  onChange={updateContent}
                  maxLength={3000}
                />
                <div className="commentModifyBtns">
                  <button className="modifyCommentUploadBtn"
                    onClick={() => {
                      modifyComment(id, newContent);
                      setIsModify(false);
                    }}
                  >
                    게시
                  </button>
                  <button className="modifyCommentUploadBtn"
                    onClick={() => {
                      setNewContent(oldContent);
                      setIsModify(false);
                    }}
                  >
                    취소
                  </button>
                </div>       
                
              </div>
            </div>
            : 
            <div>
              <div className="CommentUserName">
                {user.name}
              </div>
              <div className="commentContent">
                {oldContent}
              </div>
              <div className="CommentDay">
                {createdAt}
              </div>
            </div>
          }
        </div>
      </div>
      {(isAuthor && !isModify) &&
        <SeeMorePopup
          modifyCommand={() => setIsModify(true)}
          deleteCommand={deleteComment}
          contentId={id}
          postErrorPopup={postErrorPopup}
        />
      }
    </div>
  )
}

export default Comment;