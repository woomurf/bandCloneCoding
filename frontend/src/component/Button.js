import React from "react";
import '../scss/common.scss';
import '../scss/component.scss';

class Button extends React.PureComponent {
  render() {
    return (
      <div 
        className={'noDrag button ' + (this.props.className)}
        onClick={this.props.onClick}
      >
        <div>
          {this.props.label}
        </div>
      </div>
    );
  }
};

export default Button;