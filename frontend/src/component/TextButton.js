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
        className={"noDrag" + (!this.props.selectYn ?
          (this.state.activeYn ? ' pushButton' : '')
           : '')}
        onMouseEnter={this.btnState.bind(this, false) /**hover기능 사용해서 축약 */}
        onMouseLeave={this.btnState.bind(this, true)}
        onClick={function(){
          this.props.onClick();
        }.bind(this)}
      >
        <div className={'textButton ' + this.props.className}>
          {this.props.label}
        </div>
        <div className={this.props.selectYn ? 'selectPoint' : ''}/>
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