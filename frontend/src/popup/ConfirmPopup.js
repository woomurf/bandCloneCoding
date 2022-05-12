import React, {useState} from "react";
import Button from '../component/Button';
import Modal from 'react-modal'
import '../scss/common.scss';
import '../scss/popup.scss';

const ConfirmPopup = (props) => {

  const [modal, setModal] = useState(true); // 모달창

  const confirmPopupOff = () => {
    setModal(false);
  }; 

  return (
    <>
    <Modal className="modal"
      isOpen={modal}
      ariaHideApp={false}
      onRequestClose={confirmPopupOff}
      style={{
        overlay: {
          backgroundColor: "rgba(15, 15, 15, 0.79)",
        },
      }}
    >
      <div id="confirmPopup"> 
        <div className="content">
          <div className="text">
            {props.content}
          </div>
          <div className="btn">
            <div className="flexWrapperTwo">
              <Button 
                label="Close" 
                className="subButton smallButton mr8"
                onClick={props.confirmPopupOnOff}
              />
              <Button 
                label="Confirm" 
                className="mainButton smallButton"
                onClick={function(e){
                  props.onClick();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
    </>
  );
}

export default ConfirmPopup;