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
  constructor(props) {
    super(props);
    this.state = {
      condition: false
    };
  }

  showSeeMorePopup() {
    this.setState({condition:true})
  }

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
          <div className="moreIcon">
            <button className="postMoreMenuBtn">
              <img alt="" className="moreIconButton" src={SeeMore} id="moreIconButton"
                onClick={this.showSeeMorePopup.bind(this)}
              />
            </button>
            {this.state.condition && <SeeMorePopup />}
          </div>     
        </div>

        <div className="postBody">
          {this.props.content &&(
            <div className="postLabel">
              {this.props.content}
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
};

export default PostBox;