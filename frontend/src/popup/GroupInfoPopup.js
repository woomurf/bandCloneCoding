import React, {useState} from "react";
import Button from '../component/Button';
import TextBox from '../component/TextBox';
import DefaultProfileImage from '../image/Sky.png';
import axios from "axios";
import Modal from "react-modal";
import { textResize } from '../util';
import '../scss/page.scss';
import '../scss/common.scss';
import '../scss/popup.scss';

const GroupInfoPopup = (props) => {
  const groupInfo = props.groupInfo;
  const [isModify, setIsModify] = useState(false);
  const [modifyName, setName] = useState("");
  const [modifyDescription, setDescription] = useState("");
  const [modifyProfileImageUrl, setProfileImageUrl] = useState("");

  const modifyGroup = async () => {
    var alertContent = 'error';
    await axios.put('/group/' + groupInfo.id, {
      name : modifyName,
      description : modifyDescription,
      profileImageUrl : modifyProfileImageUrl
    }).then(function() {
      alertContent = "수정이 완료되었습니다."
      setIsModify(!isModify);
    }).catch(function() {
      alertContent = "수정에 실패했습니다.\n 다시 한번 시도해주세요."
    });
    props.callAlert(alertContent);
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
              src={groupInfo.profileImageUrl || DefaultProfileImage} 
              className="infoProfileImage"
              onClick={function(e) {
                console.log(e.target.value)
                if (e.target.value === "임시입니다.") {
                  setProfileImageUrl(e.target.value); //이미지 적용 전까지 임시
                }
              }}
            /> 
            {!isModify &&
              <div className="text taCenter">
                {groupInfo.name} <br/><br/>
                {groupInfo.description} <br/>
              </div>
            } {isModify &&
              <div className="pt10">
                <TextBox 
                  className="modifyTextBox_2" 
                  id="modifyName"
                  type="text"
                  value={modifyName}
                  placeholder="이름" 
                  onChange={function(e) {
                    if (e.target.value.length < 15) {
                      setName(e.target.value);
                    }
                  }}
                />
                <div className="modifyTextAreaOutLine">
                  <textarea 
                    className="modifyTextArea"
                    id="modifyDescription"
                    type="text"
                    value={modifyDescription}
                    placeholder="소개글" 
                    onKeyUp={(e) => textResize(e, '15px')}
                    onKeyDown={(e) => textResize(e, '15px')}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={100}
                  />
                </div>
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
                  modifyGroup(); // DB 반영
                } else {
                  setName(groupInfo.name);
                  setDescription(groupInfo.description)
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