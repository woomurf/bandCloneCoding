import React, {Component} from "react";
import '../scss/base.scss';
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
      <div className={'noDrag sub_button ' + (this.props.clsNm)}
      onMouseDown={this.btnState.bind(this, true)}
      onMouseUp={this.btnState.bind(this, false)}
      onMouseLeave={this.btnState.bind(this, false)}
      onClick={function(e){
        //회원가입 팝업
        e.preventDefault();
        this.props.onClick();
      }.bind(this)}>
        <p className={(this.state.activeYn ? 'sub_push' : '')}>{this.props.title}</p>
      </div>
    );
  }
};

export default Button;