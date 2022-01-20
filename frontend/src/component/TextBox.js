import React from "react";
import '../scss/common.scss';
import '../scss/component.scss';

class TextBox extends React.PureComponent {
  render() {
    return (
      <div className={'textBox_1 ' + (this.props.className)}>
        <input 
          id={this.props.id} 
          type={this.props.type} 
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
};

export default TextBox;