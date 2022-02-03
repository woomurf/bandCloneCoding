import React, {Component} from "react";
import Banner from '../image/LoginBanner.png';
import Title from '../image/Title.svg';
import TextBox from '../component/TextBox';
import Button from '../component/Button';
import AlertPopup from '../popup/AlertPopup';
import RegisterPopup from '../popup/RegisterPopup';
import '../scss/common.scss';
import '../scss/page.scss';

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputId:'',
      inputPw:'',
      alertPurpose:'',
      alertContent:''
    }
  }

  render() {
    return (
      <div id="loginPage">
        <div className="relativeWrapperOne">
          <img
            className="sectionBanner"
            src={Banner}
          />
        </div>
        <div className="flexWrapperOne">
          <img
            className="sectionTitle"
            src={Title}
          />
          <TextBox 
            id="inputId"
            type="text" 
            value={this.state.inputId}
            placeholder="ID" 
            onChange={function(e){
              this.setState({
                inputId:e.target.value
              });
            }.bind(this)}
          />
          <TextBox 
            id="inputPw"
            type="password"
            value={this.state.inputPw}
            placeholder="PW" 
            onChange={function(e){
              this.setState({
                inputPw:e.target.value
              });
            }.bind(this)}
          />
          <div className="flexWrapperTwo">
            <Button 
              label="Register" 
              className="subButton largeButton mr8"
              onClick={function(e){
                this.showRegisterPopup();
              }.bind(this)}
            />
            <Button 
              label="Login" 
              className="mainButton largeButton"
              onClick={function(e){
                if ("" !== this.state.inputId
                  || "" !== this.state.inputPw) {
                  this.setState({
                    alertPurpose:"",
                    alertContent:"아이디 또는 비밀번호가 일치하지 않습니다."
                  }); 
                  this.showAlertPopup();
                } else {
                  this.props.onClick("post");
                }
              }.bind(this)}
            />
          </div>
          <RegisterPopup
            onClick={function() {
              this.setState({
                alertPurpose:"REG",
                alertContent:"회원가입이 완료되었습니다.",
              }); 
              this.showAlertPopup(); 
            }.bind(this)}
          />
          <AlertPopup 
            content={this.state.alertContent} 
            purpose={this.state.alertPurpose}
            onClick={function(e) { 
              if (this.state.alertPurpose === "REG") {  
                this.closeRegisterPopup();
              }
            }.bind(this)}
          />
        </div>
      </div>
    );
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
};

export default LoginScreen;