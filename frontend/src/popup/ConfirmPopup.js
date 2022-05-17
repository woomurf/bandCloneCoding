import React from "react";
import Button from '../component/Button';
import Modal from 'react-modal'
import '../scss/common.scss';
import '../scss/popup.scss';

const ConfirmPopup = (props) => {

  return (
    <Modal className="modal"
      isOpen={props.confirmPopupCondition}
      ariaHideApp={false}
      onRequestClose={props.confirmPopupOnOff}
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
                onClick={function(){
                  props.onClick();
                  props.confirmPopupOnOff();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmPopup;