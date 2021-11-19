import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";
import PostScreen from "./screen/PostScreen";

class WebSite extends Component {
  onChangePage(pagePath) {
    window.location.href = "/" + pagePath;
  }

  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/main" element={
              <PostScreen
                onClick={
                  (result) => this.onChangePage(result)
                }
              />
            }/>
            <Route path="/" element={
              <LoginScreen
                onClick={
                  (result) => this.onChangePage(result)
                }
              />
            }/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default WebSite;