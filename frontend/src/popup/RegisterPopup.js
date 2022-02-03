import React, {Component} from "react";
import TextBox from '../component/TextBox';
import ConfirmPopup from '../popup/ConfirmPopup';
import Button from '../component/Button';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/popup.scss';

class RegisterPopup extends Component {
  state = {
    regId:'',
    regPw:'',
    regNm:'',
    regBd:''
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

                  // this.state.regId, 
                  // this.state.regPw, 
                  // this.state.regNm, 
                  // this.state.regBd
                  // register validation check
                  
                  this.addMember(); // DB 반영
                  this.props.onClick();
                  this.setState({
                    regId:'',
                    regPw:'',
                    regNm:'',
                    regBd:''
                  });
                }.bind(this)}
              />
            </div>
          </div>
        </div>
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
  
  addMember() {
    alert("ID : " + this.state.regId + "\nPW : " + this.state.regPw +  "\nName : " + this.state.regNm + "\nBirthday : " + this.state.regBd);
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

export default RegisterPopup;