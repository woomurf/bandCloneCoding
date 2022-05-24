import React, {useState,useRef,useEffect} from "react";
import axios from "axios";
import SeeMore from '../image/See_More.png';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

const SeeMorePopup = (props) => {

  const [conditionSeemore, setConditionSeemore] = useState(false);

  const wrapperRef = useRef();

  const onClickOutside = e => {
    if(conditionSeemore && (!wrapperRef || !wrapperRef.current.contains(e.target))) 
      setConditionSeemore(false)
  }

  useEffect(() => {
    window.addEventListener('mousedown', onClickOutside);

    return () => {
      window.removeEventListener('mousedown', onClickOutside);
    };
  });

  const seeMorePopupOnOff = () => {
    setConditionSeemore(
      !conditionSeemore
    )
  }

  const deletePost = () => {
    axios.delete(`/post/${props.postId}`)
    .then(res => {
      // do you want delete? => *TODO* confirmPopup create
      props.updatePostList();
      seeMorePopupOnOff();
    })
    .catch(err => {
      props.postErrorPopup();
    })
  }
  
    return (
      <div className="moreIcon">
        <button className="postMoreMenuBtn">
          <img 
            alt="" 
            src={SeeMore} 
            onClick={seeMorePopupOnOff}
          />
        </button>
        {conditionSeemore && 
          <div 
            id="seeMorePopup" 
            ref={wrapperRef}
          > 
            <div className="content">
              <li 
                className="moreContent"
                onClick={props.modifyPopupOnOff}
              >
                수정
              </li>
              <li className="moreContent"
                onClick={deletePost}
              >
                삭제
              </li>
            </div>
          </div>
        }
    </div>
    );
  }

export default SeeMorePopup;