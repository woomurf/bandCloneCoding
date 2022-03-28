import React, {Component} from "react";
import axios from "axios";
import Picture from '../image/Picture.png';
import Upload_Button from '../image/Upload_Button.png'
// import ImageUploader from "react-images-upload"
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
      // TODO(selp0100): post 생성 성공 시 popup 작업 필요.
      console.log('post', res);
    }).catch(err => {
      // TODO(selp0100): post 생성 실패 시 popup 작업 필요.
    })
    e.preventDefault();
  }

  // 업로드 버튼을 눌렀을떄 리렌더링이되어야한다
  // post 생성 실패일 경우 => 글자수가 너무나 많은경우, 아무것도 작성하지 않았을경우
  // post 생성 가능일 경우 => 팝업을띄워서 "포스팅 하시겠습니까?" 질문
  // 예 => 리렌더링
  // 아니요 => 팝업이닫힘

  render() {
    return (
      <div className="postuploadbox">

        <div className="postupload">
          <textarea type="text" rows="4" placeholder="새로운 소식을 남겨보세요." id="postupload"
          value={this.state.value}
          // username={this.state.username}
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