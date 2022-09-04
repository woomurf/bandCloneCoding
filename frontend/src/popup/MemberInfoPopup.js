import React, {useState} from "react";
import Button from '../component/Button';
import TextBox from '../component/TextBox';
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import axios from "axios";
import Modal from "react-modal";
import '../scss/page.scss';
import '../scss/common.scss';
import '../scss/popup.scss';
import CameraIcon from '../image/camera.png';
import { uploadImage } from '../util';

const MemberInfoPopup = (props) => {
  const memberInfo = props.memberInfo;
  const [isModify, setIsModify] = useState(false);
  const [modifyName, setName] = useState("");
  const [modifyBirth, setBirth] = useState("");
  const [previewImage, setPreviewImage] = useState(memberInfo.profileImageUrl);

  const modifyMember = async (profileImageUrl = undefined) => {
    var alertContent = 'error';
    const year = Number(modifyBirth.substring(0,4)); // 입력한 값의 0~4자리까지 (연) 
    const month = Number(modifyBirth.substring(4,6)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
    const day = Number(modifyBirth.substring(6,8)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
    const birth = year + "-" + month + "-" + day;

    const updateBody = {
      name: modifyName,
      birth
    }
    if (profileImageUrl) {
      updateBody['profileImageUrl'] = profileImageUrl;
    }

    await axios.put('/user/' + memberInfo.id, updateBody).then(function() {
      alertContent = "수정이 완료되었습니다."
    }).catch(function() {
      alertContent = "수정에 실패했습니다.\n 다시 한번 시도해주세요."
    });
    props.onClick(alertContent);
  }

  const updateProfileImage = async () => {
    const file = document.getElementById('updateProfileImageButton').files[0];
    if (file) {
      const { url } = await uploadImage(file);
      return url;
    }
    return undefined;
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
            <div>
              <img 
                alt="" 
                src={previewImage || DefaultProfileImage}
                className={`infoProfileImage + ${isModify && 'margin-left-30'}`} // FIXME(hyeonwoong): 더 좋은 방법으로... 알아보자 ㅠㅠㅠ
              />
              {isModify &&
              <>
                <label for="updateProfileImageButton">
                  <img
                    className='updateProfileImageLabel'
                    src={CameraIcon}
                    alt="ProfileImageUpdateBtn"
                  />
                </label>
                <input
                  type="file"
                  id="updateProfileImageButton"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setPreviewImage(URL.createObjectURL(file));
                  }}
                />
              </>
              }
            </div>
            {!isModify &&
              <div className="text taCenter">
                {memberInfo.name} <br/>
                {memberInfo.email} <br/>
                {memberInfo.birth.substring(0,4) + "년 " 
                + memberInfo.birth.substring(5,7) + "월 " 
                + memberInfo.birth.substring(8,10) + "일생"}
              </div>
            } {isModify &&
              <div className="pt10">
                <TextBox 
                  className="modifyTextBox" 
                  id="modifyName"
                  type="text"
                  value={modifyName}
                  placeholder="이름" 
                  onChange={(e) => setName(e.target.value)}
                />
                <TextBox 
                  className="modifyTextBox" 
                  id="modifyBirth"
                  type="text"
                  value={modifyBirth}
                  placeholder="생년월일" 
                  onChange={(e) => setBirth(e.target.value)}
                />
              </div>
            }
          </div>
          <div className={"btn mt8" + (props.isMyInfo ? " flexWrapperTwo" : "")}>
            <Button 
              label={isModify ? "Cancel" : "Close"} 
              className={"subButton smallButton" + (props.isMyInfo ? " mr8" : "")}
              onClick={function(){
                if (isModify) {
                  setIsModify(!isModify);
                } else {
                  props.memberInfoPopupOnOff();
                }
              }}
            /> 
            {props.isMyInfo && 
              <Button 
                label={isModify ? "Confirm" : "Modify"} 
                className="mainButton smallButton"
                onClick={async function () {
                  if (isModify) {
                    let modifyCheck = nameValidation(modifyName);
  
                    if(modifyCheck.valid) {
                      modifyCheck = birthValidation(modifyBirth);
                      if(modifyCheck.valid){
                        const url = await updateProfileImage();
                        modifyMember(url); // DB 반영
                      }
                    }
  
                    if(!modifyCheck.valid){
                      props.onClick(modifyCheck.message);
                    }
                  } else {
                    setName(memberInfo.name);
                    setBirth(
                      memberInfo.birth.substring(0, 4)
                      + memberInfo.birth.substring(5, 7)
                      + memberInfo.birth.substring(8, 10)
                    );
                    setIsModify(!isModify);
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

function nameValidation(modName) {
  const nameRegex = /^[가-힣]{2,15}$/;
  let retString = "";

	if (!modName) {
    retString = "성함을 입력해 주세요";
  } else if (!nameRegex.test(modName)) {
    retString = "이름에 특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.";
  }

  return { valid: retString === "" ? true : false, message: retString };
};

function birthValidation(modBirth) {
  var Birth_exp = /^(\(?\+?[0-9]*\)?)?[0-9_\- ]*$/
  var year = Number(modBirth.substring(0,4)); // 입력한 값의 0~4자리까지 (연) 
  var month = Number(modBirth.substring(4,6)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
  var day = Number(modBirth.substring(6,8)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
  var today = new Date();
  var yearNow = today.getFullYear();
  let retString = "";
  
  if (modBirth === undefined) {
    retString = "생년월일을 입력해주세요";
  } else if (modBirth.length !== 8 || !Birth_exp.test(modBirth)) {
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
    var leapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)); 
    if (day>29 || (day === 29 && !leapYear)) {
      retString = "정확한 날(일) 을 입력해주세요"; 
    }
  }
  return { valid: retString === "" ? true : false, message: retString };
}

export default MemberInfoPopup;