import React, { Component } from "react";
import LoginScreen from "./screen/LoginScreen";

class WebSite extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      clsNm:''
    }
  }

  render() {
    return (
      <div>
        <LoginScreen/>
      </div>
    );
  }
}

export default WebSite;