import React, {Component} from "react";
import '../scss/base.scss';
import '../scss/component.scss';

class Button extends Component {
  state = {
    activeYn: false
  }

  render() {
    return (
      <div className={'noDrag sub_button ' + (this.props.clsNm)}
      onMouseDown={function(e){
        if(!this.state.activeYn){
          this.setState({activeYn: !this.state.activeYn});
        }
      }.bind(this)}
      onMouseUp={function(e){
        if(this.state.activeYn){
          this.setState({activeYn: !this.state.activeYn});
        }
      }.bind(this)}
      onMouseLeave={function(e){
        if(this.state.activeYn){
          this.setState({activeYn: !this.state.activeYn});
        }
      }.bind(this)}
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