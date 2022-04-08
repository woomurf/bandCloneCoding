import React, {Component} from "react";
import SeeMore from '../image/See_More.png';
import Emogi from '../image/Emogi.png';
import Comment from '../image/Comment.png';
import Schedule from "../component/Schedule";
import DefaultProfileImage from "../image/DefaultProfileImage.png";
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

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside.bind(this));
  }
  
  setWrapperRef_1(node) {
    this.wrapperRef_1=node;
  }

  setWrapperRef_2(node) {
    this.wrapperRef_2=node;
  }

  onClickOutside(e) {
    if ((this.wrapperRef_1 && !this.wrapperRef_1.contains(e.target))
      && (this.wrapperRef_2 && !this.wrapperRef_2.contains(e.target))) {
      this.onBlurSeeMorePopup();
    }
  }

  showSeeMorePopup() {
    this.setState({
      condition:true
    })
  }

  onBlurSeeMorePopup() {
    this.setState({
      condition:false
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

          <div className="moreIcon">
            <button className="postMoreMenuBtn">
              <img 
                alt="" 
                src={SeeMore} 
                ref={this.setWrapperRef_1.bind(this)}
                onClick={this.showSeeMorePopup.bind(this)}
              />
            </button>
            {this.state.condition && 
              <div 
                id="seeMorePopup" 
                ref={this.setWrapperRef_2.bind(this)}
              > 
                <div className="content">
                  <li className="moreContent">
                    수정
                  </li>
                  <li className="moreContent">
                    삭제
                  </li>
                </div>
              </div>
            }
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
            <div className="postPicture">
              <img alt="" className="postPicture" src={this.props.picture}/>
            </div>)
          }
        </div>

        <div className="postFooter">
          <img alt="" className="Emogi" src={Emogi}/>
          <img alt="" className="Comment" src={Comment}/>
        </div>
      </div>
    );
  }
};

export default PostBox;