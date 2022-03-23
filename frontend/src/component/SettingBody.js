import React, { Component } from "react";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class SettingBody extends Component {
  render() {
    const informationsData = this.props.informations;

    return (
      <div className="settingBody">
        <div className="settingMenuBox">
          <div className="settingHeadTitle">
            {this.props.headTitle}
          </div>
          <div className="settingLine"/>
        </div>
        {informationsData.map((informations, i) => {
          return(
            <div className="settingMenuBox" key={i}>
              <div className="settingMenuBody">
                <div className="settingTitleExplain">
                  <div className="settingTitle">
                    {informations.title}
                  </div>
                  {informations.explain && (
                    <div className="settingExplain">
                      {informations.explain}
                    </div>
                  )}
                </div>
                <div className="settingChangeButton">
                  <button className="settingButton"> 변경 </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
  };
};

export default SettingBody;