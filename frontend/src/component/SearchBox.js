import React, {Component} from "react";
import Search from '../image/Search.png';
import '../scss/common.scss';
import '../scss/component.scss';
import '../scss/page.scss'

class SearchBox extends Component {
  render() {
    return (
      <div className="searchBox">
        <div className="searchText">
          <input type="text" placeholder={this.props.label} id="searchText"/>
        </div>
        <div className="searchImage">
          <img alt="" className="searchImage" src={Search} id="searchImage"/>
        </div>
      </div>
    );
  };
};

export default SearchBox;