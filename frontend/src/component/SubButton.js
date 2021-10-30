import React, {Component} from "react";
import '../scss/base.scss';
import '../scss/component.scss';

class Button extends Component {
  render() {
    return (
      <div className={"sub_button " + (this.props.clsNm)}>
        <p className="sub_push">{this.props.title}</p>
      </div>
    );
  }
};

export default Button;