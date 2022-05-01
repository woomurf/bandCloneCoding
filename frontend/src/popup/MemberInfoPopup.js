import React ,{useState} from "react";
import Button from '../component/Button';
import DefaultProfileImage from "../image/DefaultProfileImage.png";
import Modal from "react-modal";
import '../scss/page.scss';
import '../scss/common.scss';
import '../scss/popup.scss';

const MemberInfoPopup = (props) => {

  const [modal, setModal] = useState(true); // 모달창

  const MemberInfoPopupOff = () => {
    setModal(false);
  };  

  const setBirthdayFormet = (birthday) => {
    return birthday.substring(0,4) + "년 " 
    + birthday.substring(4,6) + "월 " 
    + birthday.substring(6,8) + "일생";
  }

    return (
      <>
      <Modal className="modal"
        isOpen={modal}
        ariaHideApp={false}
        onRequestClose={MemberInfoPopupOff}
        style={{
          overlay: {
            backgroundColor: "rgba(15, 15, 15, 0.79)",
          },
        }}
      >
        <div id="memberInfoPopup"> 
          <div className="content">
            <div className="profileInfo">
              <img alt="" src={props.profileImage || DefaultProfileImage} className="infoProfileImage"/>  
              <div className="text taCenter">
                {props.name} <br/>
                {props.email} <br/>
                {setBirthdayFormet(props.birthday)}
              </div>
            </div>
            <div className="btn">
              <Button 
                label="Close" 
                className="subButton smallButton mt8"
                onClick={MemberInfoPopupOff}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
    );
  }

export default MemberInfoPopup;