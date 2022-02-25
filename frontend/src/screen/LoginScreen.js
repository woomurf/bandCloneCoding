import React, {Component} from "react";
import Banner from '../image/LoginBanner.png';
import Title from '../image/Title.svg';
import TextBox from '../component/TextBox';
import Button from '../component/Button';
import AlertPopup from '../popup/AlertPopup';
import RegisterPopup from '../popup/RegisterPopup';
// import axios from 'axios'
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
                var rtnResult = this.loginCheck(this.state.inputId, this.state.inputPw);
                var failContent = "";
                rtnResult = 'success'; //api 구현전 임시방편

                switch(rtnResult) {
                  case 'success':
                    this.props.onClick("main");
                    break;
                  case 'fail':
                    failContent = "아이디 또는 비밀번호가 일치하지 않습니다."
                    break;
                  case 'error':
                    failContent = "시스템의 문제가 발생했습니다."
                    break;
                  default:
                    failContent = "FAIL LOGIN_CHECK = {" + rtnResult + "}"
                    break;
                }

                if (rtnResult !== 'success') {
                  this.setState({
                    alertPurpose:"",
                    alertContent:failContent
                  }); 
                  this.showAlertPopup();
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

  loginCheck(inputId, inputPw) {
    var checkResult;
    var axios = require('axios');
    var data = JSON.stringify({
      "Id": inputId,
      "password": inputPw
    });
    var config = {
      method: '',
      url: 'localhost:3000',
      headers: { 
        'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJHT01VSlVMIiwiZW1haWwiOiJkbmd1c2RuZDJAZ21haWwuY29tIiwiaWF0IjoxNjQ1NDQxODEwLCJleHAiOjE2NDU0NDI3MTB9.an3BL5tRbkBIp4aXIRVAn0ucBs_GJcwE65NZvMjUurw', 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.length > 0) {
        checkResult = 'success';
      } else {
        checkResult = 'fail';
      }
    })
    .catch(function (error) {
      console.log(error);
      checkResult = 'error';
    });
    
    return checkResult;
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