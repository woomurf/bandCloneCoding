import React from "react";
import Button from '../component/Button';
import Modal from 'react-modal'

const AlertPopup = (props) => {
  return (
    <Modal 
      className="modal"
      isOpen={props.alertPopupCondition}
      ariaHideApp={false}
      onRequestClose={props.alertPopupOnoff}
      style={{
        overlay : {
          backgroundColor : "rgba(15, 15, 15, 0.79)",
        },
      }}
    >
      <div id="alertPopup"> 
        <div className="content">
          <div className="text">
            {props.content}
          </div>
          <div className="btn">
            <Button 
              label="Close" 
              className="subButton smallButton mt8"
              onClick={props.alertPopupOnoff}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AlertPopup;