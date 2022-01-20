import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../scss/common.scss';
import '../scss/component.scss';

class DateSelecter extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputBd: new Date(this.props.setDt)
    }
  }

  render() {
    return (
      <div className="datePicker">
        <DatePicker 
          className="datePicker_input"
          selected={this.state.inputBd}
          dateFormat="yyyy/MM/dd"
          minDate={new Date("1990/01/01")}
          maxDate={new Date("2009/12/31")}
          onChange={function(date){
            this.setState({
              inputBd: date,
            });
            this.props.onChange(date);
          }.bind(this)}
        />
      </div>
    );
  }
};

export default DateSelecter;