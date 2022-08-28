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
  const [regName, setName] = useState("");
  const [regBirth, setBirth] = useState("");

  const infoReset = () => {
    setId("");
    setPw("");
    setName("");
    setBirth("");
  }

  const confirmPopupOnOff = () => {
    confirmPopupCondition(
      !conditionConfirmPopup
    )
  }
  
  const addMember = async (regId, regPw, regName, regBirth) => {
    var checkResult;
    var alertContent = 'fail';
    const year = Number(regBirth.substring(0,4)); // 입력한 값의 0~4자리까지 (연) 
    const month = Number(regBirth.substring(4,6)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
    const day = Number(regBirth.substring(6,8)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
    await axios.post("/auth/register", {
      name : regName,
      email : regId,
      password : regPw,
      birth: year + "-" + month + "-" + day
    }).then(function() {
      checkResult = 'success';
      alertContent = "회원가입이 완료되었습니다."
      infoReset();
      props.registerPopupOnoff();
      props.callAlert(checkResult,alertContent);
    }).catch(function() {
      checkResult = "err"
      alertContent = "회원가입이 실패했습니다."
      props.callAlert(checkResult,alertContent);
    })
  }
  
  return (
    <Modal 
      className="modal"
      isOpen={props.registerPoupCondition}
      ariaHideApp={false}
      onRequestClose={props.registerPopupOnoff}
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
              onChange={(e) => setId(e.target.value)}
            />
            <TextBox 
              className="regTextBox" 
              id="regPw"
              type="password"
              value={regPw}
              placeholder="비밀번호" 
              onChange={(e) => setPw(e.target.value)}
            />
            <TextBox 
              className="regTextBox" 
              id="regName"
              type="text"
              value={regName}
              placeholder="이름" 
              onChange={(e) => setName(e.target.value)}
            />
            <TextBox 
              className="regTextBox" 
              id="regBirth"
              type="text"
              value={regBirth}
              placeholder="생년월일" 
              onChange={(e) => setBirth(e.target.value)}
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
                  var regCheck = joinValidation(regId, regPw, regName);

                  if (regCheck.valid) {
                    regCheck = birthValidation(regBirth);
                    if (regCheck.valid) {
                      addMember(regId, regPw, regName, regBirth); // DB 반영
                    }
                  }

                  if (!regCheck.valid) {
                    props.callAlert('fail', regCheck.message);
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
          onConfirmClick={function() {
            props.registerPopupOnoff();
            confirmPopupOnOff();
            infoReset();
          }}
        />
      </div>
    </Modal>
  );
};

function joinValidation(regId, regPw, regName) {
	var pwRegex = /^[a-zA-Z0-9]{4,15}$/;
  var emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  var nameRegex = /^[가-힣]{2,15}$/;
  let retString = "";

	if (!regId) {
    retString = "E-mail을 입력해 주세요";
  } else if (!emailRegex.test(regId)) {
    retString = "올바른 이메일 형식이 아닙니다.";
  } else if (!regPw) {
    retString = "password 를 입력해 주세요";
  } else if (!pwRegex.test(regPw)) {
    retString = "Password는 4~15자의 영문 대소문자와 숫자로만 입력하여 주세요.";
  } else if (!regName) {
    retString = "성함을 입력해 주세요";
  } else if (!nameRegex.test(regName)) {
    retString = "이름에 특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.";
  }

  return { valid: retString === "" ? true : false, message: retString };
};

function birthValidation(_inputBirth) { //TODO 공통함수로 빼기(이 외에도 생일 Formet 형식 변경하는 함수라든지 등등)
  var Birth_exp = /^(\(?\+?[0-9]*\)?)?[0-9_\- ]*$/
  var year = Number(_inputBirth.substring(0,4)); // 입력한 값의 0~4자리까지 (연) 
  var month = Number(_inputBirth.substring(4,6)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
  var day = Number(_inputBirth.substring(6,8)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
  var today = new Date();
  var yearNow = today.getFullYear();
  let retString = "";

  if (_inputBirth === undefined) {
    retString = "생년월일을 입력해주세요";
  } else if (_inputBirth.length !== 8 || !Birth_exp.test(_inputBirth)) {
    retString = "년도 4자리를 포함한 8자리숫자로 적어주세요";
  } else if (1900 > year || year > yearNow) {
    retString = "1900년~"+yearNow+"년 사이를 입력해주세요";
  } else if (month < 1 || month > 12) {
    retString = "정확한 달(월)을 입력해주세요"; 
  } else if (day < 1 || day > 31) {
    retString = "정확한 날(일) 을 입력해주세요"; 
  } else if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
    retString = "정확한 날(일) 을 입력해주세요"; 
  } else if (month === 2) { 
    const leapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)); 
    if (day>29 || (day === 29 && !leapYear)) {
      retString = "정확한 날(일) 을 입력해주세요"; 
    }
  }
  
  return { valid: retString === "" ? true : false, message: retString };
}

export default RegisterPopup;
