import React, { useRef, useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import Picture from '../image/Picture.png';
import Upload_Button from '../image/Upload_Button.png'
import { uploadImage } from "../util";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'


const Postuploadbox = (props) => {
  const [value, contentValue] = useState("")
  const [fileImage, setFileImage] = useState("");
  const [modal, setModal] = useState(false);

  const setModalon = () =>{
    setModal(true)
  }

  const setModaloff = () =>{
    setModal(false)
  }

  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const updateImage  = async() => {
    const file = document.getElementById("imageFile").files[0];
    return await uploadImage(file);
  }

  const handleChange = (e) => {
      contentValue(e.target.value)
  }

  const handleSubmit = async(fileUrl) => {
      /* 추후 이미 여러장 올릴수있게 할것 */
    axios.post('/post', {
      content: value,
      groupId: 1,
      files: [{ url: fileUrl.url, type: "image" }]
    }).then(res => {
      props.updatePostList();
      setFileImage("")
      contentValue("")
    }).catch(err => {
      props.postErrorPopup();
    })
  }

  const textRef = useRef("");

  const textResize = () => {
    const textAreaBox = textRef.current;
    textAreaBox.style.height = 'auto';
    textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
  }

    return (
      <div className="postuploadbox">
        <div className="postuploadDiv">
          <Modal className="modal"
          isOpen={modal}
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: "rgba(15, 15, 15, 0.79)",
            },
          }}
        >
          <div id="fileImageMore">
            <img
              alt=""
              src={fileImage}
              onClick={setModaloff}
            />
          </div>
        </Modal>
          <textarea 
            type="text" 
            rows="4" 
            placeholder="새로운 소식을 남겨보세요." 
            className="postupload"
            maxLength={3000}
            ref={textRef}
            onKeyUp={textResize}
            onKeyDown={textResize}
            value={value}
            onChange={handleChange}
            src={fileImage}
          />
          {fileImage &&
          <div id="imagePreview">
            <div> 이미지 미리보기 </div>
            <img
              alt=""
              id="fileImage"
              src={fileImage}
              onClick={setModalon}
            />
          </div>
          }
        </div>
        <div className="pictureImage">
          <div>
            <label>
              <div className="imageFile">
                <input 
                  id="imageFile"
                  type="file" 
                  accept="image/*"
                  onChange={saveFileImage}
                />
              </div>
              <img
                alt=""
                src={Picture}
                className="pictureImage" 
                id="pictureImage"
              />
            </label>
          </div>
          <div>
            <img 
              alt="" 
              className="uploadButton" 
              src={Upload_Button} 
              id="uploadButton" 
              onClick={async function(){
                const url = await updateImage();
                await handleSubmit(url);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

export default Postuploadbox;