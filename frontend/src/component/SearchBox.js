import React, {Component} from "react";
import Search from '../image/Search.png';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchContant : ''
    }
  } 

  render() {
    return (
      <div className="searchBox">
        <div className="searchText">
          <input 
            type="text" 
            placeholder={this.props.label} 
            id="searchText"
            value={this.state.searchContant}
            onChange={function(e){
              this.setState({
                searchContant:e.target.value
              });
            }.bind(this)}
            onKeyUp={function() {
              if (window.event.keyCode === 13) {
                this.props.onClick(this.state.searchContant);
              }
            }.bind(this)}
          />
        </div>
        <div className="searchImage">
          <img 
            alt="" 
            className="searchImage" 
            src={Search} 
            id="searchImage"
            onClick={function() {
              this.props.onClick(this.state.searchContant);
            }.bind(this)}
          />
        </div>
      </div>
    );
  };
};

export default SearchBox;