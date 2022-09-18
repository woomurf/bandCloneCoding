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
      registerPopupCondition : false
    }
  } 

  registerPopupOnoff () {
    this.setState({ 
      registerPopupCondition : !this.state.registerPopupCondition 
    });
  }

  alertPopupOnoff () {
    this.setState({
      alertPopupCondition : !this.state.alertPopupCondition
    });
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
            onKeyUp={this.loginCheck.bind(this, this.state.inputId, this.state.inputPw)}
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
            onKeyUp={this.loginCheck.bind(this, this.state.inputId, this.state.inputPw)}
          />
          <div className="flexWrapperTwo">
            <Button 
              label="Register" 
              className="subButton largeButton mr8"
              onClick={function(e){
                this.registerPopupOnoff();
              }.bind(this)}
            />
            <Button 
              label="Login" 
              className="mainButton largeButton"
              onClick={this.loginCheck.bind(this, this.state.inputId, this.state.inputPw)}
            /> 
          </div>
          <RegisterPopup
            registerPopupCondition={this.state.registerPopupCondition}
            registerPopupOnoff={this.registerPopupOnoff.bind(this)}
            callAlert={function(result, content) {
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
            onClick={function() { 
              if (this.state.alertPurpose === "REG_COMPLETE") {  
                this.registerPopupOnoff();
              }
            }.bind(this)}
          />
        </div>
      </div>
    );
  }

  async loginCheck(email, password) {
    await axios.post("/auth/login", {
      email,
      password
    }).then((res) => {
      if (res.data.code === LoginResultCode.SUCCESS) {
        this.props.movePage("main");
      }
    }).catch((err) => {
      const failContent = err.response.data.message;
      this.setState({
        alertPurpose : "",
        alertContent : failContent
      }); 
      this.alertPopupOnoff();
    });
  }
};

export default LoginScreen;