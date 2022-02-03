import React, {Component} from "react";
import vector from '../image/Vector.png';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/screen.scss'

class Main_Lside extends Component {
    render() {
        return (
            <div id="main_Lside">
            <div className="bandImage" onClick={function(e){
              alert("로그인화면으로");
              this.props.onClick("");
            }.bind(this)}
            >
            <img alt="" className="bandImage" src={this.props.bandImage} id="bandImage"/>
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
            <div className="line"></div>
            <div className="setting">
            <div className="vectorImage">
              <img alt="" className="vectorImage" src={vector} id="vectorImage"/>
            </div>
            <div className="bandSetting">
              밴드설정
            </div>
            </div>
          </div>
      );
    }
};

export default Main_Lside;