import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";
import PostScreen from "./screen/LoginScreen";

class WebSite extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/main" element={<PostScreen/>}/>
            <Route path="/" element={<LoginScreen
              onClick={function(result){
                alert(result);
              }.bind(this)}/>}/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default WebSite;