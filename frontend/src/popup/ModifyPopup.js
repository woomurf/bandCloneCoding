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
      value: this.props.content
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleChange(e) {
    this.setState({value: e.target.value});
  }

  textRef = React.createRef();

  textResize = () =>{
    const textAreaBox = this.textRef.current;
    textAreaBox.style.height = 'auto';
    textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
  }

  async handleSubmit() {
    axios.put(`/post/${this.props.postId}`, {
      content: this.state.value,
    }).then(res => {
      this.props.updatePostList(); 
      this.props.closeModifyPopup();
    }).catch(err => {
      this.props.postErrorPopup();
    })
  }

  render() {
    return (
      <div id="modifyPopup"> 
        <div className="modifyPostuploadbox">
          <div className="modifyCancel">
            <button alt="" className="modifyCancelBtn"
              onClick={this.props.closeModifyPopup}>
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
                onClick={this.handleSubmit}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModifyPopup;