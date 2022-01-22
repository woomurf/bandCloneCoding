import React from "react";
import '../scss/common.scss';
import '../scss/component.scss';

class Button extends React.PureComponent {
  state = {
    activeYn: false
  }
  
  render() {
    return (
      <div 
        className={'noDrag button ' + (this.props.className)}
        onMouseDown={this.btnState.bind(this, true)}
        onMouseUp={this.btnState.bind(this, false)}
        onMouseLeave={this.btnState.bind(this, false)}
        onClick={this.props.onClick}
      >
        <div className={(this.state.activeYn ? 'pushButton' : '')}>
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