import React, {Component} from "react";
import Calendar from '../component/Calendar';
import '../scss/page.scss';
import '../scss/calendar.css';

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
          <div className="Box" onClick={function(e){
            alert("로그인화면으로");
            this.props.onClick("");
          }.bind(this)}/>
        </div>
        <div id="centerFrame">
          <div id="postList">
            <Calendar/>
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