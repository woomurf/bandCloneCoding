import React,{useState} from "react";
import Button from '../component/Button';
import Modal from 'react-modal'

const AlertPopup = (props) => {

  const [modal, setModal] = useState(true); // 모달창

  const alertPopupOff = () => {
    setModal(false);
  };  

  return (
    <>
    <Modal className="modal"
      isOpen={modal}
      ariaHideApp={false}
      onRequestClose={alertPopupOff}
      style={{
        overlay: {
          backgroundColor: "rgba(15, 15, 15, 0.79)",
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
              onClick={alertPopupOff}
            />
          </div>
        </div>
      </div>
    </Modal>
    </>
  );
}

export default AlertPopup;