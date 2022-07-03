import React from "react";
import Button from '../component/Button';
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import Modal from "react-modal";
import '../scss/page.scss';
import '../scss/common.scss';
import '../scss/popup.scss';

const MemberInfoPopup = (props) => {
  const setBirthdayFormet = (birth) => {
    return birth.substring(0,4) + "년 " 
    + birth.substring(5,7) + "월 " 
    + birth.substring(8,10) + "일생";
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
            <div className="text taCenter">
              {props.name} <br/>
              {props.email} <br/>
              {setBirthdayFormet(props.birth)}
            </div>
          </div>
          <div className={"btn mt8" + (props.myInfoYn? " flexWrapperTwo" : "")}>
            <Button 
              label="Close" 
              className={"subButton smallButton" + (props.myInfoYn? " mr8" : "")}
              onClick={props.memberInfoPopupOnOff}
            /> 
            {props.myInfoYn && 
              <Button 
                label="Modify" 
                className="mainButton smallButton"
                onClick={function(){
                  alert("수정 비스무리한걸 해야합니다..");
                }}
              />
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MemberInfoPopup;