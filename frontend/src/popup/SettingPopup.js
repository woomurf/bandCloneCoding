import React, {Component} from "react";
import TextButton from '../component/TextButton';
import '../scss/popup.scss';

const SettingPopup =(props) => {
  return (
    <div id="settingPopup"> 
      <div className="content">
        {props.menuList.map((menu,index) => {
          return(
            <div key={index}>
              <TextButton
                label={menu}
                className="text"
                selectYn={false}
                onClick={props.onClickMenu.bind(this, menu)}
              />
              <div className={index+1 !== props.menuList.length ? "divPoint" : ""}/>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default SettingPopup;