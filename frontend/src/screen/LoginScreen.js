import React, {Component} from "react";
import Banner from '../image/LoginBanner.png';
import Title from '../image/Title.svg';
import TextBox from '../component/TextBox_1';
import MainButton from '../component/MainButton.js';
import SubButton from '../component/SubButton.js';
import AlertPopup from '../screen/AlertPopup';
// import ConfirmPopup from '../screen/ConfirmPopup';
import RegisterPopup from '../screen/RegisterPopup';
import '../scss/common.scss';
import '../scss/screen.scss';

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputId:'',
      inputPw:'',
      alertPurpose:'',
      alertContent:'',
      regId:'',
      regPw:'',
      regNm:'',
      regBd:''
    }
  }

  showAlertPopup() {
    const alertPopup = document.querySelector('#alertPopup');
    alertPopup.classList.remove('hide');
    if (this.props.alertPurpose === "REG") {
      alertPopup.classList.add('idxZ2');
    }
  }

  showRegisterPopup() {
    const registerPopup = document.querySelector('#registerPopup');
    registerPopup.classList.remove('hide');
  }
    
  closeRegisterPopup() {
      const registerPopup = document.querySelector('#registerPopup');
      registerPopup.classList.add('hide');
  }

  addMember() {
    alert("ID : " + this.state.regId + "\nPW : " + this.state.regPw +  "\nName : " + this.state.regNm + "\nBirthday : " + this.state.regBd);
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
            onClick={function(e){
              this.showRegisterPopup();
            }.bind(this)}/>
            <MainButton title="Login" clsNm=""
            onClick={function(e){
              if (this.state.regId !== this.state.inputId
                || this.state.regPw !== this.state.inputPw) {
                this.setState({
                  alertPurpose:"",
                  alertContent:"아이디 또는 비밀번호가 일치하지 않습니다."
                }); 
                this.showAlertPopup();
              } else {
                this.props.onClick("main");
              }
            }.bind(this)}/>
          </div>
          <RegisterPopup
          onClick={function(_regId, _regPw, _regNm, _regBd) {
            this.setState({
              alertPurpose:"REG",
              alertContent:"회원가입이 완료되었습니다.",
              regId:_regId,
              regPw:_regPw,
              regNm:_regNm,
              regBd:_regBd
            }); 
            this.showAlertPopup();  
            console.log("123");
          }.bind(this)}/>
          <AlertPopup content={this.state.alertContent} purpose={this.state.alertPurpose}
          onClick={function(e) { 
            console.log("456");
            if (this.state.alertPurpose === "REG") {  
              this.closeRegisterPopup();
              this.addMember();
            }
          }.bind(this)}/>
        </div>
      </div>
    );
  }
};

export default LoginScreen;