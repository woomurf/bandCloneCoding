import React, {Component} from "react";
import TextButton from '../component/TextButton';
import '../scss/popup.scss';

class SettingPopup extends Component {
  render() {
    return (
      <div id="settingPopup"> 
        <div className="content">
          {this.props.menuList.map((menu,index) => {
            return(
              <div key={index}>
                <TextButton
                  label={menu}
                  className="text"
                  selectYn={false}
                  onClick={this.props.onClickMenu.bind(this, menu)}
                />
                <div className={index+1 !== this.props.menuList.length ? "divPoint" : ""}/>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
};

export default SettingPopup;