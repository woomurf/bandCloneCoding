import React, {Component} from "react";
import SeeMore from '../image/See_More.png';
import Emogi from '../image/Emogi.png';
import Comment from '../image/Comment.png';
import Schedule from "../component/Schedule";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import SeeMorePopup from "../popup/SeeMorePopup"
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class PostBox extends Component {
  render() {
    return (
      <div className="postBox">

        <div className="postHeader">
          <div className="profile">
            <div className="profileImage">
              <img alt="" className="profileImage" src={this.props.profileImage || DefaultProfileImage} id="profileImage"/>
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
          <SeeMorePopup/>
          <div className="moreIcon">
            <button className="postMoreMenuBtn">
              <img alt="" className="moreIconButton" src={SeeMore} id="moreIconButton"
                onClick={this.showPostMoreMenu}
              />
            </button>
            
            <div id = "postMoreMenuview">
              <ul id="postMoreMenu" className="hide">
                <li>
                  수정
                </li>
                <li>
                  삭제
                </li>
              </ul>
            </div>
          </div>     
        </div>

        <div className="postBody">
          {this.props.text &&(
            <div className="postLabel">
              {this.props.text}
            </div>)
          }
          {this.props.scheduleDay &&(
            <Schedule 
              scheduleDate={this.props.scheduleDate}
              scheduleDay={this.props.scheduleDay}
              scheduleName={this.props.scheduleName}
              scheduleDDay={this.props.scheduleDDay}
            />
            )
          }
          {this.props.picture &&  (
            <div className="post_Picture">
              <img alt="" className="postPicture" 
              src={this.props.picture} id="postPicture"/>
            </div>)
          }
        </div>

        <div className="postFooter">
          <img alt="" className="Emogi" src={Emogi} id="Emogi"/>
          <img alt="" className="Comment" src={Comment} id="Comment"/>
        </div>
      </div>
    );
  }
  showPostMoreMenu() {
    const postMoreMenu = document.querySelector('#postMoreMenu');
    postMoreMenu.classList.remove('hide');
  }

  // state 사용해서 조건부렌더링으로 해결해볼것.
};


export default PostBox;