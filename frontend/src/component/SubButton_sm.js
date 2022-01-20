import React, {Component} from "react";
import '../scss/common.scss';
import '../scss/component.scss';

class Button extends Component {
  state = {
    activeYn: false
  }

  render() {
    return (
      <div 
        className={'noDrag sub_button_sm ' + (this.props.className)}
        onMouseDown={this.btnState.bind(this, true)}
        onMouseUp={this.btnState.bind(this, false)}
        onMouseLeave={this.btnState.bind(this, false)}
        onClick={this.props.onClick}
      >
        <div className={(this.state.activeYn ? 'sub_push' : '')}>
          {this.props.label}
        </div>
      </div>
    );
  }

  btnState(stateValue) {
    this.setState({
      activeYn: stateValue
    });
  }
};

export default Button;