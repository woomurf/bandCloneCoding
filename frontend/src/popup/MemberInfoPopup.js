import React, {useState} from "react";
import Button from '../component/Button';
import TextBox from '../component/TextBox';
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import axios from "axios";
import Modal from "react-modal";
import '../scss/page.scss';
import '../scss/common.scss';
import '../scss/popup.scss';

const MemberInfoPopup = (props) => {

  const [modifyInfo, setModifyInfo] = useState(false);
  const [modifyNm, setNm] = useState("");
  const [modifyBd, setBd] = useState("");

  const modifyInfoOnOff = () => {
    setModifyInfo(
      !modifyInfo
    )
  }
  const setBirthdayFormet = (birth) => {
    return birth.substr(0,4) + "년 " 
    + birth.substr(5,2) + "월 " 
    + birth.substr(8,2) + "일생";
  }

  const modifyMember = async (email, modNm, modBd) => {
    var checkResult;
    var alertContent = 'fail';
    const year = Number(modBd.substr(0,4)); // 입력한 값의 0~4자리까지 (연) 
    const month = Number(modBd.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
    const day = Number(modBd.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
    const birth = year + "-" + month + "-" + day;
    await axios.put('/user/' + email, {
      name : modNm,
      birth : birth,
      profileImageUrl : ""
    }).then(res => {
      console.log(res);
      checkResult = 'success';
      alertContent = "수정이 완료되었습니다."
      props.onClick(checkResult,alertContent);
      setNm(modNm);
      setBd(modBd);
      modifyInfoOnOff();
    }).catch(function(err){
      console.log(err);
      checkResult = "err"
      alertContent = "수정에 실패했습니다.\n 다시 한번 시도해주세요."
      props.onClick(checkResult,alertContent);
    })
  }

  return (
    <Modal 
      className="modal"
      isOpen={props.memberInfoPopupCondition}
      ariaHideApp={false}
      onRequestClose={props.memberInfoPopupOnOff}
      style={{
        overlay : {
          backgroundColor : "rgba(15, 15, 15, 0.79)",
        },
      }}
    >
      <div id="memberInfoPopup"> 
        <div className="content">
          <div className="profileInfo">
            <img 
              alt="" 
              src={props.profileImage || DefaultProfileImage} 
              className="infoProfileImage"
            /> 
            {!modifyInfo &&
              <div className="text taCenter">
                {props.name} <br/>
                {props.email} <br/>
                {setBirthdayFormet(props.birth)}
              </div>
            } {modifyInfo &&
              <div className="pt10">
                <TextBox 
                  className="modifyTextBox" 
                  id="modifyNm"
                  type="text"
                  value={modifyNm}
                  placeholder="이름" 
                  onChange={({ target: { value } }) => setNm(value)}
                />
                <TextBox 
                  className="modifyTextBox" 
                  id="modifyBd"
                  type="text"
                  value={modifyBd}
                  placeholder="생년월일" 
                  onChange={({ target: { value } }) => setBd(value)}
                />
              </div>
            }
          </div>
          <div className={"btn mt8" + (props.myInfoYn? " flexWrapperTwo" : "")}>
            <Button 
              label={modifyInfo? "Cancel" : "Close"} 
              className={"subButton smallButton" + (props.myInfoYn? " mr8" : "")}
              onClick={function(){
                if (modifyInfo) {
                  modifyInfoOnOff();
                } else {
                  props.memberInfoPopupOnOff();
                }
              }}
            /> 
            {props.myInfoYn && 
              <Button 
                label={modifyInfo? "Confirm" : "Modify"} 
                className="mainButton smallButton"
                onClick={function(){
                  if (modifyInfo) {
                    let modifyCheck = join_vali(modifyNm);
  
                    if(modifyCheck === "") {
                      modifyCheck = Birth_vali(modifyBd);
                      if(modifyCheck === ""){
                        modifyMember(props.email, modifyNm, modifyBd); // DB 반영
                      }
                    }
  
                    if(modifyCheck !== ""){
                      props.onClick('fail', modifyCheck);
                    }
                  } else {
                    setNm(props.name);
                    const birthNum = props.birth.substr(0, 4) + props.birth.substr(5, 2) + props.birth.substr(8, 2);
                    setBd(birthNum);
                    modifyInfoOnOff();
                  }
                }}
              />
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}

function join_vali(modNm) {
  var n_ModExp = /^[가-힣]{2,15}$/;

	if (!modNm) {
    return "성함을 입력해 주세요";
  }
	if (!n_ModExp.test(modNm)) {
    return "이름에 특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.";
  }

  return "";
};

function Birth_vali(modBd) {
  var Bd_exp = /^(\(?\+?[0-9]*\)?)?[0-9_\- ]*$/
  var year = Number(modBd.substr(0,4)); // 입력한 값의 0~4자리까지 (연) 
  var month = Number(modBd.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
  var day = Number(modBd.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
  var today = new Date();
  var yearNow = today.getFullYear();
  
  if (modBd === undefined) {
    return "생년월일을 입력해주세요";
  }
  
  if (modBd.length !== 8 || !Bd_exp.test(modBd)) {
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

export default MemberInfoPopup;