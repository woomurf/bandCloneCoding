import React from "react";
import '../scss/common.scss';
import '../scss/component.scss';

class TextButton extends React.PureComponent {
  state = {
    activeYn: !(this.props.selectYn),
    selectYn: (this.props.selectYn)
  }
  
  render() {
    return (
      <div 
        className="noDrag"
        onMouseEnter={this.btnState.bind(this, false)}
        onMouseLeave={this.btnState.bind(this, true)}
        onClick={this.props.onClick}
      >
        <div 
          className={(!this.state.selectYn ?
           this.state.activeYn ? 'pushButton' : ''
            : '')
          }
        >
          <div className={'textButton ' + (this.state.selectYn ? this.props.className : '')}>
            {this.props.label}
          </div>
          <div className={(this.state.selectYn ? 'selectPoint' : '')}/>
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

export default TextButton;