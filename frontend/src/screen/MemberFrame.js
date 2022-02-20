import React, {Component} from "react";
import '../scss/page.scss';

class MemberFrame extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div id="pageBody">
        <div id="leftFrame">
          <div className="Box" onClick={function(e){
            alert("로그인화면으로");
            // this.props.onClick("");
          }.bind(this)}/>
        </div>
        <div id="centerFrame">
          <div id="postList">
            <div className="postBox"/>
            <div className="postBox"/>
            <div className="searchBox">
              아무튼 여기가 멤버
            </div>
            <div className="postBox"/>
            <div className="postBox"/>
            <div className="postBox"/>
          </div>
        </div>
        <div id="rightFrame">
          <div className="Box"/>
        </div>
      </div>
    );
  }
};

export default MemberFrame;