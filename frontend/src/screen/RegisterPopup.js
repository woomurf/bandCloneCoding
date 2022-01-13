import React, {Component} from "react";
import TextBox from '../component/TextBox_1';
import ConfirmPopup from '../screen/ConfirmPopup';
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

    closeRegisterPopup() {
        const registerPopup = document.querySelector('#registerPopup');
        registerPopup.classList.add('hide');
    }
    
    render() {
        var regId, regPw, regNm, regBd;

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
                        <TextBox clsNm="regTextBox" title="생년월일" typeNm="text" dtaNm="inputBd"
                        onChange={function(_inputBd){
                                regBd = _inputBd;
                        }}/>
                        <div className="flexWrapperTwo">
                            <SubButton title="Close" clsNm="mr8"
                            onClick={this.showConfirmPopup.bind(this)}/>
                            <MainButton title="Confirm" clsNm=""
                            onClick={function(e){
                                if(join_vali(regId, regPw, regNm)){
                                    if(Birth_vali(regBd)){
                                    this.props.onClick(regId, regPw, regNm, regBd);
                                    }
                                }
                            }.bind(this)}/>
                        </div>
                    </div>
                </div>
                <ConfirmPopup content="회원가입을 취소하겠습니까?" 
                onClick={this.closeRegisterPopup.bind(this)}/>
            </div>
        ); 
    }
};

function join_vali(regId, regPw, regNm){

	var RegExp = /^[a-zA-Z0-9]{4,15}$/;
    var e_RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var n_RegExp = /^[가-힣]{2,15}$/;


	if(regId === "") {
           alert("E-mail을 입력해 주세요");
           return false;
    }
	if(!e_RegExp.test(regId)){
            alert("올바른 이메일 형식이 아닙니다.");
            return false;
    }
	if(regPw === "") {
           alert("password 를 입력해 주세요");
           return false;
    }
	if(!RegExp.test(regPw)){
        alert("Password는 4~15자의 영문 대소문자와 숫자로만 입력하여 주세요.");
        return false;
    }
	if(regNm === "") {
       alert("성함을 입력해 주세요");
       return false;
    }
	if(!n_RegExp.test(regNm)){
         alert("특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.");
         return false;
    }

    return true;
};

function Birth_vali(_inputBd) {
    if (_inputBd === undefined) {
        alert("생년월일을 입력해주세요");
        return false;
    }

    var Bd_exp = /^[0-9]$/;
    var year = Number(_inputBd.substr(0,4)); // 입력한 값의 0~4자리까지 (연) 
    var month = Number(_inputBd.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
    var day = Number(_inputBd.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
    var today = new Date();
    var yearNow = today.getFullYear();


    if (_inputBd.length != 8 || !Bd_exp.test(_inputBd)) {
        alert("년도 4자리를 포함한 8자리숫자로 적어주세요");
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