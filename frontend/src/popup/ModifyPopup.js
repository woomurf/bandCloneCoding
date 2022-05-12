import React ,{useState,useRef}from "react";
import Modal from "react-modal";
import Picture from '../image/Picture.png';
import Upload_Button from '../image/Upload_Button.png'
import axios from "axios";

const ModifyPopup = (props) => {

  const [value,setTextValue] = useState(props.content);
  const handleChange = (e) => {
    setTextValue(e.target.value)
  }

  const textRef = useRef("");

  const textResize = () => {
    const textAreaBox = textRef.current;
    textAreaBox.style.height = 'auto';
    textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
  }

  const handleSubmit = () => {
    axios.put(`/post/${props.postId}`, {
      content: value,
    }).then(res => {
      props.updatePostList(); 
      props.modifyPopupOnOff();
    }).catch(err => {
      props.postErrorPopup();
    })
  }

  return (
    <>
      <Modal className="modal"
        isOpen={true}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(15, 15, 15, 0.79)",
          },
        }}
      >
        <div id="modifyPopup"> 
          <div className="modifyPostuploadbox">
            <div className="modifyCancel">
              <button alt="" className="modifyCancelBtn"
                onClick={props.modifyPopupOnOff}
                >
                수정취소
              </button>
            </div>
            <div className="postupload">
              <textarea 
                type="text" 
                className="postupload"
                ref={textRef}
                onKeyUp={textResize}
                onKeyDown={textResize}
                value={value}
                onChange={handleChange}
              />
            </div>

            <div className="pictureImage">
              <div>
                <img alt="" className="pictureImage" src ={Picture} id="pictureImage"/>
              </div>
              <div>
                <img alt="" className="uploadButton" src ={Upload_Button} id="uploadButton"
                  onClick={handleSubmit}
                  />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModifyPopup;