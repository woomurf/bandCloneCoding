import React, {Component} from "react";
import Button from '../component/Button';
import TextBox from '../component/TextBox';
import ConfirmPopup from '../popup/ConfirmPopup';
import AlertPopup from '../popup/AlertPopup';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/popup.scss';

class RegisterPopup extends Component {
  state = {
    regId:'',
    regPw:'',
    regNm:'',
    regBd:'',
    alertPurpose:'',
    alertContent:''
  }

  render() {
    return (
      <div>
        <div id="registerPopup" className="hide"> 
          <div className="content">
            <TextBox 
              className="regTextBox" 
              id="regId"
              type="text"
              value={this.state.regId}
              placeholder="이메일" 
              onChange={this.handelChange.bind(this)}
            />
            <TextBox 
              className="regTextBox" 
              id="regPw"
              type="password"
              value={this.state.regPw}
              placeholder="비밀번호" 
              onChange={this.handelChange.bind(this)}
            />
            <TextBox 
              className="regTextBox" 
              id="regNm"
              type="text"
              value={this.state.regNm}
              placeholder="이름" 
              onChange={this.handelChange.bind(this)}
            />
            <TextBox 
              className="regTextBox" 
              id="regBd"
              type="text"
              value={this.state.regBd}
              placeholder="생년월일" 
              onChange={this.handelChange.bind(this)}
            />
            <div className="flexWrapperTwo">
              <Button 
                label="Close" 
                className="subButton largeButton mr8"
                onClick={this.showConfirmPopup.bind(this)}
              />
              <Button 
                label="Confirm" 
                className="mainButton largeButton"
                onClick={function(){
                  if(join_vali(this.state.regId,this.state.regPw,this.state.regNm)){
                    if(Birth_vali(this.state.regBd)){
                    this.addMember(this.state.regId,this.state.regPw,this.state.regNm,this.state.regBd); // DB 반영
                  }
                }
                }.bind(this)}
              />
            </div>
          </div>
        </div>
        <AlertPopup 
          content={this.state.alertContent} 
          purpose={this.state.alertPurpose}
          onClick={function(e) { 
            
          }}
        />
        <ConfirmPopup content="회원가입을 취소하겠습니까?" 
          onClick={function(){
            this.closeRegisterPopup();
            this.setState({
              regId:'',
              regPw:'',
              regNm:'',
              regBd:''
            })
          }.bind(this)}
        />
      </div>
    );
  }

  handelChange(e) {
    switch (e.target.id) {
      case "regId":
        this.setState({
          regId : e.target.value
        });
        break;
      case "regPw":
        this.setState({
          regPw : e.target.value
        });
        break;
      case "regNm":
        this.setState({
          regNm : e.target.value
        });
        break;
      case "regBd":
        this.setState({
          regBd : e.target.value
        });
        break;
      default:
        alert("문제가 생겼습니다.");
    }
  }
  
  async addMember(regId, regPw, regNm, regBd) {
    var axios = require('axios');
    var checkResult;
    var failContent = "";
    var data = JSON.stringify({
      "name": regNm,
      "email": regId,
      "password": regPw,
      "birthday": regBd
    });

    var config = {
      method: 'post',
      url: 'https://1c31-110-10-225-160.ngrok.io/auth/register',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    await axios(config)
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

    switch(checkResult) {
      case 'success':
        alert("ID : " + this.state.regId + "\nPW : " + this.state.regPw +  "\nName : " + this.state.regNm + "\nBirthday : " + this.state.regBd);
        this.props.onClick();
        this.setState({
          regId:'',
          regPw:'',
          regNm:'',
          regBd:''
        });
        break;
      case 'fail':
        failContent = "회원가입에 실패했습니다."
        break;
      case 'error':
        failContent = "시스템의 문제가 발생했습니다."
        break;
      default:
        failContent = "FAIL REGISTER_CHECK = {" + checkResult + "}"
        break;
    }

    if (checkResult !== 'success') {
      this.setState({
        alertPurpose:"",
        alertContent:failContent
      }); 
      this.showAlertPopup();
    }
  }

  showAlertPopup() {
    const alertPopup = document.querySelector('#alertPopup');
    alertPopup.classList.remove('hide');
    if (this.props.alertPurpose === "REG") {
      alertPopup.classList.add('idxZ2');
    }
  }

  showConfirmPopup() {
    const confirmPopup = document.querySelector('#confirmPopup');
    confirmPopup.classList.remove('hide');
    confirmPopup.classList.add('idxZ2');
  }

  closeRegisterPopup() {
    const registerPopup = document.querySelector('#registerPopup');
    registerPopup.classList.add('hide');
  }
};

function join_vali(regId, regPw, regNm){

	var RegExp = /^[a-zA-Z0-9]{4,15}$/;
    var e_RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var n_RegExp = /^[가-힣]{2,15}$/;


	if(!regId) {
           alert("E-mail을 입력해 주세요");
           return false;
    }
	if(!e_RegExp.test(regId)){
            alert("올바른 이메일 형식이 아닙니다.");
            return false;
    }
	if(!regPw) {
           alert("password 를 입력해 주세요");
           return false;
    }
	if(!RegExp.test(regPw)){
        alert("Password는 4~15자의 영문 대소문자와 숫자로만 입력하여 주세요.");
        return false;
    }
	if(!regNm) {
       alert("성함을 입력해 주세요");
       return false;
    }
	if(!n_RegExp.test(regNm)){
         alert("이름에 특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.");
         return false;
    }

    return true;
};

function Birth_vali(_inputBd) {
    if (_inputBd === undefined) {
        alert("생년월일을 입력해주세요");
        return false;
    }

    var Bd_exp = /^(\(?\+?[0-9]*\)?)?[0-9_\- ]*$/
    var year = Number(_inputBd.substr(0,4)); // 입력한 값의 0~4자리까지 (연) 
    var month = Number(_inputBd.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
    var day = Number(_inputBd.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
    var today = new Date();
    var yearNow = today.getFullYear();

    if (_inputBd.length !== 8) {
        alert("년도 4자리를 포함한 8자리숫자로 적어주세요");
        return false;
    }
    else if (!Bd_exp.test(_inputBd)) {
        alert("년도 4자리를 포함한 8자리숫자로 적어주세요 2");
        return false;
    }
    else if (1900 > year || year > yearNow){
        alert("1900년~"+yearNow+"년 사이를 입력해주세요");
            return false;
    }
    else if (month < 1 || month > 12){
        alert("정확한 달(월)을 입력해주세요");
        return false; 
    } 
    else if (day < 1 || day > 31){
        alert("정확한 날(일) 을 입력해주세요");
        return false; 
    }
    else if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31 ){
        alert("정확한 날(일) 을 입력해주세요"); 
        return false; 
    } 
    else if (month === 2){ 
        var leapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)); 
        if (day>29 || (day === 29 && !leapYear)){
            alert("정확한 날(일) 을 입력해주세요"); 
            return false; 
        } 
        else { 
            return true; 
        }
    }
    else{
    return true;
    }
}

export default RegisterPopup;