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
      inputId:'',
      inputPw:'',
      alertPurpose:'',
      alertContent:'',
      conditionAlert:false,
      conditionRegister:false
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
                this.RegisterPopupCondition();
              }.bind(this)}
            />
            <Button 
              label="Login" 
              className="mainButton largeButton"
              onClick={this.loginCheck.bind(this, this.state.inputId, this.state.inputPw)}
            /> 
          </div>
          {this.state.conditionRegister &&
            <RegisterPopup
              onClick={function(result, content) {
                if (result === 'success') {
                  this.setState({
                    alertPurpose:"REG_COMPLETE",
                    alertContent:content,
                  }); 
                } else {
                  this.setState({
                    alertPurpose:"REG",
                    alertContent:content,
                  }); 
                } 
                this.showAlertPopup();
              }.bind(this)}
            />
          }
          {this.state.conditionAlert &&
            <AlertPopup
              content={this.state.alertContent} 
              purpose={this.state.alertPurpose}
              onClick={function(e) { 
                if (this.state.alertPurpose === "REG_COMPLETE") {  
                  this.RegisterPopupCondition();
                }
              }.bind(this)}
            />
          }
        </div>
      </div>
    );
  }

  async loginCheck(email, password) {
    const res = await axios({
      method: 'post',
      url: '/auth/login',
      headers: { 
        'Content-Type': 'application/json'
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
      alertPurpose:"",
      alertContent: failContent
    }); 
    this.showAlertPopup();
  }

  showAlertPopup(){
    this.setState({conditionAlert: !this.state.conditionAlert})
  }

  RegisterPopupCondition() {
    this.setState({conditionRegister: !this.state.conditionRegister})
  }
};

export default LoginScreen;