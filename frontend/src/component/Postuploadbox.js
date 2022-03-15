import React, {Component} from "react";
import axios from "axios";
import Picture from '../image/Picture.png';
import Upload_Button from '../image/Upload_Button.png'
// import ImageUploader from "react-images-upload"
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

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
    
  login = async () => {
    const res = await axios.post('https://4b2d-110-10-225-160.ngrok.io/auth/login', {
      email: "1234@gmail.com",
      password: "1234",
    });
    return res.data['accessToken'];
  }

  async handleSubmit(e) {
    const token = await this.login();

    axios.post('https://4b2d-110-10-225-160.ngrok.io/post', {
      content: this.state.value,
      title: '없어질거임 타이틀은',
      groupId: 1,
      }, {
      headers: {
        'access-token': token
      }}
    )
    .then(res => {
      console.log('post', res);
    })
    e.preventDefault();
  }

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
            <img alt="" className="uploadButton" src ={Upload_Button} id="uploadButton" onClick={this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }
};


export default Postuploadbox;