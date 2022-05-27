import React, {Component} from "react";
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class Schedule extends Component{
  render(){
    return(
      <div className="postSchedule">
        <div className="scheduleBox">
          <div className="scheduleHead">
            <div className="scheduleDate">
              {this.props.scheduleDate}
            </div>
            <div className="scheduleDay">
              {this.props.scheduleDay}
            </div>
          </div>
          <div className="scheduleBody">
            <div className="scheduleName">
              {this.props.scheduleName}
            </div>
            <div className="scheduleDDay">
              {this.props.scheduleDDay}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Schedule;