import React, {Component} from "react";
import TextBox from '../component/TextBox_1';
import MainButton from '../component/MainButton';
import SubButton from '../component/SubButton';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/screen.scss';

class RegisterPopup extends Component {
    closeRegisterPopup() {
        const registerPopup = document.querySelector('#registerPopup');
        registerPopup.classList.add('hide');
    }

    onRegisterPopup() {
        console.log(this);
    }

    render() {
        var regId, regPw, regNm, regBd;
        return (
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
                    <TextBox clsNm="regTextBox" title="생일" typeNm="text" dtaNm="inputBd"
                    onChange={function(_inputBd){
                        regBd = _inputBd;
                    }}/>
                    <div className="flexWrapperTwo">
                        <SubButton title="Close" clsNm="mr8"
                        onClick={this.closeRegisterPopup.bind(this)}/>
                        <MainButton title="Confirm" clsNm=""
                        onClick={function(e){
                            this.closeRegisterPopup();
                            this.props.onClick(regId, regPw, regNm, regBd);
                        }.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default RegisterPopup;