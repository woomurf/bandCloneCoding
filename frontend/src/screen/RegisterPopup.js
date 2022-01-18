import React, {Component} from "react";
import TextBox from '../component/TextBox_1';
import ConfirmPopup from '../screen/ConfirmPopup';
import MainButton from '../component/MainButton';
import SubButton from '../component/SubButton';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/screen.scss';

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
                <div id="registerPopup" class="hide"> 
                    <div class="content">
                        <TextBox 
                            className="regTextBox" 
                            type="text"
                            name="regId"
                            placeholder="이메일" 
                            value={this.state.regId}
                            onChange={this.handelChange.bind(this)}
                        />
                        <TextBox 
                            className="regTextBox" 
                            type="password"
                            name="regPw"
                            placeholder="비밀번호" 
                            value={this.state.regPw}
                            onChange={this.handelChange.bind(this)}
                        />
                        <TextBox 
                            className="regTextBox" 
                            type="text"
                            name="regNm"
                            placeholder="이름" 
                            value={this.state.regNm}
                            onChange={this.handelChange.bind(this)}
                        />
                        <TextBox 
                            className="regTextBox" 
                            type="text"
                            name="regBd"
                            placeholder="생년월일" 
                            value={this.state.regBd}
                            onChange={this.handelChange.bind(this)}
                        />
                        <div className="flexWrapperTwo">
                            <SubButton title="Close" clsNm="mr8"
                            onClick={this.showConfirmPopup.bind(this)}/>
                            <MainButton title="Confirm" clsNm=""
                            onClick={function(e){

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
                                })
                            }.bind(this)}/>
                        </div>
                    </div>
                </div>
                <ConfirmPopup content="회원가입을 취소하겠습니까?" 
                onClick={this.closeRegisterPopup.bind(this)}/>
            </div>
        );
    }

    handelChange(e) {
        switch (e.target.name) {
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