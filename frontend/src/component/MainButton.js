import React, {Component} from "react";
import '../scss/base.scss';
import '../scss/component.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeYn: false
    }
  }

  render() {
    return (
      <div className={'noDrag main_button ' + (this.props.clsNm)}
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
        //계정 확인후 팝업 or 페이지전환
      }.bind(this)}>
        <p className={(this.state.activeYn ? 'main_push' : '')}>{this.props.title}</p>
      </div>
    );
  }
};

export default Button;