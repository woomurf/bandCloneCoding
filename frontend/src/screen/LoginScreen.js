import React, {Component} from "react";
import Banner from '../image/LoginBanner.png';
import Title from '../image/Title.svg';
import TextBox from '../component/TextBox_1';
import MainButton from '../component/MainButton.js';
import SubButton from '../component/SubButton.js';
// import AlertPopup from '../screen/AlertPopup';
import ConfirmPopup from '../screen/ConfirmPopup';
import RegisterPopup from '../screen/RegisterPopup';
import '../scss/common.scss';
import '../scss/screen.scss';

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputId:'',
      inputPw:''
    }
  }

  showAlertPopup() {
    const alertPopup = document.querySelector('#alertPopup');
    alertPopup.classList.remove('hide');
  }

  showConfirmPopup() {
    const confirmPopup = document.querySelector('#confirmPopup');
    confirmPopup.classList.remove('hide');
  }
  
  showRegisterPopup() {
    const registerPopup = document.querySelector('#registerPopup');
    registerPopup.classList.remove('hide');
  }

  addMember(regId, regPw, regNm, regBd) {
    alert("ID : " + regId + "\nPW : " + regPw +  "\nName : " + regNm + "\nBirthday : " + regBd);
  }

  render() {
    return (
      <div id="loginPage">
        <div className="relativeWrapperOne">
          <img
            alt=""
            className="sectionBanner"
            src={Banner}
          />
        </div>
        <div className="flexWrapperOne">
          <img
            alt=""
            className="sectionTitle"
            src={Title}
          />
          <TextBox title="ID" typeNm="text" dtaNm="inputId"
          onChange={function(_inputId){
            this.setState({
              inputId:_inputId
            });
          }.bind(this)}/>
          <TextBox title="PW" typeNm="password" dtaNm="inputPw"
          onChange={function(_inputPw){
            this.setState({
              inputPw:_inputPw
            });
          }.bind(this)}/>
          <div className="flexWrapperTwo">
            <SubButton title="Register" clsNm="mr8"
            onClick={this.showRegisterPopup.bind(this)}/>
            <MainButton title="Login" clsNm=""
            onClick={this.showConfirmPopup.bind(this)}/>
          </div>
          <RegisterPopup
          onClick={function(regId, regPw, regNm, regBd){
            this.addMember(regId, regPw, regNm, regBd);
          }.bind(this)}/>
          <ConfirmPopup content="로그인 할껍니까?(test)" 
          onClick={this.props.onClick.bind(this, "main")}/>
        </div>
      </div>
    );
  }
};

export default LoginScreen;