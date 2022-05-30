import React, {Component} from "react";
import axios from 'axios';
import { LoginResultCode } from '../constants';
import Banner from '../image/LoginBanner.png';
import Title from '../image/Title.svg';
import TextBox from '../component/TextBox';
import Button from '../component/Button';
import RegisterPopup from '../popup/RegisterPopup';
import AlertPopup from "../popup/AlertPopup";
import '../scss/common.scss';
import '../scss/page.scss';

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputId : '',
      inputPw : '',
      alertPurpose : '',
      alertContent : '',
      conditionAlert : false,
      alertPopupCondition : false,
      registerPoupCondition : false
    }
  } 

  registerPopupModalonoff = () => {
    this.setState({ 
      registerPoupCondition : !this.state.registerPoupCondition 
    })
  }

  alertPopupOnoff () {
    this.setState({
      alertPopupCondition : !this.state.alertPopupCondition
    })
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
                this.registerPopupModalonoff();
              }.bind(this)}
            />
            <Button 
              label="Login" 
              className="mainButton largeButton"
              onClick={this.loginCheck.bind(this, this.state.inputId, this.state.inputPw)}
            /> 
          </div>
          <RegisterPopup
            registerPoupCondition={this.state.registerPoupCondition}
            registerPopupModalonoff={this.registerPopupModalonoff}
            onClick={function(result, content) {
              if (result === 'success') {
                this.setState({
                  alertPurpose : "REG_COMPLETE",
                  alertContent : content,
                }); 
              } else {
                this.setState({
                  alertPurpose : "REG",
                  alertContent : content,
                }); 
              } 
              this.alertPopupOnoff();
            }.bind(this)}
          />
          <AlertPopup
            content={this.state.alertContent} 
            alertPopupCondition={this.state.alertPopupCondition}
            alertPopupOnoff={this.alertPopupOnoff.bind(this)}
            purpose={this.state.alertPurpose}
            onClick={function(e) { 
              if (this.state.alertPurpose === "REG_COMPLETE") {  
                this.registerPopupModalonoff();
              }
            }.bind(this)}
          />
        </div>
      </div>
    );
  }

  async loginCheck(email, password) {
    const res = await axios({
      method : 'post',
      url : '/auth/login',
      headers : { 
        'Content-Type' : 'application/json'
      },
      data: JSON.stringify({
        email,
        password
      })
    }).then(res => res.data)
    .catch((err) => err.response.data);
    
    if (res.code === LoginResultCode.SUCCESS) {
      return this.props.onClick("main");
    }

    const failContent = res.message;
    this.setState({
      alertPurpose : "",
      alertContent : failContent
    }); 
    this.alertPopupOnoff();
  }
};

export default LoginScreen;