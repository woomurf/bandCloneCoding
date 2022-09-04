import React from "react";
import '../scss/common.scss';
import '../scss/component.scss';

class TextBox extends React.PureComponent {
  render() {
    return (
      <div className={'textBox ' + (this.props.className)}>
        <input 
          id={this.props.id} 
          type={this.props.type} 
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          onKeyUp={function() {
            if (window.event.keyCode === 13 && this.props.onKeyUp) {
              this.props.onKeyUp();
            }
          }.bind(this)}
        />
      </div>
    );
  }
};

export default TextBox;