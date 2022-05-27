import React, {useState} from "react";
import Button from '../component/Button';
import TextBox from '../component/TextBox';
import ConfirmPopup from './ConfirmPopup';
import axios from "axios";
import Modal from "react-modal";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/popup.scss';

const RegisterPopup = (props) => {
  const [conditionConfirmPopup, confirmPopupCondition] = useState(false);
  const [regId, setId] = useState("");
  const [regPw, setPw] = useState("");
  const [regNm, setNm] = useState("");
  const [regBd, setBd] = useState("");

  const infoReset = () => {
    setId("");
    setPw("");
    setNm("");
    setBd("");
  }

  const confirmPopupOnOff = () => {
    confirmPopupCondition(
      !conditionConfirmPopup
    )
  }

  const addMember = async (regId, regPw, regNm, regBd) => {
    var checkResult;
    var alertContent = 'fail';
    const year = Number(regBd.substr(0,4)); // 입력한 값의 0~4자리까지 (연) 
    const month = Number(regBd.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
    const day = Number(regBd.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
    
    await axios.post("/auth/register", {
      name : regNm,
      email : regId,
      password : regPw,
      birth: year + "-" + month + "-" + day
    }).then(res => {
      console.log(res)
      checkResult = 'success';
      alertContent = "회원가입이 완료되었습니다."
      infoReset();
      props.onClick(checkResult,alertContent);
    }).catch(function(err){
      console.log(err)
      checkResult = "err"
      alertContent = "회원가입이 실패했습니다."
      props.onClick(checkResult,alertContent);
    })
  }
  
  return (
    <Modal 
      className="modal"
      isOpen={props.registerPoupCondition}
      ariaHideApp={false}
      onRequestClose={props.registerPopupModalonoff}
      style={{
        overlay : {
          backgroundColor : "rgba(15, 15, 15, 0.79)",
        },
      }}
    >
      <div>
        <div id="registerPopup"> 
          <div className="content">
            <TextBox 
              className="regTextBox" 
              id="regId"
              type="text"
              value={regId}
              placeholder="이메일" 
              onChange={({ target: { value } }) => setId(value)}
            />
            <TextBox 
              className="regTextBox" 
              id="regPw"
              type="password"
              value={regPw}
              placeholder="비밀번호" 
              onChange={({ target: { value } }) => setPw(value)}
            />
            <TextBox 
              className="regTextBox" 
              id="regNm"
              type="text"
              value={regNm}
              placeholder="이름" 
              onChange={({ target: { value } }) => setNm(value)}
            />
            <TextBox 
              className="regTextBox" 
              id="regBd"
              type="text"
              value={regBd}
              placeholder="생년월일" 
              onChange={({ target: { value } }) => setBd(value)}
            />
            <div className="flexWrapperTwo">
              <Button 
                label="Close" 
                className="subButton largeButton mr8"
                onClick={confirmPopupOnOff}
              />
              <Button 
                label="Confirm" 
                className="mainButton largeButton"
                onClick={function() {
                  var regCheck = join_vali(regId, regPw, regNm);

                  if(regCheck === "") {
                    regCheck = Birth_vali(regBd);
                    if(regCheck === ""){
                      addMember(regId, regPw, regNm, regBd); // DB 반영
                    }
                  }

                  if(regCheck !== ""){
                    props.onClick('fail', regCheck);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <ConfirmPopup
          content="회원가입을 취소하겠습니까?" 
          confirmPopupOnOff={confirmPopupOnOff}
          confirmPopupCondition={conditionConfirmPopup}
          onClick={function() {
            props.registerPopupModalonoff();
            confirmPopupOnOff();
            infoReset();
          }}
        />
      </div>
    </Modal>
  );
};

function join_vali(regId, regPw, regNm) {
	var RegExp = /^[a-zA-Z0-9]{4,15}$/;
  var e_RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  var n_RegExp = /^[가-힣]{2,15}$/;

	if (!regId) {
    return "E-mail을 입력해 주세요";
  }
	if (!e_RegExp.test(regId)) {
    return "올바른 이메일 형식이 아닙니다.";
  }
	if (!regPw) {
    return "password 를 입력해 주세요";
  }
	if (!RegExp.test(regPw)) {
    return "Password는 4~15자의 영문 대소문자와 숫자로만 입력하여 주세요.";
  }
	if (!regNm) {
    return "성함을 입력해 주세요";
  }
	if (!n_RegExp.test(regNm)) {
    return "이름에 특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.";
  }
  return "";
};

function Birth_vali(_inputBd) {
  var Bd_exp = /^(\(?\+?[0-9]*\)?)?[0-9_\- ]*$/
  var year = Number(_inputBd.substr(0,4)); // 입력한 값의 0~4자리까지 (연) 
  var month = Number(_inputBd.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
  var day = Number(_inputBd.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
  var today = new Date();
  var yearNow = today.getFullYear();
  
  if (_inputBd === undefined) {
    return "생년월일을 입력해주세요";
  }
  
  if (_inputBd.length !== 8 || !Bd_exp.test(_inputBd)) {
    return "년도 4자리를 포함한 8자리숫자로 적어주세요";
  } else if (1900 > year || year > yearNow) {
    return "1900년~"+yearNow+"년 사이를 입력해주세요";
  } else if (month < 1 || month > 12) {
    return "정확한 달(월)을 입력해주세요"; 
  } else if (day < 1 || day > 31) {
    return "정확한 날(일) 을 입력해주세요"; 
  } else if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
    return "정확한 날(일) 을 입력해주세요"; 
  } else if (month === 2) { 
    var leapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)); 
    if (day>29 || (day === 29 && !leapYear)) {
      return "정확한 날(일) 을 입력해주세요"; 
    }
  }
  return "";
}

export default RegisterPopup;