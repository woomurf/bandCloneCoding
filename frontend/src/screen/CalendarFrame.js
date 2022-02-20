import React, {Component} from "react";
import '../scss/page.scss';

class CalendarFrame extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div id="pageBody">
        <div id="leftFrame">
          <div className="Box" onClick={function(){
            alert("로그인화면으로");
            // this.props.onClick("");
          }}/>
        </div>
        <div id="centerFrame">
          <div id="postList">
            <div className="postBox"/>
            <div className="searchBox">
              아무튼 여기가 캘린더
            </div>
            <div className="postBox"/>
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

export default CalendarFrame;