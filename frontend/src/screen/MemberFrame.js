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
      <div id="centerFrame">
        <div id="postList">
          <div className="searchBox">
            아무튼 여기가 멤버
          </div>
          <div className="postBox"/>
          <div className="postBox"/>
          <div className="postBox"/>
          <div className="postBox"/>
          <div className="postBox"/>
        </div>
      </div>
    );
  }
};

export default MemberFrame;