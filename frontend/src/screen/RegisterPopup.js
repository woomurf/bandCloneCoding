import React, {Component} from "react";
import TextBox from '../component/TextBox_1';
import DateSelecter from '../component/DateSelecter';
import ConfirmPopup from '../screen/ConfirmPopup';
import AlertPopup from '../screen/AlertPopup';
import MainButton from '../component/MainButton';
import SubButton from '../component/SubButton';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/screen.scss';

class RegisterPopup extends Component {
    showConfirmPopup() {
      const confirmPopup = document.querySelector('#confirmPopup');
      confirmPopup.classList.remove('hide');
      confirmPopup.classList.add('idxZ2');
    }

    showAlertPopup() {
      const alertPopup = document.querySelector('#alertPopup');
      alertPopup.classList.remove('hide');
      alertPopup.classList.add('idxZ2');
    }

    closeRegisterPopup() {
        const registerPopup = document.querySelector('#registerPopup');
        registerPopup.classList.add('hide');
    }

    onRegisterPopup() {
        console.log(this);
    }

    render() {
        var regId, regPw, regNm;
        var regBd = "19961213";
        return (
            <div>
                <div id="registerPopup" class="hide"> 
                    <div class="content">
                        <TextBox clsNm="regTextBox" title="이메일" typeNm="text" dtaNm="inputId"
                        onChange={function(_inputId){
                            regId = _inputId;
                        }}/>
                        <TextBox clsNm="regTextBox" title="비밀번호" typeNm="password" dtaNm="inputPw"
                        onChange={function(_inputPw){
                            regPw = _inputPw;
                        }}/>
                        <TextBox clsNm="regTextBox" title="이름" typeNm="text" dtaNm="inputNm"
                        onChange={function(_inputNm){
                            regNm = _inputNm;
                        }}/>
                        <DateSelecter setDt={"1996/12/13"}
                        onChange={function(_inputBd){
                            regBd = _inputBd.getFullYear() + (_inputBd.getMonth() + 1).toString().padStart(2, '0') + _inputBd.getDate().toString().padStart(2, '0');
                        }}/>
                        <div className="flexWrapperTwo">
                            <SubButton title="Close" clsNm="mr8"
                            onClick={this.showConfirmPopup.bind(this)}/>
                            <MainButton title="Confirm" clsNm=""
                            onClick={this.showAlertPopup.bind(this)}/>
                        </div>
                    </div>
                </div>
                <ConfirmPopup content="회원가입을 취소하겠습니까?" 
                onClick={this.closeRegisterPopup.bind(this)}/>
                <AlertPopup content="회원가입이 완료되었습니다." purpose="REG"
                onClick={function(e){
                    this.closeRegisterPopup();
                    this.props.onClick(regId, regPw, regNm, regBd);
                }.bind(this)}/>
            </div>
        );
    }
};

export default RegisterPopup;