import React, {Component} from "react";
import axios from "axios";
import Picture from '../image/Picture.png';
import Upload_Button from '../image/Upload_Button.png'
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'
import PostErrorPopup from "../popup/PostErrorPopup";


class Postuploadbox extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleChange(e) {
    this.setState({value: e.target.value});
  }

  async handleSubmit(e) {
    axios.post('/post', {
      content: this.state.value,
      title: '없어질거임 타이틀은',
      groupId: 1,
    }).then(res => {
      this.props.updatePostList();
      console.log('post', res);
    }).catch(err => {
      this.showPostErrorPopup();
    })
    e.preventDefault();
  }

  render() {
    return (
      <div className="postuploadbox">
        <div className="postupload">
          <textarea type="text" rows="4" placeholder="새로운 소식을 남겨보세요." id="postupload"
          value={this.state.value}
          onChange={this.handleChange}/>
        </div>

        <div className="pictureImage">
          <div>
            <img alt="" className="pictureImage" src ={Picture} id="pictureImage"/>
          </div>
          <div>
            <img alt="" className="uploadButton" src ={Upload_Button} id="uploadButton" 
              onClick={this.handleSubmit}/>
          </div>
        </div>
        <PostErrorPopup/>
      </div>
    );
  }
  showPostErrorPopup() {
    const logoutPopup = document.querySelector('#logoutPopup');
    logoutPopup.classList.remove('hide');
  }
};


export default Postuploadbox;