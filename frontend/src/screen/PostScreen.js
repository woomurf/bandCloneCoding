import React, {Component} from "react";
import '../scss/screen.scss';
import '../scss/component.scss';

class PostScreen extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div id="mainTop">
          <div className="topBar"/>
        </div>
        <div id="mainPage">
          <div id="main_Lside">
            <div className="Box"/>
          </div>
          <div id="postList">
            <div className="searchBox" onClick={function(e){
                alert("로그인화면으로");
                this.props.onClick("");
              }.bind(this)}/>
          </div>
          <div id="main_Rside">
            <div className="Box"/>
          </div>
        </div>
      </div>
    );
  }
};

export default PostScreen;