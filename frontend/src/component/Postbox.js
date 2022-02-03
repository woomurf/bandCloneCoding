import React, {Component} from "react";
import SM from '../image/See More.png';
import Emogi from '../image/Emogi.png';
import Comment from '../image/Comment.png';
import Schedule from "../component/Schedule";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Post extends Component {
    render() {
        return (
          <div className="postBox">
            <div className="postHeader">
              <div className="profile">
                <div className="profileImage">
                  <img alt="" className="profileImage" src={this.props.profileImage} id="profileImage"/>
                </div>
                <div className="profileMeta">
                  <div className="userName">{this.props.userName}</div>
                  <div className="day">
                    {this.props.year}년 {this.props.month}월 
                    {this.props.date}일 {this.props.hours}:{this.props.min}
                  </div>
                </div>
              </div>
              <div className="moreIcon">
                <img alt="" className="moreIcon" src={SM} id="moreIcon"/>
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
};


export default Post;