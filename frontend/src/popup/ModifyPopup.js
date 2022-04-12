import React, {Component} from "react";
import Picture from '../image/Picture.png';
import Upload_Button from '../image/Upload_Button.png'
import axios from "axios";
import '../scss/common.scss';
import '../scss/popup.scss';
import '../scss/page.scss';
import '../scss/component.scss';

class ModifyPopup extends Component {

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
      this.props.updatePostList();
      this.setState ({
        value:''
      })
      this.closeModifyPopup();
      console.log('post', res);
    }).catch(err => {
      this.props.postErrorPopup();
    })
    e.preventDefault();
  }

  // async modifyPost(e) {
  //   axios.post('/post', {
  //     content: this.state.value,
  //     groupId: 1,
  //   }).then(res => {
  //     this.props.updatePostList();
  //     this.setState ({
  //       value:''
  //     })
  //     this.closeModifyPopup();
  //     console.log('post', res);
  //   }).catch(err => {
  //     this.props.postErrorPopup();
  //   })
  //   e.preventDefault();
  // }

  closeModifyPopup() {
    const modifyPopup = document.querySelector('#modifyPopup');
    modifyPopup.classList.add('hide');
  }
  
  textRef = React.createRef();

  textResize = () =>{
    const textAreaBox = this.textRef.current;
    textAreaBox.style.height = 'auto';
    textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
  }
 // child component?
  render() {
    return (
      <div id="modifyPopup" className="hide"> 
        <div className="modifyPostuploadbox">
          <div className="modifyCancel">
            <button alt="" className="modifyCancelBtn"
              onClick={this.closeModifyPopup.bind(this)}>
              수정취소
            </button>
          </div>
          <div className="postupload">
            <textarea 
              type="text" 
              className="postupload"
              ref={this.textRef}
              onKeyUp={this.textResize}
              onKeyDown={this.textResize}
              value={this.state.value}
              onChange={this.handleChange}
            />
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
        </div>
      </div>
    );
  }
};

export default ModifyPopup;