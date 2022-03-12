import React, {Component} from "react";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class SettingBody extends Component {
    render() {
        const arr = this.props.arr
        return (
            
            <div className="settingBody">
                <div className="settingMenuBox">
                    <div className="settingHeadTitle">
                        {this.props.headTitle}
                    </div>
                    <div className="settingLine"/>
                </div>

{arr.map((arr1, i)=>{
    return(
                <div className="settingMenuBox" key={i}>
                    <div className="settingMenuBody">
                        <div className="settingTitleExplain">
                            <div className="settingTitle">
                                {arr1.title}
                            </div>
                            {arr1.explain && (
                                <div className="settingExplain">
                                    {arr1.explain}
                                </div>)
                            }
                        </div>
                        <div className="settingChangeButton">
                            <button className="settingButton">변경</button>
                        </div>
                    </div>
                </div>
)})}
            </div>
        );
    }
};

export default SettingBody;