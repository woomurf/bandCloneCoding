import React, {useState} from "react";
import Button from '../component/Button';
import TextBox from '../component/TextBox';
import DefaultProfileImage from '../image/Sky.png';
import axios from "axios";
import Modal from "react-modal";
import '../scss/page.scss';
import '../scss/common.scss';
import '../scss/popup.scss';

const GroupInfoPopup = (props) => {

  const [isModify, setIsModify] = useState(false);
  const [modifyName, setName] = useState("");
  const [modifyDescription, setDescription] = useState("");

  const modifyGroup = async (id, modName, modDes) => {
    var checkResult;
    var alertContent = 'fail';
    await axios.put('/group/' + id, {
      name : modName,
      description : modDes,
      profileImageUrl : ""
    }).then(function() {
      checkResult = 'success'; //TODO checkResult enum 으로 변경
      alertContent = "수정이 완료되었습니다."
      props.onClick(checkResult,alertContent);
      setName(modName);
      setDescription(modDes);
      setIsModify(!isModify);
    }).catch(function() {
      checkResult = "err"
      alertContent = "수정에 실패했습니다.\n 다시 한번 시도해주세요."
      props.onClick(checkResult,alertContent);
    })
  }

  return (
    <Modal 
      className="modal"
      isOpen={props.groupInfoPopupCondition}
      ariaHideApp={false}
      onRequestClose={props.groupInfoPopupOnOff}
      style={{
        overlay : {
          backgroundColor : "rgba(15, 15, 15, 0.79)",
        },
      }}
    >
      <div id="groupInfoPopup"> 
        <div className="content">
          <div className="profileInfo">
            <img 
              alt="" 
              src={props.groupInfo.profileImageUrl || DefaultProfileImage} 
              className="infoProfileImage"
            /> 
            {!isModify &&
              <div className="text taCenter">
                {props.groupInfo.name} <br/><br/>
                {props.groupInfo.description} <br/>
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
                  id="modifyDescription"
                  type="text"
                  value={modifyDescription}
                  placeholder="소개글" 
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            }
          </div>
          <div className={"btn mt8 flexWrapperTwo"}>
            <Button 
              label={isModify ? "Cancel" : "Close"} 
              className={"subButton smallButton mr8"}
              onClick={function(){
                if (isModify) {
                  setIsModify(!isModify);
                } else {
                  props.groupInfoPopupOnOff();
                }
              }}
            /> 
            <Button 
              label={isModify ? "Confirm" : "Modify"} 
              className="mainButton smallButton"
              onClick={function(){
                if (isModify) {
                  modifyGroup(props.groupInfo.id, modifyName, modifyDescription); // DB 반영
                } else {
                  setName(props.groupInfo.name);
                  setDescription(props.groupInfo.description)
                  setIsModify(!isModify);
                }
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default GroupInfoPopup;