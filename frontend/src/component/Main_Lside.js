import React, {Component} from "react";
import vector from '../image/Vector.png';
import TextButton from '../component/TextButton';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss';

class MainLside extends Component {
  render() {
    return (
      <div id="leftFrame">
        <div className="bandImage">
          <img alt="" className="bandImage" src={this.props.bandImage}/>
        </div>
        <div className="bandName">
          {this.props.bandName}
        </div>
        <div className="memberCount">
          {this.props.memberCount}
        </div>
        <div className="bandIntroduce">
          {this.props.bandIntroduce}
        </div>
        <div className="line"/>
        <div className="setting">
          <div className="vectorImage">
            <img alt=""  className="vectorImage" src={vector}/>
          </div>
          <div className="bandSetting">
            <TextButton
              label="밴드설정"
              className="mt4white"
              selectYn={this.props.selectYn}
              onClick={function() {
                this.props.onClick("setting");
              }.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default MainLside;