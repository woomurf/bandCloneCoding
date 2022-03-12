import React, {Component} from "react";
import '../scss/page.scss';

class SettingFrame extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div id="centerFrame">
        <div id="settingList">
            <div className="settingBox">
                암튼 설정 머시기
            </div>
        </div>
      </div>
    );
  }
};

export default SettingFrame;