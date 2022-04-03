import React, {Component} from "react";
import ProfileSetting from "../popup/SettingPopup";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss';
import DefaultProfileImage from "../image/DefaultProfileImage.png";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      profileSetting: false
    } 
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.onBlurProdile();
    }
  }

  render() {
    return (
      <div 
        ref={this.setWrapperRef}
        id="myProfile"
        className="noDrag"
      >
        <img 
          id="memberProfileImage"
          alt="" 
          src={DefaultProfileImage} 
          onClick={this.onClickProfile.bind(this)}
        />
        {this.getProfileSetting()}
      </div>
    );
  }

  onClickProfile() {
    this.setState({
      profileSetting:!this.state.profileSetting
    });
  }

  onBlurProdile() {
    this.setState({
      profileSetting:false
    });
  }
  
  getProfileSetting() {
    if (this.state.profileSetting) {
      return <ProfileSetting/>
    } else {
      return null;
    }
  }
};

export default Profile;