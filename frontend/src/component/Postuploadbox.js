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
      groupId: 1,
    }).then(res => {
      // 리엑트에서 리렌더링되는 경우 조건이많다. 대표적인것 state 의값이 바뀌었을때 리렌더링이된다
      // setState 공부, postFrame 에서 받아오는 데이터를 다시받아오기
      // 최종적으로 postFrame의 state를 업데이트해야됨

      // postFrame의 리스트를 받아온다
      // 내가 싸지른 글을 추가시킨다 => setState로
      // 보낸다 postframe으로

      this.props.getPostList();
      console.log('post', res);
    }).catch(err => {
      this.showPostErrorPopup();
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