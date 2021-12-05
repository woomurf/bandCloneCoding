import React, {Component} from "react";
import '../scss/common.scss';
import '../scss/component.scss';

class Button extends Component {
  state = {
    activeYn: false
  }

  btnState(stateValue) {
    this.setState({
      activeYn: stateValue
    });
  };

  render() {
    return (
      <div className={'noDrag main_button_sm ' + (this.props.clsNm)}
      onMouseDown={this.btnState.bind(this, true)}
      onMouseUp={this.btnState.bind(this, false)}
      onMouseLeave={this.btnState.bind(this, false)}
      onClick={function(e){
        e.preventDefault();
        this.props.onClick();
      }.bind(this)}>
        <p className={(this.state.activeYn ? 'main_push' : '')}>{this.props.title}</p>
      </div>
    );
  }
};

export default Button;