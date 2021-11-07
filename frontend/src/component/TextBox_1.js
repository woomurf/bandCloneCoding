import React, {Component} from "react";
import '../scss/base.scss';
import '../scss/component.scss';

class TextBox extends Component {
    render() {
        return (
            <div className={'textBox_1 ' + (this.props.clsNm)}>
                <input 
                placeholder={this.props.title} 
                type={this.props.typeNm} 
                onChange={function(e){
                    e.preventDefault();
                    this.props.onChange(e.target.value);
                }.bind(this)}
                name={this.props.dtaNm}/>
            </div>
        );
    }
};

export default TextBox;