import React, {Component} from "react";
import Banner from '../image/LoginBanner.png';
import Title from '../image/Title.svg';
import TextBox from '../component/TextBox_1';
import MainButton from '../component/MainButton.js';
import SubButton from '../component/SubButton.js';
import AlertPopup from '../screen/AlertPopup';
import ConfirmPopup from '../screen/ConfirmPopup';
import '../scss/common.scss';
import '../scss/screen.scss';

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      clsNm:'',
      typeNm:'',
      dtaNm:'',
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
            onClick={this.showAlertPopup.bind(this)}/>
            <MainButton title="Login" clsNm=""
            onClick={this.showConfirmPopup.bind(this)}/>
          </div>
        </div>
        <AlertPopup/>
        <ConfirmPopup/>
      </div>
    );
  }
};

export default LoginScreen;