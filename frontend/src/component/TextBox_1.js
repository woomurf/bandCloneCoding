import React from "react";
import '../scss/common.scss';
import '../scss/component.scss';

class TextBox extends React.PureComponent {
    render() {
        return (
            <div className={'textBox_1 ' + (this.props.className)}>
                <input 
                type={this.props.type} 
                name={this.props.name} 
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
                />
            </div>
        );
    }
};

export default TextBox;