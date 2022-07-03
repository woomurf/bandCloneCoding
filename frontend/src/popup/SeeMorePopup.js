import React, {useState,useRef,useEffect} from "react";
import SeeMore from '../image/See_More.png';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

const SeeMorePopup = (props) => {

  const [conditionSeemore, setConditionSeemore] = useState(false);
  const wrapperRef_1 = useRef();
  const wrapperRef_2 = useRef();

  const onClickOutside = (e) => {
    if (conditionSeemore && (wrapperRef_1 && !wrapperRef_1.current.contains(e.target))
      && (wrapperRef_2 && !wrapperRef_2.current.contains(e.target))) {
      setConditionSeemore(false)
    }
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

  return (
    <div className="moreIcon">
      <button className="postMoreMenuBtn">
        <img 
          alt="" 
          src={SeeMore} 
          onClick={seeMorePopupOnOff}
          ref={wrapperRef_1}
        />
      </button>
      {conditionSeemore && 
        <div 
          id="seeMorePopup" 
          ref={wrapperRef_2}
        > 
          <div className="content">
            <li 
              className="moreContent"
              onClick={function(e){
                props.modifyCommand(props.contentId);
                seeMorePopupOnOff();
              }}
            >
              수정
            </li>
            <li className="moreContent"
              onClick={function(){
                props.deleteCommand(props.contentId);
                seeMorePopupOnOff();
              }}
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
