import React from "react";
import '../scss/common.scss';
import '../scss/component.scss';

class TextButton extends React.Component {
  state = {
    activeYn: true
  }
  
  render() {
    return (
      <div 
        className={'noDrag textButton ' + (this.props.selectYn ? 'selectButton ' : '')}
        onClick={this.props.onClick.bind(this)}
      >
        <div className={this.props.className}>
          {this.props.label}
        </div>
        <div className={this.props.selectYn ? 'selectPoint' : ''}/>
      </div>
    );
  }
};

export default TextButton;